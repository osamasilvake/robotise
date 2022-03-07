import JSONAPIDeserializer from 'jsonapi-serializer';

import {
	DeserializerExtendedOptionsInterface,
	JsonAPIResponseInterface
} from '../../JsonAPI.interface';
import {
	SGOOrderModeContentDataByIdInterface,
	SGOOrderModeContentDataInterface
} from './GeneralOperations.slice.interface';

/**
 * deserialize order modes
 * @param payload
 * @returns
 */
export const deserializeOrderModes = async <T extends JsonAPIResponseInterface>(payload: T) => {
	const options: DeserializerExtendedOptionsInterface = {
		keyForAttribute: 'camelCase'
	};
	const deserializer = new JSONAPIDeserializer.Deserializer(options);
	const data = await deserializer.deserialize(payload);
	const dataById = data.reduce(
		(acc: SGOOrderModeContentDataByIdInterface, item: SGOOrderModeContentDataInterface) => {
			acc[item.mode] = item.mode;
			return acc;
		},
		{}
	);
	const dataStringList = data.map((m: SGOOrderModeContentDataInterface) => m.mode);

	return { data, dataById, dataStringList, meta: payload.meta };
};
