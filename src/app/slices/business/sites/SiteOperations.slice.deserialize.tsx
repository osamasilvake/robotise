import JSONAPIDeserializer from 'jsonapi-serializer';

import {
	DeserializerExtendedOptionsInterface,
	JsonAPIResponseInterface
} from '../../JsonAPI.interface';

/**
 * deserialize Order Origins
 * @param payload
 * @returns
 */
export const deserializeOrderOrigins = async <T extends JsonAPIResponseInterface>(payload: T) => {
	const options: DeserializerExtendedOptionsInterface = {
		keyForAttribute: 'camelCase'
	};
	const deserializer = new JSONAPIDeserializer.Deserializer(options);
	const data = await deserializer.deserialize(payload);
	return { data, meta: payload.meta };
};
