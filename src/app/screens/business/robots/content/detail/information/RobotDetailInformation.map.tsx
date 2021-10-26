import { AppConfigService } from '../../../../../../services';
import {
	SRTContentComputerInfo,
	SRTContentHumanPerception,
	SRTContentSafetySensors,
	SRTContentSafetySystems,
	SRTContentTransitPointStarted
} from '../../../../../../slices/business/robots/RobotTwins.slice.interface';
import { RobotDetailInformationTypeEnum } from './RobotDetailInformation.enum';

/**
 * map safety content
 * @param data
 * @param type
 * @returns
 */
export const mapSafetyContent = (
	data: SRTContentSafetySystems | SRTContentSafetySensors,
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
	data: SRTContentComputerInfo,
	type: RobotDetailInformationTypeEnum
) =>
	Object.entries(data.properties)
		.map(([key, val]) => ({ key, val: val || [] }))
		.map((item) => {
			const translation = `CONTENT.DETAIL.INFORMATION.${type}.VALUES`;
			const none = AppConfigService.AppOptions.common.none;
			const value = (item.val as []).length !== 0 ? item.val : null;
			return {
				icon: `${translation}.${item.key}.ICON`,
				label: `${translation}.${item.key}.LABEL`,
				value: value
					? Object.entries(value)
							.filter(([, val]) => !!val)
							.map(([k, v]) => ({
								key: k,
								value: Array.isArray(v)
									? v.join(', ') || none
									: typeof v === 'object'
									? Object.entries(v)
											.map(([k, v]) => `${k}: ${v || none}`)
											.join(', ')
									: v || none
							}))
					: none
			};
		});

/**
 * map human perception
 * @param data
 * @param type
 * @returns
 */
export const mapHumanPerception = (
	data: SRTContentHumanPerception,
	type: RobotDetailInformationTypeEnum
) =>
	Object.entries(data.properties)
		.map(([key, val]) => ({ key, val: val || [] }))
		.map((item) => {
			const translation = `CONTENT.DETAIL.INFORMATION.${type}.VALUES`;
			const none = AppConfigService.AppOptions.common.none;
			return {
				icon: `${translation}.${item.key}.ICON`,
				label: `${translation}.${item.key}.LABEL`,
				value: !Array.isArray(item.val)
					? item.val
					: item.val.length
					? item.val.map((val) =>
							Object.entries(val)
								.map(([k, v]) => `${k}: ${v || none}`)
								.join(', ')
					  )
					: none
			};
		});

/**
 * map transit point started
 * @param data
 * @param type
 * @returns
 */
export const mapTransitPointStarted = (
	data: SRTContentTransitPointStarted,
	type: RobotDetailInformationTypeEnum
) =>
	Object.entries(data.properties)
		.map(([key, val]) => ({ key, val: val || [] }))
		.map((item) => {
			const translation = `CONTENT.DETAIL.INFORMATION.${type}.VALUES`;
			const none = AppConfigService.AppOptions.common.none;
			const value = (item.val as []).length !== 0 ? item.val : null;
			return {
				icon: `${translation}.${item.key}.ICON`,
				label: `${translation}.${item.key}.LABEL`,
				value: value
					? typeof value === 'string'
						? value
						: Object.entries(value).map(([ky, val]) => ({
								key: `idx: ${ky}`,
								value: Object.entries(val)
									.sort()
									.map(([k, v]) =>
										Array.isArray(v) ? [k, v.join(', ')] : [k, v]
									)
									.map(([k, v]) => `${k}: ${v || none}`)
									.join(', ')
						  }))
					: none
			};
		});
