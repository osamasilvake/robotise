export interface SliceDeepLinkInterface {
	auditLogs: {
		loading: boolean;
		content: SDContentInterface | null;
	};
	battery: {
		loading: boolean;
		content: SDContentInterface | null;
	};
	temperature: {
		loading: boolean;
		content: SDContentInterface | null;
	};
	diagnosticsLogs: {
		loading: boolean;
		content: SDContentInterface | null;
	};
	itemTracking: {
		loading: boolean;
		content: SDContentInterface | null;
	};
	elevatorLogs: {
		loading: boolean;
		content: SDContentInterface | null;
	};
}

export interface SDContentInterface {
	data: {
		dlink: string;
	};
}
