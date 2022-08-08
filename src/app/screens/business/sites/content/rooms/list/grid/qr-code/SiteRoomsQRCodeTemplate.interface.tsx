import { Dispatch, SetStateAction } from 'react';

import { ISite } from '../../../../../../../../slices/business/sites/Sites.slice.interface';

export interface QRCodeTemplateInterface {
	text: string;
	code: string;
	smsTo: string;
	room: string;
	siteTitle: string;
	iframeId: string;
	iframeUrl: string;
	showIframe: boolean;
}

export interface DialogGenerateQRCodeInterface {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	roomState: { room: string };
	siteSingle: ISite;
}

export interface DialogGenerateQRCodeFormInterface {
	room: string;
	date: string;
	time: string;
}
