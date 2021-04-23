import JSONAPIDeserializer from 'jsonapi-serializer';

import { DeserializerExtendedOptions, JsonApiResponse } from './JsonApi.interface';

/**
 * deserialize robot
 * @param payload
 * @returns
 */
export const deserializeRobot = async <T extends JsonApiResponse>(payload: T) => {
	const options: DeserializerExtendedOptions = {
		keyForAttribute: 'camelCase'
	};
	const deserializer = new JSONAPIDeserializer.Deserializer(options);
	const data = await deserializer.deserialize(payload);
	return data;
};
