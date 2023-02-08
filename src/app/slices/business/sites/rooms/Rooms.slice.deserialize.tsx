import JSONAPIDeserializer from 'jsonapi-serializer';

import {
	DeserializeRelationshipPropertiesInterface,
	DeserializerExtendedOptionsInterface,
	JsonAPIResponseInterface
} from '../../../JsonAPI.interface';
import { SRContentDataByIdInterface, SRContentDataInterface } from './Rooms.slice.interface';

/**
 * deserialize rooms
 * @param payload
 * @returns
 */
export const deserializeRooms = async <T extends JsonAPIResponseInterface>(payload: T) => {
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
	const dataById = data.reduce(
		(acc: SRContentDataByIdInterface, item: SRContentDataInterface) => {
			acc[item.id] = item;
			return acc;
		},
		{}
	);
	const groupByType = Array.from(
		data.reduce(
			(entryMap: Map<string, SRContentDataInterface[]>, e: SRContentDataInterface) =>
				entryMap.set(e.type, [...(entryMap.get(e.type) || []), e]),
			new Map()
		),
		([key, values]) => ({ key, values })
	);

	return { data, dataById, groupByType, meta: payload.meta };
};
