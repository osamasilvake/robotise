import { RTSContentInterface } from './RobotTwinsSummary.slice.interface';

/**
 * map robots alerts count
 * @param payload
 * @returns
 */
export const mapRobotsAlertsCount = (payload: RTSContentInterface) =>
	Object.keys(payload.dataById).reduce(
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
