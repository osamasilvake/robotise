import { TFunction } from 'react-i18next';

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

	return audioMessages.map((item) => ({
		primary: t(`${translation}.MESSAGES.${item.key}`),
		secondary: item.value,
		src: item.value
	}));
};
