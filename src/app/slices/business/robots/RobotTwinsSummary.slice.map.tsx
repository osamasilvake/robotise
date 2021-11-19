import { RTSContentInterface } from './RobotTwinsSummary.slice.interface';

/**
 * count robots alerts
 * @param payload
 * @returns
 */
export const countRobotsAlerts = (payload: RTSContentInterface) => {
	return Object.keys(payload.dataById).reduce(
		(acc, key) => {
			const robotTwins = payload.dataById[key];
			const alerts = robotTwins.robotAlerts;
			if (alerts) {
				acc.danger = acc.danger += alerts.danger;
				acc.warning = acc.warning += alerts.warning;
				acc.count = acc.count += alerts.danger ? 1 : 0;
			}
			return acc;
		},
		{ count: 0, danger: 0, warning: 0 }
	);
};
