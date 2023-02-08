import { DeserializerOptions } from 'jsonapi-serializer';

export interface DeserializerExtendedOptionsInterface extends DeserializerOptions {
	sites?: DeserializeRelationshipInterface;
	robotTwins?: DeserializeRelationshipInterface;
	robots?: DeserializeRelationshipInterface;
	orders?: DeserializeRelationshipInterface;
	orderReports?: DeserializeRelationshipInterface;
	users?: DeserializeRelationshipInterface;
	activity?: DeserializeRelationshipInterface;
	notificationTypes?: DeserializeRelationshipInterface;
	floors?: DeserializeRelationshipInterface;
}

export interface DeserializeRelationshipInterface {
	valueForRelationship(
		arg: DeserializeRelationshipPropertiesInterface
	): DeserializeRelationshipPropertiesInterface;
}

export interface DeserializeRelationshipPropertiesInterface {
	id: string | number;
}

export interface JsonAPIResponseInterface {
	meta: JsonApiMetaInterface;
}

export interface JsonApiMetaInterface {
	totalPages: number;
	hasPrevPage: boolean;
	hasNextPage: boolean;
	prevPage: number | null;
	nextPage: number | null;
	page: number;
	totalDocs: number;
}
