export interface PictureInterface {
	src: string;
	alt: string;
	onLoad?: (values: PictureOnLoadInterface) => void;
	fullWidth?: boolean;
}

export interface PictureOnLoadInterface {
	naturalWidth: number;
	naturalHeight: number;
	clientWidth: number;
	clientHeight: number;
}
