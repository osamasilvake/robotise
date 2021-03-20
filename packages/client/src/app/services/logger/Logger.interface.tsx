export interface LogInterface extends LogErrorInterface {
	env: string;
	level: string;
	token: string;
	apiVersion: string;
	appVersion: string;
	pageUrl: string;
	timestamp: string;
	origin: string;
}

export interface LogErrorInterface {
	message: string;
	method: string;
	name: string;
	payload: string;
	stacktrace: string;
	status: number;
	url: string;
}
