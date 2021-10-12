import JSONAPIDeserializer from 'jsonapi-serializer';

import {
	DeserializeRelationshipProperties,
	DeserializerExtendedOptions,
	JsonApiResponse
} from '../../../JsonApi.interface';

/**
 * deserialize phone configs
 * @param payload
 * @returns
 */
export const deserializePhoneConfigs = async <T extends JsonApiResponse>(payload: T) => {
	const options: DeserializerExtendedOptions = {
		keyForAttribute: 'camelCase',
		sites: {
			valueForRelationship: (relationship: DeserializeRelationshipProperties) => {
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
