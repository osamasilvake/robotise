import JSONAPIDeserializer from 'jsonapi-serializer';
import log from 'loglevel';

import { AppConfigService } from '../../../services';
import { RobotTwinsSummaryTypeEnum } from '../../../slices/robots/RobotTwinsSummary.enum';
import {
	IRobotTwinSummary,
	RTSContentDataByIdInterface,
	RTSContentTransformDataInterface
} from '../../../slices/robots/RobotTwinsSummary.slice.interface';
import { SSContentInterface } from '../../../slices/sites/Sites.slice.interface';
import {
	DeserializeRelationshipProperties,
	DeserializerExtendedOptions,
	JsonApiResponse
} from './JsonApi.interface';

/**
 * deserialize robot twins summary
 * @param payload
 * @param sites
 * @returns
 */
export const deserializeRobotTwinsSummary = async <T extends JsonApiResponse>(
	payload: T,
	sites: SSContentInterface
) => {
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
			const state = data.state.reported;
			const meta = data.metadata.reported;

			try {
				const result: RTSContentTransformDataInterface = {
					id: data.id,
					updatedAt: data.updatedAt,
					robot: {
						id: data.robot.id,
						name: state.name,
						customerName: state.customerName,
						isHidden: state.isHidden,
						isOnlineCheckDisabled: state.isOnlineCheckDisabled
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
					status: {
						controlMode: {
							value: state.status.controlMode,
							updatedAt: meta.status.controlMode.updatedAt
						},
						missionStatus: {
							value: state.status.missionStatus,
							updatedAt: meta.status.missionStatus.updatedAt
						}
					},
					alerts: {
						value: state.alerts,
						updatedAt: meta.alerts?.updatedAt
					},
					lastSyncedProducts: {
						updatedAt: state.lastSyncedProducts
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
	const dataById: RTSContentDataByIdInterface = {};

	data = data.map((item: RTSContentTransformDataInterface) => {
		const site = sites.dataById[item.site.id];
		const result = {
			id: item.id,
			updatedAt: item.updatedAt,
			robotId: item.robot.id,
			robotTitle: item.robot.name,
			robotIsReady: item.robotState.isReady.value,
			robotControlMode: item.status.controlMode.value,
			robotMissionStatus: item.status.missionStatus.value,
			robotCustomerName: item.robot.customerName,
			robotHidden: item.robot.isHidden,
			robotOnlineCheckDisabled: item.robot.isOnlineCheckDisabled,
			siteId: site.id,
			siteTitle: site.title,
			siteCurrency: site.currency || AppConfigService.AppOptions.common.defaultCurrency,
			siteAcceptOrders: site.acceptOrders,
			alerts: {
				danger: item.alerts.value.filter(
					(f) => f.level === RobotTwinsSummaryTypeEnum.DANGER
				).length,
				warning: item.alerts.value.filter(
					(f) => f.level === RobotTwinsSummaryTypeEnum.WARNING
				).length
			},
			lastSyncedProducts: item.lastSyncedProducts.updatedAt
		};
		dataById[item.robot.id] = result;
		return result;
	});

	return { data, dataById };
};
