import {
	Collapse,
	Icon,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	ListSubheader
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { RobotDetailSafetyTypeEnum } from './RobotDetailSafety.enum';
import { RobotDetailSafetySystemsInterface } from './RobotDetailSafety.interface';
import { mapSafetyContent } from './RobotDetailSafety.map';
import { RobotDetailSafetyStyles } from './RobotDetailSafety.style';

const RobotDetailSystems: FC<RobotDetailSafetySystemsInterface> = (props) => {
	const { systems } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotDetailSafetyStyles();

	const [open, setOpen] = useState(false);

	const mappedSystem = systems && mapSafetyContent(systems, RobotDetailSafetyTypeEnum.SYSTEMS);

	return mappedSystem ? (
		<List
			className={classes.sList}
			subheader={
				<ListSubheader className={classes.sListSubheader} onClick={() => setOpen(!open)}>
					{t('CONTENT.DETAIL.SAFETY.SYSTEMS.TITLE')}
					{open ? <ExpandLess /> : <ExpandMore />}
				</ListSubheader>
			}>
			{mappedSystem.map((row) => (
				<Collapse key={row.proto} in={open} timeout="auto" unmountOnExit>
					<ListItem className={classes.sListItem}>
						<ListItemIcon>
							<Icon>{t(row['icon'])}</Icon>
						</ListItemIcon>
						<ListItemText
							primary={t(row['proto'])}
							secondary={row['value'] ? t(row['msg1']) : t(row['msg2'])}
						/>
					</ListItem>
				</Collapse>
			))}
		</List>
	) : null;
};
export default RobotDetailSystems;
