import { Dispatch, SetStateAction } from 'react';

import { SRTContentDataInterface } from '../../../../../../slices/business/robots/RobotTwins.slice.interface';

export interface RobotDetailGeneralInterface {
	robotTwins: SRTContentDataInterface;
}

export interface NoteInterface {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	note: string | undefined;
}

export interface NoteFormInterface {
	note: string;
}
