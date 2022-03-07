import {
	SGOOrderModeContentDataByIdInterface,
	SGOOrderModeContentDataInterface
} from './GeneralOperations.slice.interface';

/**
 * map order modes
 * @param modes
 * @returns
 */
export const mapOrderModes = (modes: SGOOrderModeContentDataInterface[]) => {
	const data = modes.map((m) => ({ title: `GENERAL:COMMON.MODE.${m.mode}`, mode: m.mode }));
	return {
		data,
		dataById: data.reduce(
			(acc: SGOOrderModeContentDataByIdInterface, item: SGOOrderModeContentDataInterface) => {
				acc[item.mode] = item.title;
				return acc;
			},
			{}
		)
	};
};
