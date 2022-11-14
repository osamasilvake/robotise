import JSONAPIDeserializer from 'jsonapi-serializer';

import {
	DeserializeRelationshipPropertiesInterface,
	DeserializerExtendedOptionsInterface,
	JsonAPIResponseInterface
} from '../../../JsonAPI.interface';

/**
 * deserialize all elevator calls
 * @param payload
 * @returns
 */
export const deserializeAllElevatorCalls = async <T extends JsonAPIResponseInterface>(
	payload: T
) => {
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
		}
	};
	const deserializer = new JSONAPIDeserializer.Deserializer(options);
	const data = await deserializer.deserialize(payload);

	return { data, meta: payload.meta };
};
