import {
	FastForwardOutlined,
	FastRewindOutlined,
	PauseCircleOutlined,
	PlayCircleOutlined
} from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { FC } from 'react';

import { AudioPlayerControlsInterface } from './AudioPlayer.interface';

const AudioPlayerControls: FC<AudioPlayerControlsInterface> = (props) => {
	const { isPlaying, onPlayPauseClick, onPrevClick, onNextClick } = props;

	return (
		<Box>
			<IconButton edge="start" onClick={onPrevClick}>
				<FastRewindOutlined color="primary" />
			</IconButton>

			{isPlaying ? (
				<IconButton onClick={() => onPlayPauseClick(false)}>
					<PauseCircleOutlined color="primary" />
				</IconButton>
			) : (
				<IconButton onClick={() => onPlayPauseClick(true)}>
					<PlayCircleOutlined color="primary" />
				</IconButton>
			)}

			<IconButton edge="end" onClick={onNextClick}>
				<FastForwardOutlined color="primary" />
			</IconButton>
		</Box>
	);
};
export default AudioPlayerControls;
