import { Dispatch, SetStateAction } from 'react';

export interface ReportInterface {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	id: string;
	state: { loading: boolean };
	GenerateReports: (
		id: string,
		payload: ReportPayloadInterface,
		callback: (report: string) => void
	) => void;
}

export interface ReportPayloadInterface {
	from: string;
	to: string;
}
