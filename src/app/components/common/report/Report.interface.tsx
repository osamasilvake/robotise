import { Dispatch, SetStateAction } from 'react';

import { ReportTypeEnum } from './Report.enum';

export interface ReportInterface {
	id: ReportTypeEnum;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	filterId: string;
	state: { loading: boolean };
	GenerateReports: (
		id: ReportTypeEnum,
		filterId: string,
		payload: ReportFormInterface,
		callback: (report: string) => void
	) => void;
}

export interface ReportFormInterface {
	from: string;
	to: string;
}
