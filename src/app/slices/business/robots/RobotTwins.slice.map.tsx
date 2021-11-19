import { SSContentInterface } from '../sites/Sites.slice.interface';
import { SRTContentDataInterface } from './RobotTwins.slice.interface';

/**
 * prepare robot twins content
 * @param sites
 * @param robotTwins
 * @returns
 */
export const prepareRobotTwinsContent = (
	sites: SSContentInterface,
	robotTwins: SRTContentDataInterface
): SRTContentDataInterface => {
	const site = sites.dataById[robotTwins.site.id];
	return {
		...robotTwins,
		id: robotTwins.id,
		robot: {
			id: robotTwins.robot.id,
			name: robotTwins.robot.name,
			customerName: robotTwins.robot.customerName,
			note: robotTwins.robot.note
		},
		site: {
			...robotTwins.site,
			title: site.title,
			acceptOrders: site.acceptOrders,
			elevator: site.elevators
		}
	};
};
