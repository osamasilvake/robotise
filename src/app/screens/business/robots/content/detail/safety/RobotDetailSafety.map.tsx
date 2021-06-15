import {
	SRTContentSafetySensorsState,
	SRTContentSafetySystemsState
} from '../../../../../../slices/robots/RobotTwins.slice.interface';
import { RobotDetailSafetyTypeEnum } from './RobotDetailSafety.enum';

/**
 * map safety content
 * @param data
 * @param type
 * @returns
 */
export const mapSafetyContent = (
	data: SRTContentSafetySystemsState | SRTContentSafetySensorsState,
	type: RobotDetailSafetyTypeEnum
) =>
	Object.entries(data.properties).map(([key, value]) => {
		const common = `CONTENT.DETAIL.SAFETY.${type}.VALUES`;
		return {
			proto: `${common}.${key}.LABEL`,
			msg1: `${common}.${key}.MSG_1`,
			msg2: `${common}.${key}.MSG_2`,
			value: typeof value === 'object' ? value.every((val) => !!val) : Boolean(value)
		};
	});
