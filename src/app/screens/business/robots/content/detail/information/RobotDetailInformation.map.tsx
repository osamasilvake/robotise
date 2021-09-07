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
		const translation = `CONTENT.DETAIL.INFORMATION.${type}.VALUES`;
		return {
			icon: `${translation}.${key}.ICON`,
			label: `${translation}.${key}.LABEL`,
			msg1: `${translation}.${key}.MSG_1`,
			msg2: `${translation}.${key}.MSG_2`,
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
		const translation = `CONTENT.DETAIL.INFORMATION.${type}.VALUES`;
		const none = AppConfigService.AppOptions.common.none;
		return {
			icon: `${translation}.${key}.ICON`,
			label: `${translation}.${key}.LABEL`,
			value: Object.entries(value).map(([ky, val]) => ({
				key: Number.isInteger(Number(ky)) ? `idx: ${ky}` : ky,
				value: Array.isArray(val)
					? val.join(', ')
					: typeof val === 'object'
					? Object.entries(val)
							.map(([k, v]) => `${k}: ${v || none}`)
							.join(', ')
					: val || none
			}))
		};
	});
