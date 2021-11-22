import JSONAPIDeserializer from 'jsonapi-serializer';

import { JsonAPIResponseInterface } from '../../JsonAPI.interface';

/**
 * deserialize alert codes
 * @param payload
 * @returns
 */
export const deserializeAlertCodes = async <T extends JsonAPIResponseInterface>(payload: T) => {
	const deserializer = new JSONAPIDeserializer.Deserializer({
		keyForAttribute: 'camelCase'
	});
	const data = await deserializer.deserialize(payload);

	return { data, meta: payload.meta };
};
