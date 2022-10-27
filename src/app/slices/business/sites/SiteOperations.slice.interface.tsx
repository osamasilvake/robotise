import { JsonAPIResponseInterface } from '../../JsonAPI.interface';

export interface SliceSiteOperationsInterface {
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

export interface SEVContentInterface extends JsonAPIResponseInterface {
	data: SEVContentDataInterface[];
}

export interface SEVContentDataInterface {
	title: string;
	code: string;
	active: boolean;
}
