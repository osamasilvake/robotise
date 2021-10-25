import JSONAPIDeserializer from 'jsonapi-serializer';

import { JsonApiResponse } from '../../JsonApi.interface';

/**
 * deserialize deep links
 * @param payload
 * @returns
 */
export const deserializeDeepLinks = async <T extends JsonApiResponse>(payload: T) => {
	const deserializer = new JSONAPIDeserializer.Deserializer({
		keyForAttribute: 'camelCase'
	});
	const data = await deserializer.deserialize(payload);

	return { data, meta: payload.meta };
};
