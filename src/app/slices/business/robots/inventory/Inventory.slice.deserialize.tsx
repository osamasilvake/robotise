import JSONAPIDeserializer from 'jsonapi-serializer';

import {
	DeserializeRelationshipPropertiesInterface,
	DeserializerExtendedOptionsInterface
} from '../../../JsonAPI.interface';

/**
 * deserialize inventory
 * @param payload
 * @returns
 */
export const deserializeInventory = async <T,>(payload: T) => {
	const options: DeserializerExtendedOptionsInterface = {
		keyForAttribute: 'camelCase',
		robots: {
			valueForRelationship: (relationship: DeserializeRelationshipPropertiesInterface) => {
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
