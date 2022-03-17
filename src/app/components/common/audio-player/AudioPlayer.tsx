import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import { FC, useCallback, useEffect, useRef, useState } from 'react';

import { AudioPlayerInterface } from './AudioPlayer.interface';
import { AudioPlayerStyle } from './AudioPlayer.style';
import AudioPlayerControls from './AudioPlayerControls';
import AudioPlayerList from './AudioPlayerList';
import AudioPlayerSlider from './AudioPlayerSlider';

const AudioPlayer: FC<AudioPlayerInterface> = (props) => {
	const { uploadAudio, tracks, onChangeAudio } = props;
	const classes = AudioPlayerStyle();

	const [trackIndex, setTrackIndex] = useState(0);
	const [trackProgress, setTrackProgress] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [duration, setDuration] = useState(0);

	const { primary, secondary, src } = tracks[trackIndex];

	const audioRef = useRef(new Audio(src));
	const intervalRef = useRef(0);
	const isReady = useRef(false);
	const playRef = useRef<Promise<void> | null>(null);

	/**
	 * start timer
	 */
	const startTimer = useCallback(() => {
		// clear any timers already running
		clearInterval(intervalRef.current);

		// set track progress
		intervalRef.current = window.setInterval(() => {
			if (audioRef.current.ended) {
				// reset track progress
				setTrackProgress(0);

				// reset isPlaying
				setIsPlaying(false);

				// clear interval
				clearInterval(intervalRef.current);
			} else {
				setTrackProgress(audioRef.current.currentTime);
			}
		}, 100);
	}, []);

	useEffect(() => {
		// pause audio
		audioRef.current.pause();

		// set audio
		audioRef.current = new Audio(src);

		// set duration
		const handleDuration = () => setDuration(audioRef.current.duration);
		audioRef.current.addEventListener('durationchange', handleDuration);

		// set track progress
		setTrackProgress(audioRef.current.currentTime);

		// isReady
		// case 1: init: set true
		// case 2: << >>: set true
		// case 3: list item selection: set true
		// case 4: audio upload: set false
		if (isReady.current) {
			// play audio
			playRef.current = audioRef.current.play();

			// set isPlaying
			setIsPlaying(true);

			// start timer
			startTimer();
		} else {
			isReady.current = true;
		}

		return () => audioRef.current.removeEventListener('durationchange', handleDuration);
	}, [src, startTimer]);

	useEffect(() => {
		if (isPlaying) {
			// play audio
			playRef.current = audioRef.current.play();

			// start timer
			startTimer();
		} else {
			playRef.current && playRef.current.then(() => audioRef.current.pause());
		}
	}, [isPlaying, startTimer]);

	useEffect(() => {
		return () => {
			// pause audio
			audioRef.current.pause();

			// clear interval
			clearInterval(intervalRef.current);
		};
	}, []);

	/**
	 * set previous track
	 */
	const toPrevTrack = () => {
		// isReady: set
		isReady.current = true;

		// set track
		setTrackIndex(trackIndex - 1 < 0 ? tracks.length - 1 : trackIndex - 1);
	};

	/**
	 * set next track
	 */
	const toNextTrack = () => {
		// isReady: set
		isReady.current = true;

		// set track
		setTrackIndex(trackIndex < tracks.length - 1 ? trackIndex + 1 : 0);
	};

	return (
		<Card>
			<CardContent className={classes.sCardContent}>
				<Box className={classes.sText}>
					<Typography variant="h5">{primary}</Typography>
					<Typography variant="caption" color="textSecondary">
						{secondary}
					</Typography>
				</Box>

				<AudioPlayerControls
					isPlaying={isPlaying}
					onPrevClick={toPrevTrack}
					onNextClick={toNextTrack}
					onPlayPauseClick={setIsPlaying}
				/>

				<AudioPlayerSlider
					audioRef={audioRef}
					intervalRef={intervalRef}
					duration={duration}
					startTimer={startTimer}
					trackProgress={trackProgress}
					setTrackProgress={setTrackProgress}
					isPlaying={isPlaying}
					setIsPlaying={setIsPlaying}
				/>
			</CardContent>

			<Divider />

			<AudioPlayerList
				uploadAudio={uploadAudio}
				tracks={tracks}
				trackIndex={trackIndex}
				setTrackIndex={setTrackIndex}
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
				onChangeAudio={onChangeAudio}
				isReady={isReady}
			/>
		</Card>
	);
};
export default AudioPlayer;
