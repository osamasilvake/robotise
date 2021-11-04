import { Dispatch, SetStateAction } from 'react';

export interface ReportInterface {
	id: string;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	filterId: string;
	state: { loading: boolean };
	GenerateReports: (
		filterId: string,
		payload: ReportFormInterface,
		callback: (report: string) => void
	) => void;
}

export interface ReportFormInterface {
	from: string;
	to: string;
}
