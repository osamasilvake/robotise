import JSONAPIDeserializer from 'jsonapi-serializer';

import {
	DeserializerExtendedOptionsInterface,
	JsonAPIResponseInterface
} from '../../JsonAPI.interface';

/**
 * deserialize site operations
 * @param payload
 * @returns
 */
export const deserializeSiteOperations = async <T extends JsonAPIResponseInterface>(payload: T) => {
	const options: DeserializerExtendedOptionsInterface = {
		keyForAttribute: 'camelCase'
	};
	const deserializer = new JSONAPIDeserializer.Deserializer(options);
	const data = await deserializer.deserialize(payload);
	return { data, meta: payload.meta };
};
