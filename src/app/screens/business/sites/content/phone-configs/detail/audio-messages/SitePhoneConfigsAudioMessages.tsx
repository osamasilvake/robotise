import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import AudioPlayer from '../../../../../../../components/common/audio-player/AudioPlayer';
import { mapPhoneConfig } from '../general/SitePhoneConfigsGeneral.map';
import { SitePhoneConfigsAudioMessagesInterface } from './SitePhoneConfigsAudioMessages.interface';
import { mapAudioMessagesTracks } from './SitePhoneConfigsAudioMessages.map';
import { SitePhoneConfigsAudioMessagesStyle } from './SitePhoneConfigsAudioMessages.style';

const SitePhoneConfigsAudioMessages: FC<SitePhoneConfigsAudioMessagesInterface> = (props) => {
	const { content } = props;
	const { t } = useTranslation('SITES');
	const classes = SitePhoneConfigsAudioMessagesStyle();

	const item = content?.data && mapPhoneConfig(content.data[0]);

	const translation = 'CONTENT.PHONE_CONFIGS.DETAIL.AUDIO';

	return item && item.messages && item.messages.length ? (
		<Box className={classes.sContainer}>
			{/* Title */}
			<Typography variant="h6" color="textSecondary" className={classes.sTitle}>
				{t(`${translation}.TITLE`)}
			</Typography>

			{/* Audio Player */}
			<AudioPlayer tracks={mapAudioMessagesTracks(item.messages, t)} />
		</Box>
	) : null;
};
export default SitePhoneConfigsAudioMessages;
