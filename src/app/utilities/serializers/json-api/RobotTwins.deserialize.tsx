import JSONAPIDeserializer from 'jsonapi-serializer';
import log from 'loglevel';

import { RobotDetailCameraTypeEnum } from '../../../screens/business/robots/content/detail/cameras/RobotDetailCameras.enum';
import {
	IRobotTwin,
	SRTContentDataInterface
} from '../../../slices/robot-twins/RobotTwins.slice.interface';
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
						name: state.name
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
						current: state.status.batteryState.current,
						percentage: state.status.batteryState.percentage,
						powerSupplyHealth: state.status.batteryState.powerSupplyHealth,
						powerSupplyStatus: state.status.batteryState.powerSupplyStatus,
						voltage: state.status.batteryState.voltage,
						updatedAt: meta.status.batteryState.updatedAt
					},
					dockingState: meta.status.isDocked && {
						isDocked: state.status.isDocked,
						updatedAt: meta.status.isDocked.updatedAt
					},
					joystickState: meta.status.isJoystickConnected && {
						isConnected: state.status.isJoystickConnected,
						updatedAt: meta.status.isJoystickConnected.updatedAt
					},
					activityState: state && {
						latest: state.activity,
						updatedAt: meta.activity?.updatedAt
					},
					safetySystemsState: {
						backMutingActive: state.status.safetySystem.backMutingActive,
						frontMutingActive: state.status.safetySystem.frontMutingActive,
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
