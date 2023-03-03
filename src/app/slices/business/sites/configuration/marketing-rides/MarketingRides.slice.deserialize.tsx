import JSONAPIDeserializer from 'jsonapi-serializer';

import {
	DeserializeRelationshipPropertiesInterface,
	DeserializerExtendedOptionsInterface,
	JsonAPIResponseInterface
} from '../../../../JsonAPI.interface';

/**
 * deserialize marketing rides
 * @param payload
 * @returns
 */
export const deserializeMarketingRides = async <T extends JsonAPIResponseInterface>(payload: T) => {
	const options: DeserializerExtendedOptionsInterface = {
		keyForAttribute: (attr: string) => attr,
		locations: {
			valueForRelationship: (relationship: DeserializeRelationshipPropertiesInterface) =>
				relationship.id
		}
	};
	const deserializer = new JSONAPIDeserializer.Deserializer(options);
	const data = await deserializer.deserialize(payload);

	return { data, meta: payload.meta };
};
