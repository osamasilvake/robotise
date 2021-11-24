import JSONAPIDeserializer from 'jsonapi-serializer';
import log from 'loglevel';

import { AppConfigService } from '../../../services';
import {
	DeserializeRelationshipPropertiesInterface,
	DeserializerExtendedOptionsInterface
} from '../../JsonAPI.interface';
import { SSContentInterface } from '../sites/Sites.slice.interface';
import { RobotTwinsSummaryTypeEnum } from './RobotTwinsSummary.enum';
import {
	IRobotTwinSummaryInterface,
	RTSContentDataByIdInterface,
	RTSContentTransformDataInterface
} from './RobotTwinsSummary.slice.interface';

/**
 * deserialize robot twins summary
 * @param payload
 * @param sites
 * @returns
 */
export const deserializeRobotTwinsSummary = async <T,>(payload: T, sites: SSContentInterface) => {
	const options: DeserializerExtendedOptionsInterface = {
		keyForAttribute: 'camelCase',
		robots: {
			valueForRelationship: (relationship: DeserializeRelationshipPropertiesInterface) => {
				return {
					id: relationship.id
				};
			}
		},
		sites: {
			valueForRelationship: (relationship: DeserializeRelationshipPropertiesInterface) => {
				return {
					id: relationship.id
				};
			}
		},
		transform: (data: IRobotTwinSummaryInterface) => {
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
						note: state.note,
						isHidden: state.isHidden,
						isOnlineCheckDisabled: state.isOnlineCheckDisabled,
						alerts: {
							value: state.alerts,
							updatedAt: meta.alerts?.updatedAt
						},
						robotState: {
							isReady: {
								value: state.robotState.isReady,
								updatedAt: meta.robotState.isReady.updatedAt
							}
						},
						lastSyncedProducts: {
							updatedAt: state.lastSyncedProducts
						}
					},
					site: {
						id: data.site.id
					},
					status: {
						batteryState: {
							value: state.status.batteryState,
							updatedAt: meta.status.batteryState.updatedAt
						},
						controlMode: {
							value: state.status.controlMode,
							updatedAt: meta.status.controlMode.updatedAt
						},
						mission: {
							status: `${state.status.mission?.status}`,
							description: `${state.status.mission?.description}`,
							updatedAt: meta.status.mission?.updatedAt
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
	const dataById: RTSContentDataByIdInterface = {};

	try {
		data = data.map((item: RTSContentTransformDataInterface) => {
			const site = sites.dataById[item.site.id];
			const result = {
				id: item.id,
				updatedAt: item.updatedAt,
				robotId: item.robot.id,
				robotTitle: item.robot.name,
				robotIsReady: item.robot.robotState.isReady.value,
				robotBatteryPercentage: item.status.batteryState.value.percentage,
				robotControlMode: item.status.controlMode.value,
				robotMission: item.status.mission,
				robotCustomerName: item.robot.customerName,
				robotNote: item.robot.note,
				robotHidden: item.robot.isHidden,
				robotOnlineCheckDisabled: item.robot.isOnlineCheckDisabled,
				robotLastSyncedProducts: item.robot.lastSyncedProducts.updatedAt,
				robotAlerts: {
					danger: item.robot.alerts.value.filter(
						(f) => f.level === RobotTwinsSummaryTypeEnum.DANGER
					).length,
					warning: item.robot.alerts.value.filter(
						(f) => f.level === RobotTwinsSummaryTypeEnum.WARNING
					).length
				},
				siteId: site?.id,
				siteTitle: site?.title,
				siteCurrency: site?.currency || AppConfigService.AppOptions.common.defaultCurrency,
				siteAcceptOrders: site?.acceptOrders
			};
			dataById[item.robot.id] = result;
			return result;
		});
	} catch (error) {
		// log error on console
		log.error(error);

		// throw error
		throw error;
	}

	return { data, dataById };
};
