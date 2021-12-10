import { AppConfigService } from '../../../../../../services';
import {
	SRTContentComputerInfoInterface,
	SRTContentHumanPerceptionInterface,
	SRTContentSafetySensorsInterface,
	SRTContentSafetySystemsInterface,
	SRTContentTransitPointStartedInterface
} from '../../../../../../slices/business/robots/RobotTwins.slice.interface';
import {
	RobotDetailInformationTypeEnum,
	RobotDetailSafetySystemKeysTypeEnum
} from './RobotDetailInformation.enum';
import { RobotDetailSafetyMappedResultInterface } from './RobotDetailInformation.interface';

const safetyOpposites = [
	RobotDetailSafetySystemKeysTypeEnum.FRONT_MUTING_ACTIVE,
	RobotDetailSafetySystemKeysTypeEnum.BACK_MUTING_ACTIVE,
	RobotDetailSafetySystemKeysTypeEnum.BRAKE_RELEASE_PRESSED,
	RobotDetailSafetySystemKeysTypeEnum.FORCE_BRAKE_ACTIVE,
	RobotDetailSafetySystemKeysTypeEnum.FORCE_STOP0_ACTIVE,
	RobotDetailSafetySystemKeysTypeEnum.STOP0_RESET_REQUIRED,
	RobotDetailSafetySystemKeysTypeEnum.STOP1_RESET_REQUIRED
];
const safetyWarnings = [
	RobotDetailSafetySystemKeysTypeEnum.FRONT_MUTING_ACTIVE,
	RobotDetailSafetySystemKeysTypeEnum.BACK_MUTING_ACTIVE,
	RobotDetailSafetySystemKeysTypeEnum.BRAKE_RELEASE_PRESSED,
	RobotDetailSafetySystemKeysTypeEnum.NO_STOP2_TRIGGER,
	RobotDetailSafetySystemKeysTypeEnum.DRAWERS,
	RobotDetailSafetySystemKeysTypeEnum.LIDAR_TOP,
	RobotDetailSafetySystemKeysTypeEnum.LIDAR_BOTTOM
];

/**
 * map safety content
 * @param data
 * @param type
 * @returns
 */
export const mapSafetyContent = (
	data: SRTContentSafetySystemsInterface | SRTContentSafetySensorsInterface,
	type: RobotDetailInformationTypeEnum
): RobotDetailSafetyMappedResultInterface[] =>
	Object.entries(data.properties).map(([key, value]) => {
		const translation = `CONTENT.DETAIL.INFORMATION.${type}.VALUES`;
		const ky = key as RobotDetailSafetySystemKeysTypeEnum;
		return {
			key: ky,
			icon: `${translation}.${key}.ICON`,
			label: `${translation}.${key}.LABEL`,
			msg1: `${translation}.${key}.MSG_1`,
			msg2: `${translation}.${key}.MSG_2`,
			value: typeof value === 'object' ? value.every((val) => !!val) : Boolean(value),
			opposite: safetyOpposites.includes(ky),
			warning: safetyWarnings.includes(ky)
		};
	});

/**
 * map computer info
 * @param data
 * @param type
 * @returns
 */
export const mapComputerInfo = (
	data: SRTContentComputerInfoInterface,
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
	data: SRTContentHumanPerceptionInterface,
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
	data: SRTContentTransitPointStartedInterface,
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
									.concat()
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
