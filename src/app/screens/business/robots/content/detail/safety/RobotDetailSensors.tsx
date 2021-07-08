import {
	Collapse,
	Icon,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	ListSubheader
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import clsx from 'clsx';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { RobotDetailSafetyTypeEnum } from './RobotDetailSafety.enum';
import { RobotDetailSafetySensorsInterface } from './RobotDetailSafety.interface';
import { mapSafetyContent } from './RobotDetailSafety.map';
import { RobotDetailSafetyStyle } from './RobotDetailSafety.style';

const RobotDetailSensors: FC<RobotDetailSafetySensorsInterface> = (props) => {
	const { sensors } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotDetailSafetyStyle();

	const [open, setOpen] = useState(false);

	const mappedSensors = sensors && mapSafetyContent(sensors, RobotDetailSafetyTypeEnum.SENSORS);

	return mappedSensors ? (
		<List
			className={classes.sList}
			subheader={
				<ListSubheader className={classes.sListSubheader} onClick={() => setOpen(!open)}>
					{t('CONTENT.DETAIL.SAFETY.SENSORS.TITLE')}
					{open ? <ExpandLess /> : <ExpandMore />}
				</ListSubheader>
			}>
			{mappedSensors.map((row) => (
				<Collapse key={row.proto} in={open} timeout="auto" unmountOnExit>
					<ListItem
						className={clsx({
							[classes.sListItemWarning]: !row.value
						})}>
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
export default RobotDetailSensors;
