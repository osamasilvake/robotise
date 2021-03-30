import JSONAPIDeserializer from 'jsonapi-serializer';

import { ISite } from '../../../slices/sites/Sites.slice.interface';
import { JsonApiResponse } from './JsonApi.interface';

/**
 * deserialize sites
 * @param payload
 * @returns
 */
export const deserializeSites = async <T extends JsonApiResponse>(payload: T) => {
	const deserializer = new JSONAPIDeserializer.Deserializer({
		keyForAttribute: 'camelCase'
	});
	const data = await deserializer.deserialize(payload);
	const dataById = data.reduce((acc: { [x: string]: ISite }, item: ISite) => {
		acc[item.id] = item;
		return acc;
	}, {});

	return { data, dataById, meta: payload.meta };
};
