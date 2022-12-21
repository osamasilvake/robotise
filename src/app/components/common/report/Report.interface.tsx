import { Dispatch, SetStateAction } from 'react';

export interface ReportInterface {
	id: string;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	filterId: string;
	filterType: string;
	state: { loading: boolean };
}

export interface ReportFormInterface {
	id: string;
	from: string;
	to: string;
}
