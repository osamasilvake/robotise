import { Dispatch, SetStateAction } from 'react';

import { ISite } from '../../../../../../../../slices/business/sites/Sites.slice.interface';
import { QRCodeTemplateEnumType } from './SiteRoomsQRCode.enum';

export interface QRCodeTemplateInterface {
	text: string;
	code: string;
	smsTo: string;
	room: string;
	siteTitle: string;
	iframeId: string;
	iframeUrl: string;
	currentState: { status: boolean; type: QRCodeTemplateEnumType };
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
