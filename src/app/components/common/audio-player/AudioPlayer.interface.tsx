import { Dispatch, MutableRefObject, SetStateAction } from 'react';

export interface AudioPlayerInterface {
	uploadAudio?: boolean;
	tracks: AudioPlayerTrackInterface[];
	onChangeAudio?: (base64: string, track: AudioPlayerTrackInterface) => void;
}

export interface AudioPlayerTrackInterface {
	code: string;
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

export interface AudioPlayerSliderInterface {
	audioRef: MutableRefObject<HTMLAudioElement>;
	intervalRef: MutableRefObject<number>;
	duration: number;
	startTimer: () => void;
	trackProgress: number;
	setTrackProgress: Dispatch<SetStateAction<number>>;
	isPlaying: boolean;
	setIsPlaying: Dispatch<SetStateAction<boolean>>;
}

export interface AudioPlayerListInterface {
	uploadAudio?: boolean;
	tracks: AudioPlayerTrackInterface[];
	trackIndex: number;
	setTrackIndex: Dispatch<SetStateAction<number>>;
	isPlaying: boolean;
	setIsPlaying: Dispatch<SetStateAction<boolean>>;
	onChangeAudio?: (base64: string, track: AudioPlayerTrackInterface) => void;
}
