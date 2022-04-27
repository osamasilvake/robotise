import { strCapitalLetterAndCamelCaseToDash } from '../../../../../../../utilities/methods/String';
import { SitePhoneConfigsAudioMessagesTypeEnum } from './SitePhoneConfigsAudioMessages.enum';
import { SitePhoneConfigsAudioMessagesDataInterface } from './SitePhoneConfigsAudioMessages.interface';

/**
 * map audio messages tracks
 * @param audioMessages
 * @returns
 */
export const mapAudioMessagesTracks = (
	audioMessages: SitePhoneConfigsAudioMessagesDataInterface[]
) => {
	const filteredList: string[] = Object.values(SitePhoneConfigsAudioMessagesTypeEnum);

	return audioMessages
		.filter((item) => filteredList.includes(item.key))
		.map((item) => ({
			code: item.key,
			primary: strCapitalLetterAndCamelCaseToDash(item.key),
			secondary: item.value,
			src: item.value
		}));
};
