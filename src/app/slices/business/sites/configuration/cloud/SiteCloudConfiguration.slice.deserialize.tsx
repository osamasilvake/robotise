import JSONAPIDeserializer from 'jsonapi-serializer';

import {
	DeserializerExtendedOptionsInterface,
	JsonAPIResponseInterface
} from '../../../../JsonAPI.interface';
import {
	SEVContentDataByIdInterface,
	SEVContentDataInterface
} from './SiteCloudConfiguration.slice.interface';

/**
 * deserialize site cloud configuration
 * @param payload
 * @returns
 */
export const deserializeSiteCloudConfiguration = async <T extends JsonAPIResponseInterface>(
	payload: T
) => {
	const options: DeserializerExtendedOptionsInterface = {
		keyForAttribute: 'camelCase'
	};
	const deserializer = new JSONAPIDeserializer.Deserializer(options);
	const data = await deserializer.deserialize(payload);
	const dataById = data.reduce(
		(acc: SEVContentDataByIdInterface, item: SEVContentDataInterface) => {
			acc[item.code] = item;
			return acc;
		},
		{}
	);

	return { data, dataById, meta: payload.meta };
};
