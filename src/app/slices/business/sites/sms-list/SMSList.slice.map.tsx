import { dateDayJs } from '../../../../utilities/methods/Date';
import { SMSListTypeEnum } from './SMSList.slice.enum';
import { SLCDataInterface, SLContentInterface } from './SMSList.slice.interface';

/**
 * combine two lists
 * @param result1
 * @param result2
 * @returns
 */
export const combineTwoLists = (
	result1: SLContentInterface,
	result2: SLContentInterface
): SLContentInterface => {
	const typeInbound = SMSListTypeEnum.INBOUND;
	const typeOutbound = SMSListTypeEnum.OUTBOUND;
	const result: SLContentInterface = {
		data: [
			...(result1.data?.map((d) => ({ ...d, type: typeInbound })) || []),
			...(result2.data?.map((d) => ({ ...d, type: typeOutbound })) || [])
		],
		meta: {
			...result1.meta,
			totalPages: result1.meta.totalPages + result2.meta.totalPages,
			totalDocs: result1.meta.totalDocs + result2.meta.totalDocs
		}
	};
	return result;
};

/**
 * fill-up dummy values
 * @param result
 * @param rowsPerPage
 * @returns
 */
export const fillUpDummyValues = (
	result: SLContentInterface,
	rowsPerPage: number
): SLContentInterface => {
	let payload = result;

	// fill dummies
	const dummy: SLCDataInterface = {
		id: '',
		type: SMSListTypeEnum.DUMMY,
		room: '-',
		status: 'dummy',
		from: '-',
		to: '-',
		history: [],
		createdAt: dateDayJs(result.data[result.data.length - 1]?.createdAt)
			.subtract(1, 'second')
			.toISOString() as unknown as Date,
		updatedAt: dateDayJs(result.data[result.data.length - 1]?.updatedAt)
			.subtract(1, 'minute')
			.toISOString() as unknown as Date,
		isDebug: false,
		callerCountry: '-',
		workflow: '-',
		vendor: '-'
	};

	const totalActualList = result.data.length;
	if (totalActualList < rowsPerPage) {
		const missingTotal = rowsPerPage - totalActualList;
		const dummies = [];
		for (let i = 0; i < missingTotal; i++) {
			dummies.push(dummy);
		}
		payload = {
			...payload,
			data: [...result.data, ...dummies]
		};
	}

	return payload;
};
