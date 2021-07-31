import JSONAPIDeserializer from 'jsonapi-serializer';

import { JsonApiResponse } from '../../JsonApi.interface';

/**
 * deserialize alert codes
 * @param payload
 * @returns
 */
export const deserializeAlertCodes = async <T extends JsonApiResponse>(payload: T) => {
	const deserializer = new JSONAPIDeserializer.Deserializer({
		keyForAttribute: 'camelCase'
	});
	const data = await deserializer.deserialize(payload);

	return { data, meta: payload.meta };
};
