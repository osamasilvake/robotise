export interface LogInterface extends LogErrorInterface {
	env: string;
	level: string;
	token: string;
	version: LogVersionInterface;
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

export interface LogVersionInterface {
	app: string;
	api: string;
}
