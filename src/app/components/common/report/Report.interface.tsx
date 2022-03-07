import { Dispatch, SetStateAction } from 'react';

export interface ReportInterface {
	id: string;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	filterId: string;
	filterIdType: string;
	state: { loading: boolean };
	GenerateReports: (
		filterId: string,
		filterIdType: string,
		payload: ReportFormInterface,
		callback: (report: string) => void
	) => void;
}

export interface ReportFormInterface {
	id: string;
	from: string;
	to: string;
}
