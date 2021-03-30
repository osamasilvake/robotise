import JSONAPIDeserializer from 'jsonapi-serializer';
import log from 'loglevel';

import { RobotContentDetailCameraTypeEnum } from '../../../screens/business/robots/content/detail/cameras/RobotContentDetailCameras.enum';
import {
	IRobotTwin,
	RTSMappedResponseDataInterface
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
			const sCameras = data.state.reported.cameras;
			const mCameras = data.metadata.reported.cameras;
			const cameraBase = sCameras && sCameras[RobotContentDetailCameraTypeEnum.BASE];
			const cameraBaseMeta = cameraBase && mCameras[RobotContentDetailCameraTypeEnum.BASE];
			const cameraTop = sCameras && sCameras[RobotContentDetailCameraTypeEnum.TOP];
			const cameraTopMeta = cameraBase && mCameras[RobotContentDetailCameraTypeEnum.TOP];

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
					cameras: data.state.reported.cameras &&
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
					dockingState: data.state.reported.dockingState && {
						isDocked: {
							value: data.state.reported.dockingState.isDocked,
							updatedAt: data.metadata.reported.dockingState.isDocked.updatedAt
						}
					},
					joystickState: data.state.reported.joystickState && {
						controlMode: {
							value: data.state.reported.joystickState.controlMode,
							updatedAt: data.metadata.reported.joystickState.controlMode.updatedAt
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
