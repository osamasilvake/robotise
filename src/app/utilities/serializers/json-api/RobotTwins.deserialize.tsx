import JSONAPIDeserializer from 'jsonapi-serializer';
import log from 'loglevel';

import { RobotDetailCameraTypeEnum } from '../../../screens/business/robots/content/detail/cameras/RobotDetailCameras.enum';
import {
	IRobotTwin,
	SRTContentDataInterface
} from '../../../slices/robots/RobotTwins.slice.interface';
import {
	DeserializeRelationshipProperties,
	DeserializerExtendedOptions,
	JsonApiResponse
} from './JsonApi.interface';

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
			const state = data.state.reported;
			const meta = data.metadata.reported;
			const sCameras = state.cameras;
			const mCameras = meta.cameras;
			const cameraBase = sCameras && sCameras[RobotDetailCameraTypeEnum.BASE];
			const cameraBaseMeta = cameraBase && mCameras[RobotDetailCameraTypeEnum.BASE];
			const cameraTop = sCameras && sCameras[RobotDetailCameraTypeEnum.TOP];
			const cameraTopMeta = cameraBase && mCameras[RobotDetailCameraTypeEnum.TOP];

			try {
				const result: SRTContentDataInterface = {
					id: data.id,
					updatedAt: data.updatedAt,
					robot: {
						id: data.robot.id,
						name: state.name,
						customerName: state.customerName
					},
					site: {
						id: data.site.id
					},
					robotState: {
						isReady: {
							value: state.robotState.isReady,
							updatedAt: meta.robotState.isReady.updatedAt
						}
					},
					alerts: {
						value: state.alerts,
						updatedAt: meta.alerts?.updatedAt
					},
					controlMode: {
						value: state.status.controlMode,
						updatedAt: meta.status.controlMode.updatedAt
					},
					missionStatus: {
						status: state.status.mission?.status || '',
						description: state.status.mission?.description || '',
						updatedAt: meta.status.missionStatus.updatedAt
					},
					location: state.status.location && {
						value: state.status.location,
						updatedAt: meta.status.location.updatedAt
					},
					cameras: state.cameras &&
						(cameraBase || cameraTop) && {
							base: cameraBase && {
								imageId: {
									value: cameraBase.imageId,
									updatedAt: cameraBaseMeta?.imageId.updatedAt
								}
							},
							top: cameraTop && {
								imageId: {
									value: cameraTop.imageId,
									updatedAt: cameraTopMeta?.imageId.updatedAt
								}
							}
						},
					batteryState: state.status.batteryState && {
						properties: {
							current: state.status.batteryState.current,
							percentage: state.status.batteryState.percentage,
							powerSupplyHealth: state.status.batteryState.powerSupplyHealth,
							powerSupplyStatus: state.status.batteryState.powerSupplyStatus,
							voltage: state.status.batteryState.voltage
						},
						updatedAt: meta.status.batteryState.updatedAt
					},
					dockingState: meta.status.isDocked && {
						properties: {
							isDocked: state.status.isDocked
						},
						updatedAt: meta.status.isDocked.updatedAt
					},
					joystickState: meta.status.isJoystickConnected && {
						properties: {
							isConnected: state.status.isJoystickConnected
						},
						updatedAt: meta.status.isJoystickConnected.updatedAt
					},
					activityState: state && {
						properties: {
							latest: state.activity
						},
						updatedAt: meta.activity?.updatedAt
					},
					safetySensorsState: state.status.safetySensors && {
						properties: {
							drawers: state.status.safetySensors.drawers,
							fallProtectionBackLeft:
								state.status.safetySensors.fallProtectionBackLeft,
							fallProtectionBackRight:
								state.status.safetySensors.fallProtectionBackRight,
							fallProtectionFrontLeft:
								state.status.safetySensors.fallProtectionFrontLeft,
							fallProtectionFrontRight:
								state.status.safetySensors.fallProtectionFrontRight,
							lidarBottom: state.status.safetySensors.lidarBottom,
							lidarTop: state.status.safetySensors.lidarTop,
							magnetSensorLeft: state.status.safetySensors.magnetSensorLeft,
							magnetSensorRight: state.status.safetySensors.magnetSensorRight,
							safetyEdge: state.status.safetySensors.safetyEdge
						},
						updatedAt: meta.status.safetySensors.updatedAt
					},
					safetySystemsState: state.status.safetySystem && {
						properties: {
							backMutingActive: state.status.safetySystem.backMutingActive,
							brakeReleasePressed: state.status.safetySystem.brakeReleasePressed,
							brakeReleased: state.status.safetySystem.brakeReleased,
							driveTorqueEnabled: state.status.safetySystem.driveTorqueEnabled,
							estopSwitchReleased: state.status.safetySystem.estopSwitchReleased,
							forceBrakeActive: state.status.safetySystem.forceBrakeActive,
							forceStop0Active: state.status.safetySystem.forceStop0Active,
							frontMutingActive: state.status.safetySystem.frontMutingActive,
							noDriveStop: state.status.safetySystem.noDriveStop,
							noStop0: state.status.safetySystem.noStop0,
							noStop1: state.status.safetySystem.noStop1,
							noStop2Trigger: state.status.safetySystem.noStop2Trigger,
							stop0ResetRequired: state.status.safetySystem.stop0ResetRequired,
							stop1ResetRequired: state.status.safetySystem.stop1ResetRequired
						},
						updatedAt: meta.status.safetySystem.updatedAt
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
	return data;
};
