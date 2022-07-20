import { Grid, Slider, Typography } from '@mui/material';
import { FC } from 'react';

import { AudioPlayerSliderInterface } from './AudioPlayer.interface';
import { AudioPlayerStyle } from './AudioPlayer.style';

const AudioPlayerSlider: FC<AudioPlayerSliderInterface> = (props) => {
	const {
		audioRef,
		intervalRef,
		duration,
		startTimer,
		trackProgress,
		setTrackProgress,
		isPlaying,
		setIsPlaying
	} = props;
	const classes = AudioPlayerStyle();

	/**
	 * on scrub
	 * @param value
	 */
	const onScrub = (value: number) => {
		// clear timers already running
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
		<Grid container className={classes.sTrackProgressGrid}>
			<Grid item xs={10}>
				<Slider
					value={trackProgress}
					min={0}
					max={duration || 0}
					step={0.01}
					onChange={(_e, v) => onScrub(+v)}
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
	);
};
export default AudioPlayerSlider;
