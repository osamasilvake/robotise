export interface SliceDeepLinkInterface {
	alertLogs: {
		loading: boolean;
		content: SDContentInterface | null;
	};
	alertDashboardLogs: {
		loading: boolean;
		content: SDContentInterface | null;
	};
	auditLogs: {
		loading: boolean;
		content: SDContentInterface | null;
	};
	battery: {
		loading: boolean;
		content: SDContentInterface | null;
	};
	coolingUnit: {
		loading: boolean;
		content: SDContentInterface | null;
	};
	diagnosticsLogs: {
		loading: boolean;
		content: SDContentInterface | null;
	};
	elevatorDashboard: {
		loading: boolean;
		content: SDContentInterface | null;
	};
	elevatorLogs: {
		loading: boolean;
		content: SDContentInterface | null;
	};
	itemTracking: {
		loading: boolean;
		content: SDContentInterface | null;
	};
	scrapper: {
		loading: boolean;
		content: SDContentInterface | null;
	};
	temperature: {
		loading: boolean;
		content: SDContentInterface | null;
	};
	wikiPage: {
		loading: boolean;
		content: SDContentInterface | null;
	};
}

export interface SDContentInterface {
	data: {
		dlink: string;
		link?: string;
	};
}
