export interface AudioPlayerInterface {
	tracks: AudioPlayerTrackInterface[];
}

export interface AudioPlayerTrackInterface {
	primary: string;
	secondary: string;
	src: string;
}

export interface AudioPlayerControlsInterface {
	isPlaying: boolean;
	onPlayPauseClick: (arg: boolean) => void;
	onPrevClick: () => void;
	onNextClick: () => void;
}
