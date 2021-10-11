import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, Icon, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import clsx from 'clsx';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { RobotDetailInformationTypeEnum } from './RobotDetailInformation.enum';
import { RobotDetailSafetySystemsInterface } from './RobotDetailInformation.interface';
import { mapSafetyContent } from './RobotDetailInformation.map';
import { RobotDetailInformationStyle } from './RobotDetailInformation.style';

const RobotDetailSafetySystems: FC<RobotDetailSafetySystemsInterface> = (props) => {
	const { systems } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotDetailInformationStyle();

	const [open, setOpen] = useState(false);

	const mappedSystem =
		systems && mapSafetyContent(systems, RobotDetailInformationTypeEnum.SAFETY_SYSTEMS);

	return mappedSystem ? (
		<List className={classes.sList}>
			<ListItem button selected onClick={() => setOpen(!open)}>
				<ListItemText primary={t('CONTENT.DETAIL.INFORMATION.SAFETY_SYSTEMS.TITLE')} />
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			{mappedSystem.map((row) => (
				<Collapse key={row.label} in={open} timeout="auto" unmountOnExit>
					<ListItem
						className={clsx({
							[classes.sListItemWarning]: !row.value
						})}>
						<ListItemIcon>
							<Icon>{t(row.icon)}</Icon>
						</ListItemIcon>
						<ListItemText
							primary={t(row.label)}
							secondary={row.value ? t(row.msg1) : t(row.msg2)}
						/>
					</ListItem>
				</Collapse>
			))}
		</List>
	) : null;
};
export default RobotDetailSafetySystems;
