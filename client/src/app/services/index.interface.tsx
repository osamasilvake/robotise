export interface errorLogInterface {
	message: string;
	method: string;
	name: string;
	payload: string;
	stacktrace: string;
	status: number;
	url: string;
}

export interface logInterface extends errorLogInterface {
	env: string;
	level: logLevelInterface;
	logger: string;
	origin: string;
	version: string;
}

export interface logLevelInterface {
	label: string;
}
