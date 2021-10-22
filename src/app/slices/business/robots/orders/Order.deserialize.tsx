import JSONAPIDeserializer from 'jsonapi-serializer';

import {
	DeserializeRelationshipProperties,
	DeserializerExtendedOptions
} from '../../../JsonApi.interface';

/**
 * deserialize order
 * @param payload
 * @returns
 */
export const deserializeOrder = async <T,>(payload: T) => {
	const options: DeserializerExtendedOptions = {
		keyForAttribute: 'camelCase',
		sites: {
			valueForRelationship: (relationship: DeserializeRelationshipProperties) => {
				return {
					id: relationship.id
				};
			}
		},
		robots: {
			valueForRelationship: (relationship: DeserializeRelationshipProperties) => {
				return {
					id: relationship.id
				};
			}
		},
		orderReports: {
			valueForRelationship: (relationship: DeserializeRelationshipProperties) => {
				return {
					id: relationship.id
				};
			}
		}
	};
	const deserializer = new JSONAPIDeserializer.Deserializer(options);
	const data = await deserializer.deserialize(payload);
	return data;
};
