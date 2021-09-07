import { AppConfigService } from '../../../../../../services';
import {
	SRTContentComputerInfoState,
	SRTContentSafetySensorsState,
	SRTContentSafetySystemsState
} from '../../../../../../slices/business/robots/RobotTwins.slice.interface';
import { RobotDetailInformationTypeEnum } from './RobotDetailInformation.enum';

/**
 * map safety content
 * @param data
 * @param type
 * @returns
 */
export const mapSafetyContent = (
	data: SRTContentSafetySystemsState | SRTContentSafetySensorsState,
	type: RobotDetailInformationTypeEnum
) =>
	Object.entries(data.properties).map(([key, value]) => {
		const common = `CONTENT.DETAIL.INFORMATION.${type}.VALUES`;
		return {
			icon: `${common}.${key}.ICON`,
			label: `${common}.${key}.LABEL`,
			msg1: `${common}.${key}.MSG_1`,
			msg2: `${common}.${key}.MSG_2`,
			value: typeof value === 'object' ? value.every((val) => !!val) : Boolean(value)
		};
	});

/**
 * map computer info
 * @param data
 * @param type
 * @returns
 */
export const mapComputerInfo = (
	data: SRTContentComputerInfoState,
	type: RobotDetailInformationTypeEnum
) =>
	Object.entries(data.properties).map(([key, value]) => {
		const common = `CONTENT.DETAIL.INFORMATION.${type}.VALUES`;
		const none = AppConfigService.AppOptions.common.none;
		return {
			icon: `${common}.${key}.ICON`,
			label: `${common}.${key}.LABEL`,
			value: Object.entries(value).map(([k, val]) => ({
				key: Number.isInteger(Number(k)) ? `idx: ${k}` : k,
				value: Array.isArray(val)
					? val.join(', ')
					: typeof val === 'object'
					? Object.entries(val)
							.map(([k, v]) => `${k}: ${v || none}`)
							.join(', ')
					: val
			}))
		};
	});
