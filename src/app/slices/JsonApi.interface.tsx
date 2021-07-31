import { DeserializerOptions } from 'jsonapi-serializer';

export interface DeserializerExtendedOptions extends DeserializerOptions {
	sites?: DeserializeRelationship;
	robotTwins?: DeserializeRelationship;
	robots?: DeserializeRelationship;
	orders?: DeserializeRelationship;
	users?: DeserializeRelationship;
	activity?: DeserializeRelationship;
	notificationTypes?: DeserializeRelationship;
}

export interface DeserializeRelationship {
	valueForRelationship(arg: DeserializeRelationshipProperties): DeserializeRelationshipProperties;
}

export interface DeserializeRelationshipProperties {
	id: string | number;
}

export interface JsonApiResponse {
	meta: JsonApiMeta;
}

export interface JsonApiMeta {
	totalPages: number;
	hasPrevPage: boolean;
	hasNextPage: boolean;
	prevPage: number;
	nextPage: number;
	page: number;
	totalDocs: number;
}
