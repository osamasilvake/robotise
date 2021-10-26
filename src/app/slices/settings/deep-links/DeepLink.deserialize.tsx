import JSONAPIDeserializer from 'jsonapi-serializer';
/**
 * deserialize deep link
 * @param payload
 * @returns
 */
export const deserializeDeepLink = async <T,>(payload: T) => {
	const deserializer = new JSONAPIDeserializer.Deserializer({
		keyForAttribute: 'camelCase'
	});
	const data = await deserializer.deserialize(payload);
	return data;
};
