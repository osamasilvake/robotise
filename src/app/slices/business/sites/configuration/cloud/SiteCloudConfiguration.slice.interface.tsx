import { JsonAPIResponseInterface } from '../../../../JsonAPI.interface';

export interface SliceSiteCloudConfigurationInterface {
	acceptOrders: {
		loading: boolean;
	};
	siteRobotConfig: {
		loading: boolean;
	};
	siteConfig: {
		loading: boolean;
	};
	orderOrigins: {
		loading: boolean;
		content: SOOContentInterface | null;
	};
	customerNotificationTypes: {
		loading: boolean;
		content: SCNContentInterface | null;
	};
	helpPages: {
		loading: boolean;
		content: SHPContentInterface | null;
	};
	elevatorVendors: {
		loading: boolean;
		content: SEVContentInterface | null;
	};
	paymentSettings: {
		loading: boolean;
	};
	cleanTestOrders: {
		loading: boolean;
	};
}

export interface SOOContentInterface extends JsonAPIResponseInterface {
	data: SOOContentDataInterface[];
}

export interface SOOContentDataInterface {
	origin: string;
}

export interface SCNContentInterface extends JsonAPIResponseInterface {
	data: SCNContentDataInterface[];
}

export interface SCNContentDataInterface {
	type: string;
}

export interface SHPContentInterface {
	data: SHPContentDataInterface[];
}

export interface SHPContentDataInterface {
	id: string;
	contentType: string;
	createdAt: Date;
	description: string;
	locale: string;
	path: string;
	title: string;
	tags: string[];
}

export interface SEVContentInterface extends JsonAPIResponseInterface {
	data: SEVContentDataInterface[];
}

export interface SEVContentDataInterface {
	title: string;
	code: string;
	active: boolean;
}
