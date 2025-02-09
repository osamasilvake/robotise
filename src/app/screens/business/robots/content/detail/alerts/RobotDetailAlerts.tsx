import { Grid } from '@mui/material';
import { FC } from 'react';

import { IAlertInterface } from '../../../../../../slices/business/robots/RobotTwins.slice.interface';
import RobotDetailAlert from './RobotDetailAlert';
import { RobotDetailAlertsTypeEnum } from './RobotDetailAlerts.enum';
import { RobotDetailAlertsInterface } from './RobotDetailAlerts.interface';
import { RobotDetailAlertsStyle } from './RobotDetailAlerts.style';

const RobotDetailAlerts: FC<RobotDetailAlertsInterface> = (props) => {
	const { robotTwins } = props;
	const classes = RobotDetailAlertsStyle();

	/**
	 * sort by alert level
	 * @returns
	 */
	const sortByAlertLevel = (): IAlertInterface[] => {
		return robotTwins.alerts.value
			.map((item) => {
				switch (item.level) {
					case RobotDetailAlertsTypeEnum.DANGER:
						return { ...item, sortId: 1 };
					case RobotDetailAlertsTypeEnum.WARNING:
						return { ...item, sortId: 2 };
					case RobotDetailAlertsTypeEnum.INFO:
						return { ...item, sortId: 3 };
					default:
						return { ...item, sortId: 4 };
				}
			})
			.concat()
			.sort((a, b) => a.sortId - b.sortId);
	};

	return robotTwins.alerts.value && robotTwins.alerts.value.length ? (
		<Grid container spacing={1} className={classes.sAlertsContainer}>
			{sortByAlertLevel().map((alert) => (
				<RobotDetailAlert key={alert.message} alert={alert} />
			))}
		</Grid>
	) : null;
};
export default RobotDetailAlerts;
