import { Grid } from '@material-ui/core';
import { FC } from 'react';

import { IAlert } from '../../../../../../slices/robot-twins/RobotTwins.slice.interface';
import RobotDetailAlert from './RobotDetailAlert';
import { RobotDetailAlertsTypeEnum } from './RobotDetailAlerts.enum';
import { RobotDetailAlertsInterface } from './RobotDetailAlerts.interface';
import { RobotDetailAlertsStyles } from './RobotDetailAlerts.style';

const RobotDetailAlerts: FC<RobotDetailAlertsInterface> = (props) => {
	const { robotTwin } = props;
	const classes = RobotDetailAlertsStyles();

	/**
	 * sort by alert level
	 * @returns
	 */
	const sortByAlertLevel = (): IAlert[] => {
		return robotTwin.alerts.value
			.map((item) => {
				switch (item.level) {
					case RobotDetailAlertsTypeEnum.DANGER:
						return { ...item, sortId: 1 };
					case RobotDetailAlertsTypeEnum.WARNING:
						return { ...item, sortId: 2 };
					default:
						return { ...item, sortId: 3 };
				}
			})
			.concat()
			.sort((a, b) => (a.sortId > b.sortId ? 1 : b.sortId > a.sortId ? -1 : 0));
	};

	return robotTwin.alerts.value && robotTwin.alerts.value.length ? (
		<Grid container spacing={1} className={classes.sAlertsContainer}>
			{sortByAlertLevel().map((alert) => (
				<RobotDetailAlert key={alert.code} alert={alert} />
			))}
		</Grid>
	) : null;
};
export default RobotDetailAlerts;
