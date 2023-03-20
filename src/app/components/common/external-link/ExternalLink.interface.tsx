import { ExternalLinkActionTypeEnum, ExternalLinkTypeEnum } from './ExternalLink.enum';

export interface ExternalLinkInterface {
	index?: number;
	type?: ExternalLinkTypeEnum;
	actionType: ExternalLinkActionTypeEnum;
	text: string;
	payload: ExternalLinkPayloadInterface;
	showIcon?: boolean;
	disabled?: boolean;
}

export interface ExternalLinkPayloadInterface {
	siteId?: string;
	robotId?: string;
	vendor?: string;
	from?: Date | string;
	to?: Date | string;
	callId?: string;
}

export interface ExternalLinkCallbackResponseInterface {
	data: {
		dlink: string;
	};
}
