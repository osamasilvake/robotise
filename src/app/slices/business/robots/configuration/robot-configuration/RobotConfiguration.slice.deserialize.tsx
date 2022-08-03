import JSONAPIDeserializer from 'jsonapi-serializer';

import { DeserializerExtendedOptionsInterface } from '../../../../JsonAPI.interface';

/**
 * deserialize robot configuration
 * @param payload
 * @returns
 */
export const deserializeRobotConfiguration = async <T,>(payload: T) => {
	const options: DeserializerExtendedOptionsInterface = {
		keyForAttribute: 'camelCase'
	};
	const deserializer = new JSONAPIDeserializer.Deserializer(options);
	const data = await deserializer.deserialize(payload);
	return data;
};
