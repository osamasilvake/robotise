import JSONAPIDeserializer from 'jsonapi-serializer';

import { JsonAPIResponseInterface } from '../../JsonAPI.interface';

/**
 * deserialize middleware configs
 * @param payload
 * @returns
 */
export const deserializeMiddlewareConfigs = async <T extends JsonAPIResponseInterface>(
	payload: T
) => {
	const deserializer = new JSONAPIDeserializer.Deserializer({
		keyForAttribute: 'camelCase'
	});
	const data = await deserializer.deserialize(payload);

	return { data, meta: payload.meta };
};

/**
 * deserialize middleware config
 * @param payload
 * @returns
 */
export const deserializeMiddlewareConfig = async <T,>(payload: T) => {
	const deserializer = new JSONAPIDeserializer.Deserializer({
		keyForAttribute: 'camelCase'
	});
	const data = await deserializer.deserialize(payload);
	return data;
};
