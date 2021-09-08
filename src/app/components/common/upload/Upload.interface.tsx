import { Dispatch, SetStateAction } from 'react';

export interface UploadImageInterface {
	image: string;
	setImage: Dispatch<SetStateAction<string>>;
	imageError: number;
	setImageError: Dispatch<SetStateAction<number>>;
	background?: boolean;
}

export interface UploadImageChangeInterface {
	validate: boolean;
	type: number;
	value: string;
}
