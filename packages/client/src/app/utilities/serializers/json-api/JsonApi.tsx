import JSONAPIDeserializer from 'jsonapi-serializer';
import log from 'loglevel';

import {
	IRobotTwin,
	RTSMappedResponseDataInterface
} from '../../../slices/robot-twins/RobotTwins.slice.interface';
import {
	IRobotTwinSummary,
	RTSSMappedResponseDataInterface
} from '../../../slices/robot-twins/RobotTwinsSummary.slice.interface';
import { ISite } from '../../../slices/sites/Sites.slice.interface';
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
	const dataById = data.reduce((acc: { [x: string]: ISite }, item: ISite) => {
		acc[item.id] = item;
		return acc;
	}, {});

	return { data, dataById, meta: payload.meta };
};

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
				const result: RTSSMappedResponseDataInterface = {
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

/**
 * deserialize robot twins
 * @param payload
 * @returns
 */
export const deserializeRobotTwins = async <T extends JsonApiResponse>(payload: T) => {
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
		transform: (data: IRobotTwin) => {
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
					},
					batteryState: data.state.reported.batteryState && {
						current: {
							value: data.state.reported.batteryState.current,
							updatedAt: data.metadata.reported.batteryState.current.updatedAt
						},
						percentage: {
							value: data.state.reported.batteryState.percentage,
							updatedAt: data.metadata.reported.batteryState.percentage.updatedAt
						},
						powerSupplyHealth: {
							value: data.state.reported.batteryState.powerSupplyHealth,
							updatedAt:
								data.metadata.reported.batteryState.powerSupplyHealth.updatedAt
						},
						powerSupplyStatus: {
							value: data.state.reported.batteryState.powerSupplyStatus,
							updatedAt:
								data.metadata.reported.batteryState.powerSupplyStatus.updatedAt
						},
						voltage: {
							value: data.state.reported.batteryState.voltage,
							updatedAt: data.metadata.reported.batteryState.voltage.updatedAt
						}
					},
					emergencyBrakeState: data.state.reported.emergencyBrakeState && {
						votedYes: {
							value: data.state.reported.emergencyBrakeState.votedYes,
							updatedAt: data.metadata.reported.emergencyBrakeState.votedYes.updatedAt
						}
					},
					dockingState: data.state.reported.dockingState && {
						isDocked: {
							value: data.state.reported.dockingState.isDocked,
							updatedAt: data.metadata.reported.dockingState.isDocked.updatedAt
						}
					},
					motorLeftWheelState: data.state.reported.motorLeftWheelState && {
						status: {
							value: data.state.reported.motorLeftWheelState.status,
							updatedAt: data.metadata.reported.motorLeftWheelState.status.updatedAt
						},
						velocity: {
							value: data.state.reported.motorLeftWheelState.velocity,
							updatedAt: data.metadata.reported.motorLeftWheelState.velocity.updatedAt
						},
						position: {
							value: data.state.reported.motorLeftWheelState.position,
							updatedAt: data.metadata.reported.motorLeftWheelState.position.updatedAt
						},
						motorCurrent: {
							value: data.state.reported.motorLeftWheelState.motorCurrent,
							updatedAt:
								data.metadata.reported.motorLeftWheelState.motorCurrent.updatedAt
						},
						lastErrorCode: {
							value: data.state.reported.motorLeftWheelState.lastErrorCode,
							updatedAt:
								data.metadata.reported.motorLeftWheelState.lastErrorCode.updatedAt
						},
						controllerVoltage: {
							value: data.state.reported.motorLeftWheelState.controllerVoltage,
							updatedAt:
								data.metadata.reported.motorLeftWheelState.controllerVoltage
									.updatedAt
						},
						controllerTemperature: {
							value: data.state.reported.motorLeftWheelState.controllerTemperature,
							updatedAt:
								data.metadata.reported.motorLeftWheelState.controllerTemperature
									.updatedAt
						},
						commandedVelocity: {
							value: data.state.reported.motorLeftWheelState.commandedVelocity,
							updatedAt:
								data.metadata.reported.motorLeftWheelState.commandedVelocity
									.updatedAt
						}
					},
					motorRightWheelState: data.state.reported.motorRightWheelState && {
						status: {
							value: data.state.reported.motorRightWheelState.status,
							updatedAt: data.metadata.reported.motorRightWheelState.status.updatedAt
						},
						velocity: {
							value: data.state.reported.motorRightWheelState.velocity,
							updatedAt:
								data.metadata.reported.motorRightWheelState.velocity.updatedAt
						},
						position: {
							value: data.state.reported.motorRightWheelState.position,
							updatedAt:
								data.metadata.reported.motorRightWheelState.position.updatedAt
						},
						motorCurrent: {
							value: data.state.reported.motorRightWheelState.motorCurrent,
							updatedAt:
								data.metadata.reported.motorRightWheelState.motorCurrent.updatedAt
						},
						lastErrorCode: {
							value: data.state.reported.motorRightWheelState.lastErrorCode,
							updatedAt:
								data.metadata.reported.motorRightWheelState.lastErrorCode.updatedAt
						},
						controllerVoltage: {
							value: data.state.reported.motorRightWheelState.controllerVoltage,
							updatedAt:
								data.metadata.reported.motorRightWheelState.controllerVoltage
									.updatedAt
						},
						controllerTemperature: {
							value: data.state.reported.motorRightWheelState.controllerTemperature,
							updatedAt:
								data.metadata.reported.motorRightWheelState.controllerTemperature
									.updatedAt
						},
						commandedVelocity: {
							value: data.state.reported.motorRightWheelState.commandedVelocity,
							updatedAt:
								data.metadata.reported.motorRightWheelState.commandedVelocity
									.updatedAt
						}
					},
					joystickState: data.state.reported.joystickState && {
						controlMode: {
							value: data.state.reported.joystickState.controlMode,
							updatedAt: data.metadata.reported.joystickState.controlMode.updatedAt
						}
					},
					lidarState: data.state.reported.lidarState && {
						receivingScans: {
							value: data.state.reported.lidarState.receivingScans,
							updatedAt: data.metadata.reported.lidarState.receivingScans.updatedAt
						}
					},
					realsenseState: data.state.reported.realsenseState && {
						receivingData: {
							value: data.state.reported.realsenseState.receivingData,
							updatedAt: data.metadata.reported.realsenseState.receivingData.updatedAt
						},
						processingData: {
							value: data.state.reported.realsenseState.processingData,
							updatedAt:
								data.metadata.reported.realsenseState.processingData.updatedAt
						}
					},
					activityState: data.state.reported && {
						latest: {
							value: data.state.reported.activity,
							updatedAt: data.metadata.reported.activity?.updatedAt
						}
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
	let data = await deserializer.deserialize(payload);
	data = typeof data === 'object' ? [data] : data;
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

	return { data, dataById };
};
