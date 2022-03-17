import { TFunction } from 'react-i18next';

import { SitePhoneConfigsAudioMessagesTypeEnum } from './SitePhoneConfigsAudioMessages.enum';
import { SitePhoneConfigsAudioMessagesDataInterface } from './SitePhoneConfigsAudioMessages.interface';

/**
 * map audio messages tracks
 * @param audioMessages
 * @param t
 * @returns
 */
export const mapAudioMessagesTracks = (
	audioMessages: SitePhoneConfigsAudioMessagesDataInterface[],
	t: TFunction<'SITES'>
) => {
	const translation = 'CONTENT.PHONE_CONFIGS.DETAIL.AUDIO';
	const filteredList: string[] = Object.values(SitePhoneConfigsAudioMessagesTypeEnum);

	return audioMessages
		.filter((item) => filteredList.includes(item.key))
		.map((item) => ({
			code: item.key,
			primary: t(`${translation}.MESSAGES.${item.key}`),
			secondary: item.value,
			src: item.value
		}));
};
