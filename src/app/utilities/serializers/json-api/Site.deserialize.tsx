import JSONAPIDeserializer from 'jsonapi-serializer';

import { ISite } from '../../../slices/sites/Sites.slice.interface';
import { JsonApiResponse } from './JsonApi.interface';

/**
 * deserialize site
 * @param payload
 * @returns
 */
export const deserializeSite = async <T extends JsonApiResponse>(payload: T) => {
	const deserializer = new JSONAPIDeserializer.Deserializer({
		keyForAttribute: 'camelCase'
	});
	let data = await deserializer.deserialize(payload);
	data = typeof data === 'object' ? [data] : data;
	const dataById = data.reduce((acc: { [x: string]: ISite }, item: ISite) => {
		acc[item.id] = item;
		return acc;
	}, {});

	return { data, dataById };
};
