import { dateDayJs } from '../../../../utilities/methods/Date';
import { PhoneCallsTypeEnum } from './PhoneCalls.slice.enum';
import { PCCDataInterface, PCContentInterface } from './PhoneCalls.slice.interface';

/**
 * combine two lists
 * @param result1
 * @param result2
 * @returns
 */
export const combineTwoLists = (
	result1: PCContentInterface,
	result2: PCContentInterface
): PCContentInterface => {
	const typeInbound = PhoneCallsTypeEnum.INBOUND;
	const typeOutbound = PhoneCallsTypeEnum.OUTBOUND;
	const result: PCContentInterface = {
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
	result: PCContentInterface,
	rowsPerPage: number
): PCContentInterface => {
	let payload = result;

	// fill dummies
	const dummy: PCCDataInterface = {
		type: PhoneCallsTypeEnum.DUMMY,
		room: '-',
		status: 'dummy',
		from: '-',
		history: [],
		createdAt: dateDayJs(result.data[result.data.length - 1]?.createdAt)
			.subtract(1, 'second')
			.toDate(),
		updatedAt: dateDayJs(result.data[result.data.length - 1]?.updatedAt)
			.subtract(1, 'second')
			.toDate(),
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
