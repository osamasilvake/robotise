import JSONAPIDeserializer from 'jsonapi-serializer';

import { OrderDataInterface } from '../../../slices/orders/Orders.slice.interface';
import {
	DeserializeRelationshipProperties,
	DeserializerExtendedOptions,
	JsonApiResponse
} from './JsonApi.interface';

/**
 * deserialize orders
 * @param payload
 * @returns
 */
export const deserializeOrders = async <T extends JsonApiResponse>(payload: T) => {
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
		}
	};
	const deserializer = new JSONAPIDeserializer.Deserializer(options);
	const data = await deserializer.deserialize(payload);
	const dataById = data.reduce(
		(acc: { [x: string]: OrderDataInterface }, item: OrderDataInterface) => {
			acc[item.id] = item;
			return acc;
		},
		{}
	);

	return { data, dataById, meta: payload.meta };
};
