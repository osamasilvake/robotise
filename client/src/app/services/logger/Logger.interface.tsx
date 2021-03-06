export interface LogErrorInterface {
	message: string;
	method: string;
	name: string;
	payload: string;
	stacktrace: string;
	status: number;
	url: string;
}

export interface LogInterface extends LogErrorInterface {
	env: string;
	level: LogLevelInterface;
	logger: string;
	origin: string;
	version: string;
}

export interface LogLevelInterface {
	label: string;
}
