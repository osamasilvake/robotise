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
