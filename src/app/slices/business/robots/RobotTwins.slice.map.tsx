import { SSContentInterface } from '../sites/Sites.slice.interface';
import { SRTContentDataInterface } from './RobotTwins.slice.interface';

/**
 * map robot twins
 * @param sites
 * @param robotTwins
 * @returns
 */
export const mapRobotTwins = (
	sites: SSContentInterface | null,
	robotTwins: SRTContentDataInterface
): SRTContentDataInterface => {
	const site = sites ? sites.dataById[robotTwins.site.id] : null;
	return {
		...robotTwins,
		id: robotTwins.id,
		robot: {
			id: robotTwins.robot.id,
			name: robotTwins.robot.name,
			ceInventoryId: robotTwins.robot.ceInventoryId,
			customerName: robotTwins.robot.customerName,
			note: robotTwins.robot.note
		},
		site: {
			...robotTwins.site,
			title: site?.title,
			acceptOrders: site?.acceptOrders,
			elevator: site?.elevators
		}
	};
};
