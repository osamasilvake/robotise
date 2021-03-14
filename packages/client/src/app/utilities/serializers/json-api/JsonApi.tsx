import JSONAPIDeserializer from 'jsonapi-serializer';
import log from 'loglevel';

import { RobotTwinsSliceResponseDataInterface } from '../../../slices/robot-twins/RobotTwins.slice.interface';
import { RobotsSliceResponseDataInterface } from '../../../slices/robots/Robots.slice.interface';
import { SitesSliceResponseDataInterface } from '../../../slices/sites/Sites.slice.interface';
import { get } from '../../methods/ObjectUtilities';
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
					updatedAt: data.updatedAt
				};

				const props = [
					'batteryState',
					'dockingState',
					'motorLeftWheelState',
					'motorRightWheelState',
					'emergencyBrakeState',
					'joystickState',
					'lidarState',
					'drawerStates',
					'realsenseState'
				];

				props.forEach((prop) => {
					const obj = get(data, `state.reported.${prop}`);
					if (obj) {
						result[prop] = {};
						Object.keys(obj).forEach((key) => {
							result[prop][key] = {
								value: obj[key],
								updatedAt: data.metadata.reported[prop][key].updatedAt
							};
						});
					}
				});

				// robot state
				const robotState = get(data, `state.reported.robotState`);
				if (robotState) {
					const robotStateMeta = get(data, `metadata.reported.robotState`, undefined);
					result.robotState = {
						isReady: {
							value: robotState.isReady,
							updatedAt: robotStateMeta.isReady.updatedAt
						}
					};
				}

				// activity
				const activity = get(data, `state.reported.activity`);
				if (activity) {
					const activityMeta = get(data, `metadata.reported.activity`, undefined);
					result.activity = {
						latest: {
							value: activity,
							updatedAt: activityMeta.updatedAt
						}
					};
				}

				// alerts
				const alerts = get(data, `state.reported.alerts`);
				if (alerts.length) {
					const alertsMeta = get(data, `metadata.reported.alerts`);
					result.alerts = {
						value: alerts,
						updatedAt: alertsMeta.updatedAt
					};
				}

				// mute sensor state
				const muteSensorState = get(data, `state.reported.muteSensorState`);
				if (muteSensorState) {
					const muteSensorStateMeta = get(data, `metadata.reported.muteSensorState`);
					result.muteSensorState = {
						value: muteSensorState,
						updatedAt: muteSensorStateMeta.updatedAt
					};
				}

				// location
				const location = get(data, `state.reported.location`);
				if (location) {
					const locaitonMeta = get(data, `metadata.reported.location`);
					result.location = {
						...location,
						updatedAt: locaitonMeta.updatedAt
					};
				}

				// cameras
				const cameras = get(data, 'state.reported.cameras');
				if (cameras) {
					const base = get(data, 'state.reported.cameras.base');
					const baseMeta = get(data, 'metadata.reported.cameras.base');
					const top = get(data, 'state.reported.cameras.top');
					const topMeta = get(data, 'metadata.reported.cameras.top');
					result.cameras = {
						base: {
							imageId: base && base.imageId,
							updatedAt: baseMeta && baseMeta.imageId.updatedAt
						},
						top: {
							imageId: top && top.imageId,
							updatedAt: topMeta && topMeta.imageId.updatedAt
						}
					};
				}
				return result;
			} catch (error) {
				log.error(error);
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
