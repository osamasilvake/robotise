import JSONAPIDeserializer from 'jsonapi-serializer';

import { DeserializerExtendedOptionsInterface } from '../../../../JsonAPI.interface';

/**
 * deserialize marketing rides
 * @param payload
 * @returns
 */
export const deserializeMarketingRides = async <T,>(payload: T) => {
	const options: DeserializerExtendedOptionsInterface = {
		keyForAttribute: (attr: string) => attr
	};
	const deserializer = new JSONAPIDeserializer.Deserializer(options);
	const data = await deserializer.deserialize(payload);
	return data;
};
