import JSONAPIDeserializer from 'jsonapi-serializer';

import { DeserializerExtendedOptionsInterface } from '../../../../JsonAPI.interface';
import { SQRDataByIdInterface, SQRDataInterface } from './QRCodes.slice.interface';

/**
 * deserialize QR codes
 * @param payload
 * @returns
 */
export const deserializeQRCodes = async <T,>(payload: T) => {
	const options: DeserializerExtendedOptionsInterface = {
		keyForAttribute: 'camelCase'
	};
	const deserializer = new JSONAPIDeserializer.Deserializer(options);
	const data = await deserializer.deserialize(payload);
	const dataById = data.reduce((acc: SQRDataByIdInterface, item: SQRDataInterface) => {
		acc[item.room] = item;
		return acc;
	}, {});

	return { data, dataById };
};

/**
 * deserialize QR code
 * @param payload
 * @returns
 */
export const deserializeQRCode = async <T,>(payload: T) => {
	const options: DeserializerExtendedOptionsInterface = {
		keyForAttribute: 'camelCase'
	};
	const deserializer = new JSONAPIDeserializer.Deserializer(options);
	const data = await deserializer.deserialize(payload);
	return data;
};
