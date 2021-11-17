export interface ExternalLinkInterface {
	index?: number;
	text: string;
	payload: ExternalLinkPayloadInterface;
	FetchExternalLink: (
		payload: ExternalLinkPayloadInterface,
		callback: (res: ExternalLinkCallbackResponseInterface) => void
	) => void;
	showIcon?: boolean;
	disabled?: boolean;
}

export interface ExternalLinkPayloadInterface {
	siteId?: string;
	robotId?: string;
	vendor?: string;
	from: Date | string;
	to: Date | string;
}

export interface ExternalLinkCallbackResponseInterface {
	data: {
		dlink: string;
	};
}
