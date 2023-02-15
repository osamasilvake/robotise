import JSONAPIDeserializer from 'jsonapi-serializer';

import {
	DeserializerExtendedOptionsInterface,
	JsonAPIResponseInterface
} from '../../../JsonAPI.interface';

/**
 * deserialize floors
 * @param payload
 * @returns
 */
export const deserializeFloors = async <T extends JsonAPIResponseInterface>(payload: T) => {
	const options: DeserializerExtendedOptionsInterface = {
		keyForAttribute: 'camelCase'
	};
	const deserializer = new JSONAPIDeserializer.Deserializer(options);
	const data = await deserializer.deserialize(payload);

	return { data };
};
