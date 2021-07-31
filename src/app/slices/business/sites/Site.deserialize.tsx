import JSONAPIDeserializer from 'jsonapi-serializer';

import {
	DeserializeRelationshipProperties,
	DeserializerExtendedOptions,
	JsonApiResponse
} from '../../JsonApi.interface';

/**
 * deserialize site
 * @param payload
 * @returns
 */
export const deserializeSite = async <T extends JsonApiResponse>(payload: T) => {
	const options: DeserializerExtendedOptions = {
		keyForAttribute: 'camelCase',
		notificationTypes: {
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
