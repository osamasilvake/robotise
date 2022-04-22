import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import AudioPlayer from '../../../../../../../components/common/audio-player/AudioPlayer';
import { AudioPlayerTrackInterface } from '../../../../../../../components/common/audio-player/AudioPlayer.interface';
import { AppDispatch } from '../../../../../../../slices';
import {
	PhoneConfigsFetch,
	PhoneConfigUploadAudio
} from '../../../../../../../slices/business/sites/phone-configs/PhoneConfigs.slice';
import { SiteParamsInterface } from '../../../../Site.interface';
import { mapPhoneConfig } from '../general/SitePhoneConfigsGeneral.map';
import { SitePhoneConfigsAudioMessagesInterface } from './SitePhoneConfigsAudioMessages.interface';
import { mapAudioMessagesTracks } from './SitePhoneConfigsAudioMessages.map';
import { SitePhoneConfigsAudioMessagesStyle } from './SitePhoneConfigsAudioMessages.style';

const SitePhoneConfigsAudioMessages: FC<SitePhoneConfigsAudioMessagesInterface> = (props) => {
	const { content } = props;
	const { t } = useTranslation('SITES');
	const classes = SitePhoneConfigsAudioMessagesStyle();

	const dispatch = useDispatch<AppDispatch>();

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;
	const cSiteId = params.siteId;
	const item = content?.data && mapPhoneConfig(content.data[0]);
	const translation = 'CONTENT.PHONE_CONFIGS.DETAIL.AUDIO';

	/**
	 * on change audio file
	 * @param base64
	 * @param track
	 */
	const onChangeAudio = (base64: string, track: AudioPlayerTrackInterface) => {
		const payload = {
			code: track.code,
			audioFileBase64: base64
		};

		// dispatch: upload phone config audio
		item?.id &&
			dispatch(
				PhoneConfigUploadAudio(item.id, payload, () => {
					// dispatch: fetch site phone configs
					dispatch(PhoneConfigsFetch(cSiteId, true));
				})
			);
	};

	return item && item.messages && item.messages.length ? (
		<Box className={classes.sContainer}>
			{/* Title */}
			<Typography variant="h6" color="textSecondary" className={classes.sTitle}>
				{t(`${translation}.TITLE`)}
			</Typography>

			{/* Audio Player */}
			<AudioPlayer
				uploadAudio
				tracks={mapAudioMessagesTracks(item.messages, t)}
				onChangeAudio={onChangeAudio}
			/>
		</Box>
	) : null;
};
export default SitePhoneConfigsAudioMessages;
