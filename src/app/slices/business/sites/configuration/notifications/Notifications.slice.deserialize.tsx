import JSONAPIDeserializer from 'jsonapi-serializer';

import {
	DeserializeRelationshipPropertiesInterface,
	DeserializerExtendedOptionsInterface
} from '../../../../JsonAPI.interface';

/**
 * deserialize notifications
 * @param payload
 * @returns
 */
export const deserializeNotifications = async <T,>(payload: T) => {
	const options: DeserializerExtendedOptionsInterface = {
		keyForAttribute: 'camelCase',
		notificationTypes: {
			valueForRelationship: (relationship: DeserializeRelationshipPropertiesInterface) => ({
				id: relationship.id
			})
		}
	};
	const deserializer = new JSONAPIDeserializer.Deserializer(options);
	const data = await deserializer.deserialize(payload);
	return data;
};
