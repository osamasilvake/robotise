import JSONAPIDeserializer from 'jsonapi-serializer';
import log from 'loglevel';

import { RTSMappedResponseDataInterface } from '../../../slices/robot-twins/RobotTwins.slice.interface';
import {
	IRobotTwinSummary,
	RTSContentTransformDataInterface
} from '../../../slices/robot-twins/RobotTwinsSummary.slice.interface';
import {
	DeserializeRelationshipProperties,
	DeserializerExtendedOptions,
	JsonApiResponse
} from './JsonApi.interface';

/**
 * deserialize robot twins summary
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
				const result: RTSContentTransformDataInterface = {
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
			acc[item.id] = item;
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
