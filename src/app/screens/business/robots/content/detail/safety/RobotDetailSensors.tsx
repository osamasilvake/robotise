import { Collapse, List, ListItem, ListItemText, ListSubheader } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { RobotDetailSafetyTypeEnum } from './RobotDetailSafety.enum';
import { RobotDetailSafetySensorsInterface } from './RobotDetailSafety.interface';
import { mapSafetyContent } from './RobotDetailSafety.map';
import { RobotDetailSafetyStyles } from './RobotDetailSafety.style';

const RobotDetailSensors: FC<RobotDetailSafetySensorsInterface> = (props) => {
	const { sensors } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotDetailSafetyStyles();

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
					<ListItem>
						<ListItemText
							key={row['proto']}
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
