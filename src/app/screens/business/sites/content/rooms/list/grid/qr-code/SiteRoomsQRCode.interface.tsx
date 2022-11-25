import { Dispatch, SetStateAction } from 'react';

import { SQRDataInterface } from '../../../../../../../../slices/business/sites/rooms/qrCode/QRCodes.slice.interface';
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

export interface DialogDeleteConfirmationInterface {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	currentState: { status: boolean; type: QRCodeTemplateEnumType };
	setCurrentState: Dispatch<SetStateAction<{ status: boolean; type: QRCodeTemplateEnumType }>>;
	cSiteId: string;
	qrCodeSingle: SQRDataInterface;
}
