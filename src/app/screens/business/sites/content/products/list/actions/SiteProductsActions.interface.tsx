import { Dispatch, SetStateAction } from 'react';

export interface DialogProductsReportInterface {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface DialogProductsReportPayloadInterface {
	from: string;
	to: string;
}
