import JSONAPIDeserializer from 'jsonapi-serializer';

import { JsonAPIResponseInterface } from '../../JsonAPI.interface';

/**
 * deserialize deep links
 * @param payload
 * @returns
 */
export const deserializeDeepLinks = async <T extends JsonAPIResponseInterface>(payload: T) => {
	const deserializer = new JSONAPIDeserializer.Deserializer({
		keyForAttribute: 'camelCase'
	});
	const data = await deserializer.deserialize(payload);

	return { data, meta: payload.meta };
};
