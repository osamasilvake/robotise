import JSONAPIDeserializer from 'jsonapi-serializer';

import { SPCDataInterface } from '../../../slices/purchases/Purchases.slice.interface';
import {
	DeserializeRelationshipProperties,
	DeserializerExtendedOptions,
	JsonApiResponse
} from './JsonApi.interface';

/**
 * deserialize purchases
 * @param payload
 * @returns
 */
export const deserializePurchases = async <T extends JsonApiResponse>(payload: T) => {
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
		orders: {
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
