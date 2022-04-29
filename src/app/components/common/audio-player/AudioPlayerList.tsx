import { PauseCircleOutlined, PlayCircleOutlined, Upload } from '@mui/icons-material';
import {
	CircularProgress,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Tooltip
} from '@mui/material';
import { ChangeEvent, FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { phoneConfigsSelector } from '../../../slices/business/sites/phone-configs/PhoneConfigs.slice';
import { fileConvertBase64 } from '../../../utilities/methods/File';
import { AudioPlayerListInterface, AudioPlayerTrackInterface } from './AudioPlayer.interface';
import { allowedAudioExtensions } from './AudioPlayer.list';
import { AudioPlayerStyle } from './AudioPlayer.style';

const AudioPlayerList: FC<AudioPlayerListInterface> = (props) => {
	const {
		uploadAudio,
		tracks,
		trackIndex,
		setTrackIndex,
		isPlaying,
		setIsPlaying,
		onChangeAudio
	} = props;
	const { t } = useTranslation('TOOLTIP');
	const classes = AudioPlayerStyle();

	const phoneConfigs = useSelector(phoneConfigsSelector);

	const [audioIdx, setAudioIdx] = useState(-1);

	/**
	 * on file change
	 * @param event
	 * @param track
	 * @param idx
	 * @returns
	 */
	const onFileChange = async (
		event: ChangeEvent<HTMLInputElement>,
		track: AudioPlayerTrackInterface,
		idx: number
	) => {
		// file
		const files = event.target?.files;
		if (!files) return;
		const file = files[0];

		// convert file to base64
		const base64 = await fileConvertBase64(file);
		if (!base64) return;

		// set audio index
		setAudioIdx(idx);

		// on change audio
		onChangeAudio && onChangeAudio(base64 as string, track);
	};

	/**
	 * list item selection: play or set new track
	 * @param idx
	 */
	const onListItemSelection = (idx: number) => {
		// play or set new track
		if (trackIndex === idx) {
			setIsPlaying(!isPlaying);
		} else {
			setTrackIndex(idx);
		}
	};

	return (
		<List dense>
			{tracks.map((track, idx) => (
				<ListItem
					disablePadding
					key={track.primary}
					secondaryAction={
						uploadAudio ? (
							<Tooltip
								title={t<string>('TOOLTIP:AUDIO_PLAYER.UPLOAD')}
								placement="top">
								<IconButton edge="end">
									{phoneConfigs && phoneConfigs.updating && audioIdx === idx ? (
										<CircularProgress size={20} />
									) : (
										<label htmlFor={`audio-upload-${idx}`}>
											<Upload
												color="primary"
												className={classes.sListFileIcon}
											/>
											<input
												hidden
												id={`audio-upload-${idx}`}
												type="file"
												accept={allowedAudioExtensions.join(',')}
												onChange={(e) => onFileChange(e, track, idx)}
											/>
										</label>
									)}
								</IconButton>
							</Tooltip>
						) : null
					}>
					<ListItemButton onClick={() => onListItemSelection(idx)}>
						<ListItemIcon>
							{isPlaying && trackIndex === idx ? (
								<IconButton>
									<PauseCircleOutlined color="primary" />
								</IconButton>
							) : (
								<IconButton>
									<PlayCircleOutlined color="primary" />
								</IconButton>
							)}
						</ListItemIcon>
						<ListItemText
							primary={track.primary}
							secondary={track.secondary}
							className={classes.sListItemText}
						/>
					</ListItemButton>
				</ListItem>
			))}
		</List>
	);
};
export default AudioPlayerList;
