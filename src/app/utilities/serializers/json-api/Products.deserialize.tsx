import JSONAPIDeserializer from 'jsonapi-serializer';

import { SPCDataInterface } from '../../../slices/products/Products.slice.interface';
import {
	DeserializeRelationshipProperties,
	DeserializerExtendedOptions,
	JsonApiResponse
} from './JsonApi.interface';

/**
 * deserialize products
 * @param payload
 * @returns
 */
export const deserializeProducts = async <T extends JsonApiResponse>(payload: T) => {
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
	const dataById = data.reduce(
		(acc: { [x: string]: SPCDataInterface }, item: SPCDataInterface) => {
			acc[item.id] = item;
			return acc;
		},
		{}
	);

	return { data, dataById, meta: payload.meta };
};
