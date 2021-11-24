import JSONAPIDeserializer from 'jsonapi-serializer';

import {
	DeserializeRelationshipPropertiesInterface,
	DeserializerExtendedOptionsInterface,
	JsonAPIResponseInterface
} from '../../../JsonAPI.interface';

/**
 * deserialize orders
 * @param payload
 * @returns
 */
export const deserializeOrders = async <T extends JsonAPIResponseInterface>(payload: T) => {
	const options: DeserializerExtendedOptionsInterface = {
		keyForAttribute: 'camelCase',
		sites: {
			valueForRelationship: (relationship: DeserializeRelationshipPropertiesInterface) => {
				return {
					id: relationship.id
				};
			}
		},
		robots: {
			valueForRelationship: (relationship: DeserializeRelationshipPropertiesInterface) => {
				return {
					id: relationship.id
				};
			}
		},
		orderReports: {
			valueForRelationship: (relationship: DeserializeRelationshipPropertiesInterface) => {
				return {
					id: relationship.id
				};
			}
		}
	};
	const deserializer = new JSONAPIDeserializer.Deserializer(options);
	const data = await deserializer.deserialize(payload);

	return { data, meta: payload.meta };
};
