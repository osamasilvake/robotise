import { Collapse, Icon, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import clsx from 'clsx';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { RobotDetailSafetyTypeEnum } from './RobotDetailSafety.enum';
import { RobotDetailSafetySystemsInterface } from './RobotDetailSafety.interface';
import { mapSafetyContent } from './RobotDetailSafety.map';
import { RobotDetailSafetyStyle } from './RobotDetailSafety.style';

const RobotDetailSystems: FC<RobotDetailSafetySystemsInterface> = (props) => {
	const { systems } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotDetailSafetyStyle();

	const [open, setOpen] = useState(false);

	const mappedSystem = systems && mapSafetyContent(systems, RobotDetailSafetyTypeEnum.SYSTEMS);

	return mappedSystem ? (
		<List className={classes.sList}>
			<ListItem button selected onClick={() => setOpen(!open)}>
				<ListItemText primary={t('CONTENT.DETAIL.SAFETY.SYSTEMS.TITLE')} />
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			{mappedSystem.map((row) => (
				<Collapse key={row.proto} in={open} timeout="auto" unmountOnExit>
					<ListItem
						className={clsx({
							[classes.sListItemWarning]: !row.value
						})}>
						<ListItemIcon>
							<Icon>{t(row.icon)}</Icon>
						</ListItemIcon>
						<ListItemText
							primary={t(row.proto)}
							secondary={row.value ? t(row.msg1) : t(row.msg2)}
						/>
					</ListItem>
				</Collapse>
			))}
		</List>
	) : null;
};
export default RobotDetailSystems;
