import JSONAPIDeserializer from 'jsonapi-serializer';

import {
	DeserializeRelationshipPropertiesInterface,
	DeserializerExtendedOptionsInterface
} from '../../../JsonAPI.interface';

/**
 * deserialize purchase
 * @param payload
 * @returns
 */
export const deserializePurchase = async <T,>(payload: T) => {
	const options: DeserializerExtendedOptionsInterface = {
		keyForAttribute: 'camelCase',
		sites: {
			valueForRelationship: (relationship: DeserializeRelationshipPropertiesInterface) => ({
				id: relationship.id
			})
		},
		robots: {
			valueForRelationship: (relationship: DeserializeRelationshipPropertiesInterface) => ({
				id: relationship.id
			})
		},
		orders: {
			valueForRelationship: (relationship: DeserializeRelationshipPropertiesInterface) => ({
				id: relationship.id
			})
		}
	};
	const deserializer = new JSONAPIDeserializer.Deserializer(options);
	const data = await deserializer.deserialize(payload);
	return data;
};
