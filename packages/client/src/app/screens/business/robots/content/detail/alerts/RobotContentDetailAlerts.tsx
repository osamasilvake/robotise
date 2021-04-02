import { Grid } from '@material-ui/core';
import { FC } from 'react';

import { IAlert } from '../../../../../../slices/robot-twins/RobotTwins.slice.interface';
import RobotContentDetailAlert from './RobotContentDetailAlert';
import { RobotContentDetailAlertsTypeEnum } from './RobotContentDetailAlerts.enum';
import { RobotContentDetailAlertsInterface } from './RobotContentDetailAlerts.interface';
import { RobotContentDetailAlertsStyles } from './RobotContentDetailAlerts.style';

const RobotContentDetailAlerts: FC<RobotContentDetailAlertsInterface> = (props) => {
	const { robot } = props;
	const classes = RobotContentDetailAlertsStyles();

	/**
	 * sort by alert level
	 * @returns
	 */
	const sortByAlertLevel = (): IAlert[] => {
		return robot.alerts.value
			.map((item) => {
				switch (item.level) {
					case RobotContentDetailAlertsTypeEnum.DANGER:
						return { ...item, sortId: 1 };
					case RobotContentDetailAlertsTypeEnum.WARNING:
						return { ...item, sortId: 2 };
					default:
						return { ...item, sortId: 3 };
				}
			})
			.concat()
			.sort((a, b) => (a.sortId > b.sortId ? 1 : b.sortId > a.sortId ? -1 : 0));
	};

	return robot.alerts.value && robot.alerts.value.length ? (
		<Grid container spacing={1} className={classes.sAlertsContainer}>
			{sortByAlertLevel().map((alert) => (
				<RobotContentDetailAlert key={alert.code} alert={alert} />
			))}
		</Grid>
	) : null;
};
export default RobotContentDetailAlerts;
