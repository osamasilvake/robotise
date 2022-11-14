import { AECContentInterface } from './business/general/all-elevator-calls/AllElevatorCalls.slice.interface';
import { SAOContentInterface } from './business/general/all-orders/AllOrders.slice.interface';
import { SEContentInterface } from './business/general/emails/Emails.slice.interface';
import { CLContentInterface } from './business/robots/commands-log/CommandsLog.slice.interface';
import { ECContentInterface } from './business/robots/elevator-calls/ElevatorCalls.slice.interface';
import { SOContentInterface } from './business/robots/orders/Orders.slice.interface';
import { SPContentInterface } from './business/robots/purchases/Purchases.slice.interface';
import { PCContentInterface } from './business/sites/phone-calls/PhoneCalls.slice.interface';
import { SLContentInterface } from './business/sites/sms-list/SMSList.slice.interface';
import { SACContentInterface } from './information/alert-codes/AlertCodes.interface';
import { SDLContentInterface } from './settings/deep-links/DeepLinks.interface';
import { SMCContentInterface } from './settings/middleware-config/MiddlewareConfig.interface';

/**
 * handle refresh and pagination
 * @param current
 * @param result
 * @param refresh
 * @param rowsPerPage
 * @param reset
 * @returns
 */
export const handleRefreshAndPagination = <T extends PaginationInput>(
	current: T,
	result: T,
	refresh: boolean,
	rowsPerPage: number,
	reset = false
) => {
	if (refresh) {
		const dataItems = current.data.slice(rowsPerPage);
		return {
			...current,
			data: [...result.data, ...dataItems],
			meta: current.meta && {
				...current.meta,
				totalDocs: result.meta.totalDocs,
				totalPages: result.meta.totalPages
			}
		};
	} else if (result.meta?.page > 1) {
		if (reset) {
			return result;
		}
		return {
			...current,
			meta: {
				...current.meta,
				...result.meta
			},
			data: [...current.data, ...result.data]
		};
	}
	return result;
};

export type PaginationInput =
	| SOContentInterface
	| SPContentInterface
	| SACContentInterface
	| SEContentInterface
	| CLContentInterface
	| PCContentInterface
	| SLContentInterface
	| SDLContentInterface
	| ECContentInterface
	| SMCContentInterface
	| SAOContentInterface
	| AECContentInterface;
