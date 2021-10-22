import { CLCDataInterface } from '../../../slices/business/robots/commands-log/CommandsLog.slice.interface';
import { ECCDataInterface } from '../../../slices/business/robots/elevator-calls/ElevatorCalls.slice.interface';
import { SICDrawerInterface } from '../../../slices/business/robots/inventory/Inventory.slice.interface';
import { SOCDataInterface } from '../../../slices/business/robots/orders/Orders.slice.interface';
import { SPCDataInterface } from '../../../slices/business/robots/purchases/Purchases.slice.interface';
import { SRContentMapInterface } from '../../../slices/business/robots/Robot.slice.interface';
import { IRobotTwin } from '../../../slices/business/robots/RobotTwins.slice.interface';
import { IRobotTwinSummary } from '../../../slices/business/robots/RobotTwinsSummary.slice.interface';
import { JsonApiResponse } from '../../../slices/JsonApi.interface';
import { DialogCreateOrderFormInterface } from './content/orders/list/actions/RobotOrdersActions.interface';

export interface RobotTwinSummaryAxiosGetInterface {
	data: {
		id: string;
		type: string;
		attributes: IRobotTwinSummary;
	}[];
}

export interface RobotTwinsAxiosGetInterface {
	data: {
		id: string;
		type: string;
		attributes: IRobotTwin;
	};
}

export interface RobotMapLocationAxiosGetInterface {
	data: {
		id: string;
		type: string;
		attributes: SRContentMapInterface;
	};
}

export interface RobotInventoryAxiosGetInterface {
	data: {
		id: string;
		type: string;
		attributes: {
			drawers: SICDrawerInterface[];
			status: string;
		};
	};
}

export interface RobotOrdersAxiosGetInterface extends JsonApiResponse {
	data: {
		id: string;
		type: string;
		attributes: SOCDataInterface;
	}[];
}

export interface RobotOrderCreateAxiosPostRequestInterface {
	data: {
		type: string;
		attributes: DialogCreateOrderFormInterface;
		relationships: {
			site: {
				data: {
					type: string;
					id: string;
				};
			};
		};
	};
}

export interface RobotOrderCreateAxiosPostResponseInterface {
	data: {
		id: string;
		type: string;
		attributes: SOCDataInterface;
	};
}

export interface RobotOrderCancelAxiosPatchRequestInterface {
	data: {
		id: string;
		type: string;
		attributes: {
			status: string;
		};
		relationships: {
			site: {
				data: {
					type: string;
					id: string;
				};
			};
		};
	}[];
}

export interface RobotOrderCancelAxiosPatchResponseInterface {
	data: {
		id: string;
		type: string;
		attributes: SOCDataInterface;
	};
}

export interface RobotOrderAxiosGetInterface {
	data: {
		id: string;
		type: string;
		attributes: SOCDataInterface;
	};
}

export interface RobotPurchasesAxiosGetInterface extends JsonApiResponse {
	data: {
		id: string;
		type: string;
		attributes: SPCDataInterface;
	}[];
}

export interface RobotPurchaseAxiosGetInterface {
	data: {
		id: string;
		type: string;
		attributes: SPCDataInterface;
	};
}

export interface RobotCommandLogsAxiosGetInterface extends JsonApiResponse {
	data: {
		id: string;
		type: string;
		attributes: CLCDataInterface;
	}[];
}

export interface RobotElevatorCallsAxiosGetInterface extends JsonApiResponse {
	data: {
		id: string;
		type: string;
		attributes: ECCDataInterface;
	}[];
}
