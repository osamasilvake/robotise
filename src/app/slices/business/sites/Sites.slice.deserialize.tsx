import JSONAPIDeserializer from 'jsonapi-serializer';

import {
	DeserializeRelationshipPropertiesInterface,
	DeserializerExtendedOptionsInterface,
	JsonAPIResponseInterface
} from '../../JsonAPI.interface';
import { ISite, SSCDataByIdInterface } from './Sites.slice.interface';

/**
 * deserialize sites
 * @param payload
 * @returns
 */
export const deserializeSites = async <T extends JsonAPIResponseInterface>(payload: T) => {
	const options: DeserializerExtendedOptionsInterface = {
		keyForAttribute: 'camelCase',
		robots: {
			valueForRelationship: (relationship: DeserializeRelationshipPropertiesInterface) => ({
				id: relationship.id
			})
		}
	};
	const deserializer = new JSONAPIDeserializer.Deserializer(options);
	const data = await deserializer.deserialize(payload);
	const dataById = data.reduce((acc: SSCDataByIdInterface, item: ISite) => {
		acc[item.id] = item;
		return acc;
	}, {});

	return { data, dataById, meta: payload.meta };
};
