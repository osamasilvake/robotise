import JSONAPIDeserializer from 'jsonapi-serializer';
import log from 'loglevel';

import { RobotTwinsSliceResponseDataInterface } from '../../../slices/robot-twins/RobotTwins.slice.interface';
import { RobotsSliceResponseDataInterface } from '../../../slices/robots/Robots.slice.interface';
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
 * deserialize robot Twins
 * @param payload
 * @returns
 */
export const deserializeRobotTwins = async <T extends JsonApiResponse>(payload: T) => {
	const options: DeserializerExtendedOptions = {
		keyForAttribute: 'camelCase',
		robots: {
			valueForRelationship: (relationship) => {
				return {
					id: relationship.id
				};
			}
		},
		transform: (data) => {
			try {
				const result: RobotTwinsSliceResponseDataInterface = {
					id: data.id,
					robot: data.robot,
					updatedAt: data.updatedAt,
					robotState: {
						isReady: {
							value: data.state?.reported.robotState.isReady,
							updatedAt: data.metadata?.reported.robotState.isReady?.updatedAt
						}
					},
					alerts: {
						value: data.state?.reported.alerts,
						updatedAt: data.metadata?.reported.alerts?.updatedAt
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
			acc: { [x: string]: RobotTwinsSliceResponseDataInterface },
			item: RobotTwinsSliceResponseDataInterface
		) => {
			acc[item.robot.id] = item;
			return acc;
		},
		{}
	);
	return { data, dataById };
};

/**
 * deserialize robots
 * @param payload
 * @returns
 */
export const deserializeRobots = async <T extends JsonApiResponse>(payload: T) => {
	const options: DeserializerExtendedOptions = {
		keyForAttribute: 'camelCase',
		sites: {
			valueForRelationship: (relationship: DeserializeRelationshipProperties) => {
				return {
					id: relationship.id
				};
			}
		},
		robotTwins: {
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
		(
			acc: { [x: string]: RobotsSliceResponseDataInterface },
			item: RobotsSliceResponseDataInterface
		) => {
			acc[item.id] = item;
			return acc;
		},
		{}
	);
	return { data, dataById, meta: payload.meta };
};
