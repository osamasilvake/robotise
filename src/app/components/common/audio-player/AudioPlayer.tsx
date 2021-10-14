import { PauseCircleOutlined, PlayCircleOutlined } from '@mui/icons-material';
import {
	Box,
	Card,
	CardContent,
	Divider,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Slider,
	Typography
} from '@mui/material';
import { FC, useCallback, useEffect, useRef, useState } from 'react';

import AudioPlayerControls from './AudioPlayer.controls';
import { AudioPlayerInterface } from './AudioPlayer.interface';
import { AudioPlayerStyle } from './AudioPlayer.style';

const AudioPlayer: FC<AudioPlayerInterface> = (props) => {
	const { tracks } = props;
	const classes = AudioPlayerStyle();

	const [trackIndex, setTrackIndex] = useState(0);
	const [trackProgress, setTrackProgress] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);

	const { primary, secondary, src } = tracks[trackIndex];

	const audioRef = useRef(new Audio(src));
	const intervalRef = useRef(0);
	const isReady = useRef(false);
	const playRef = useRef<Promise<void> | null>(null);

	const { duration } = audioRef.current;

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

		// set track progress
		setTrackProgress(audioRef.current.currentTime);

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
		setTrackIndex(trackIndex - 1 < 0 ? tracks.length - 1 : trackIndex - 1);
	};

	/**
	 * set next track
	 */
	const toNextTrack = useCallback(() => {
		setTrackIndex(trackIndex < tracks.length - 1 ? trackIndex + 1 : 0);
	}, [trackIndex, tracks.length]);

	/**
	 * on scrub
	 * @param value
	 */
	const onScrub = (value: number) => {
		// clear any timers already running
		clearInterval(intervalRef.current);

		// set current time
		audioRef.current.currentTime = value;

		// set track progress
		setTrackProgress(audioRef.current.currentTime);
	};

	/**
	 * on scrub end
	 */
	const onScrubEnd = () => {
		// if not already playing, start
		if (!isPlaying) {
			setIsPlaying(true);
		}

		// start timer
		startTimer();
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

				<Grid container className={classes.sTrackProgressGrid}>
					<Grid item xs={10}>
						<Slider
							value={trackProgress}
							min={0}
							max={duration || 0}
							step={0.01}
							onChange={(_e, v) => onScrub(Number(v))}
							onMouseUp={onScrubEnd}
							onKeyUp={onScrubEnd}
						/>
					</Grid>
					<Grid item xs={2}>
						{!Number.isNaN(duration) && (
							<Typography
								variant="caption"
								color="textSecondary"
								className={classes.sTimeTicker}>
								{Math.round(trackProgress)}/{Math.round(duration)}s
							</Typography>
						)}
					</Grid>
				</Grid>
			</CardContent>

			<Divider />

			<List dense>
				{tracks.map((track, idx) => (
					<ListItem
						disablePadding
						key={track.src}
						onClick={() =>
							trackIndex === idx ? setIsPlaying(!isPlaying) : setTrackIndex(idx)
						}>
						<ListItemButton>
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
		</Card>
	);
};
export default AudioPlayer;
