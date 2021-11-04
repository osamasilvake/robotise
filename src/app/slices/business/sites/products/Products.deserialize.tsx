import JSONAPIDeserializer from 'jsonapi-serializer';

import {
	DeserializeRelationshipPropertiesInterface,
	DeserializerExtendedOptionsInterface,
	JsonApiResponseInterface
} from '../../../JsonApi.interface';

/**
 * deserialize products
 * @param payload
 * @returns
 */
export const deserializeProducts = async <T extends JsonApiResponseInterface>(payload: T) => {
	const options: DeserializerExtendedOptionsInterface = {
		keyForAttribute: 'camelCase',
		sites: {
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
