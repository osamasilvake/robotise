import JSONAPIDeserializer from 'jsonapi-serializer';
import log from 'loglevel';

import { RobotDetailCameraTypeEnum } from '../../../screens/business/robots/content/detail/cameras/RobotDetailCameras.enum';
import {
	DeserializeRelationshipPropertiesInterface,
	DeserializerExtendedOptionsInterface
} from '../../JsonAPI.interface';
import { IRobotTwinInterface, SRTContentDataInterface } from './RobotTwins.slice.interface';

/**
 * deserialize robot twins
 * @param payload
 * @returns
 */
export const deserializeRobotTwins = async <T,>(payload: T) => {
	const options: DeserializerExtendedOptionsInterface = {
		keyForAttribute: 'camelCase',
		robots: {
			valueForRelationship: (relationship: DeserializeRelationshipPropertiesInterface) => ({
				id: relationship.id
			})
		},
		sites: {
			valueForRelationship: (relationship: DeserializeRelationshipPropertiesInterface) => ({
				id: relationship.id
			})
		},
		transform: (data: IRobotTwinInterface) => {
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
					site: {
						id: data.site.id
					},
					robot: {
						id: data.robot.id,
						name: state.name,
						customerName: state.customerName,
						note: state.note
					},
					robotState: {
						isReady: {
							value: state.robotState.isReady,
							updatedAt: meta.robotState.isReady.updatedAt
						}
					},
					controlMode: {
						value: state.status?.controlMode,
						updatedAt: meta.status?.controlMode?.updatedAt
					},
					mission: {
						value: state.status?.mission,
						updatedAt: meta.status?.mission?.updatedAt
					},
					alerts: {
						value: state.alerts,
						updatedAt: meta.alerts?.updatedAt
					},
					ca: state.ca,
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
					dockingState: meta.status?.isDocked && {
						properties: {
							isDocked: state.status.isDocked
						},
						updatedAt: meta.status.isDocked.updatedAt
					},
					joystickState: meta.status?.isJoystickConnected && {
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
					safetySensors: state.status.safetySensors && {
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
						updatedAt: meta.status?.safetySensors?.updatedAt
					},
					safetySystems: state.status.safetySystem && {
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
					},
					computerInfo: {
						properties: {
							cpuLoad: state.status.computerInfo.cpuLoad,
							memoryUsage: state.status.computerInfo.memoryUsage,
							wifiStatus: state.status.computerInfo.wifiStatus,
							hardDrives: state.status.computerInfo.hardDrives
						},
						updatedAt: meta.status?.computerInfo?.updatedAt
					},
					humanPerception: {
						properties: {
							legsClose: state.status.humanPerception.legsClose,
							legsFar: state.status.humanPerception.legsFar,
							legsCloseCount: state.status.humanPerception.legsCloseCount,
							legsFarCount: state.status.humanPerception.legsFarCount
						},
						updatedAt: meta.status?.computerInfo?.updatedAt
					},
					transitPointStarted: {
						properties: {
							guiVersion: state.transitPointStarted.guiVersion,
							protobufVersion: state.transitPointStarted.protobufVersion,
							repositories: state.transitPointStarted.repositories
						},
						updatedAt: meta.status?.computerInfo?.updatedAt
					},
					plannedPath: {
						properties: {
							mapName: state.plannedPath.mapName,
							goal: state.plannedPath.goal,
							points: state.plannedPath.points
						},
						updatedAt: meta.plannedPath?.updatedAt
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
