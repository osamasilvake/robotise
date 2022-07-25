import JSONAPIDeserializer from 'jsonapi-serializer';

import { DeserializerExtendedOptionsInterface } from '../../../JsonAPI.interface';

/**
 * deserialize performance
 * @param payload
 * @returns
 */
export const deserializePerformance = async <T,>(payload: T) => {
	const options: DeserializerExtendedOptionsInterface = {
		keyForAttribute: 'camelCase'
	};
	const deserializer = new JSONAPIDeserializer.Deserializer(options);
	const data = await deserializer.deserialize(payload);
	return data;
};
