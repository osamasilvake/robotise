import JSONAPIDeserializer from 'jsonapi-serializer';

import {
	DeserializeRelationshipPropertiesInterface,
	DeserializerExtendedOptionsInterface
} from '../../../JsonAPI.interface';

/**
 * deserialize wifi heatmap
 * @param payload
 * @returns
 */
export const deserializeWifiHeatmap = async <T,>(payload: T) => {
	const options: DeserializerExtendedOptionsInterface = {
		keyForAttribute: 'camelCase',
		floors: {
			valueForRelationship: (relationship: DeserializeRelationshipPropertiesInterface) => ({
				id: relationship.id
			})
		}
	};
	const deserializer = new JSONAPIDeserializer.Deserializer(options);
	const data = await deserializer.deserialize(payload);

	return { data };
};
