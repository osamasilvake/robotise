import JSONAPIDeserializer from 'jsonapi-serializer';
import log from 'loglevel';

import {
	IRobotTwinSummary,
	RTSMappedResponseDataInterface
} from '../../../slices/robot-twins/RobotTwinsSummary.slice.interface';
import { SitesSliceResponseDataInterface } from '../../../slices/sites/Sites.slice.interface';
import {
	DeserializeRelationshipProperties,
	DeserializerExtendedOptions,
	JsonApiResponse
} from './JsonApi.interface';

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
	const dataById = data.reduce(
		(
			acc: { [x: string]: SitesSliceResponseDataInterface },
			item: SitesSliceResponseDataInterface
		) => {
			acc[item.id] = item;
			return acc;
		},
		{}
	);
	return { data, dataById, meta: payload.meta };
};

/**
 * deserialize robot Twins summary
 * @param payload
 * @returns
 */
export const deserializeRobotTwinsSummary = async <T extends JsonApiResponse>(payload: T) => {
	const options: DeserializerExtendedOptions = {
		keyForAttribute: 'camelCase',
		robots: {
			valueForRelationship: (relationship: DeserializeRelationshipProperties) => {
				return {
					id: relationship.id
				};
			}
		},
		sites: {
			valueForRelationship: (relationship: DeserializeRelationshipProperties) => {
				return {
					id: relationship.id
				};
			}
		},
		transform: (data: IRobotTwinSummary) => {
			try {
				const result: RTSMappedResponseDataInterface = {
					id: data.id,
					updatedAt: data.updatedAt,
					robot: {
						id: data.robot.id,
						name: data.state.reported.name
					},
					site: {
						id: data.site.id
					},
					robotState: {
						isReady: {
							value: data.state.reported.robotState.isReady,
							updatedAt: data.metadata.reported.robotState.isReady.updatedAt
						}
					},
					alerts: {
						value: data.state.reported.alerts,
						updatedAt: data.metadata.reported.alerts?.updatedAt
					}
				};
				return result;
			} catch (error) {
				// log error on console
				log.error(error);

				// throw error
				throw error;
			}
		}
	};
	const deserializer = new JSONAPIDeserializer.Deserializer(options);
	const data = await deserializer.deserialize(payload);
	const dataById = data.reduce(
		(
			acc: { [x: string]: RTSMappedResponseDataInterface },
			item: RTSMappedResponseDataInterface
		) => {
			acc[item.robot.id] = item;
			return acc;
		},
		{}
	);

	// FAKE: meta
	const meta = {
		hasNextPage: false,
		hasPrevPage: false,
		nextPage: 1,
		page: 1,
		prevPage: 1,
		totalDocs: data.length,
		totalPages: 1
	};

	return { data, dataById, meta };
};
