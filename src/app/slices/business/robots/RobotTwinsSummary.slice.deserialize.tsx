import JSONAPIDeserializer from 'jsonapi-serializer';
import log from 'loglevel';

import {
	DeserializeRelationshipPropertiesInterface,
	DeserializerExtendedOptionsInterface
} from '../../JsonAPI.interface';
import { RobotTwinsSummaryTypeEnum } from './RobotTwinsSummary.enum';
import {
	IRobotTwinSummaryInterface,
	RTSContentDataByIdInterface
} from './RobotTwinsSummary.slice.interface';

/**
 * deserialize robot twins summary
 * @param payload
 * @returns
 */
export const deserializeRobotTwinsSummary = async <T,>(payload: T) => {
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
		}
	};

	const deserializer = new JSONAPIDeserializer.Deserializer(options);
	const dataById: RTSContentDataByIdInterface = {};
	let data = await deserializer.deserialize(payload);
	try {
		data = data.map((item: IRobotTwinSummaryInterface) => {
			const result = {
				id: item.id,
				updatedAt: item.updatedAt,
				robotId: item.robot.id,
				robotTitle: item.state.reported.name,
				robotIsReady: item.state.reported.robotState.isReady,
				robotCustomerName: item.state.reported.customerName,
				robotUsername: item.state.reported.ca?.username,
				robotIPAddress: item.state.reported.ca?.ip,
				robotNote: item.state.reported.note,
				robotHidden: item.state.reported.isHidden,
				robotOnlineCheckDisabled: item.state.reported.isOnlineCheckDisabled,
				robotLastSyncedProducts: item.state.reported.lastSyncedProducts,
				robotBatteryPercentage: item.state.reported.status.batteryState.percentage,
				robotControlMode: item.state.reported.status.controlMode,
				robotMission: item.state.reported.status.mission,
				robotAlerts: {
					danger: item.state.reported.alerts.filter(
						(f) => f.level === RobotTwinsSummaryTypeEnum.DANGER
					).length,
					warning: item.state.reported.alerts.filter(
						(f) => f.level === RobotTwinsSummaryTypeEnum.WARNING
					).length
				},
				siteId: item.site.id
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
