import JSONAPIDeserializer from 'jsonapi-serializer';

/**
 * deserialize site
 * @param payload
 * @returns
 */
export const deserializeSite = async <T,>(payload: T) => {
	const deserializer = new JSONAPIDeserializer.Deserializer({
		keyForAttribute: 'camelCase'
	});
	const data = await deserializer.deserialize(payload);
	return data;
};
