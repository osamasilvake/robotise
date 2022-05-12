import JSONAPIDeserializer from 'jsonapi-serializer';

/**
 * deserialize robot password
 * @param payload
 * @returns
 */
export const deserializeRobotPassword = async <T,>(payload: T) => {
	const deserializer = new JSONAPIDeserializer.Deserializer({
		keyForAttribute: 'camelCase'
	});
	const data = await deserializer.deserialize(payload);
	return data;
};
