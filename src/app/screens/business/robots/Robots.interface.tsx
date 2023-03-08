import { CLCDataInterface } from '../../../slices/business/robots/commands-log/CommandsLog.slice.interface';
import { ECCDataInterface } from '../../../slices/business/robots/elevator-calls/ElevatorCalls.slice.interface';
import { SICDrawerInterface } from '../../../slices/business/robots/inventory/Inventory.slice.interface';
import { SOCDataInterface } from '../../../slices/business/robots/orders/Orders.slice.interface';
import { SPCDataInterface } from '../../../slices/business/robots/purchases/Purchases.slice.interface';
import { SROContentMapInterface } from '../../../slices/business/robots/RobotOperations.slice.interface';
import { IRobotTwinInterface } from '../../../slices/business/robots/RobotTwins.slice.interface';
import { IRobotTwinSummaryInterface } from '../../../slices/business/robots/RobotTwinsSummary.slice.interface';
import { JsonAPIResponseInterface } from '../../../slices/JsonAPI.interface';
import { DialogCreateOrderFormInterface } from './content/orders/list/actions/RobotOrdersActions.interface';

export interface RobotTwinSummaryAxiosGetInterface {
	data: {
		id: string;
		type: string;
		attributes: IRobotTwinSummaryInterface;
	}[];
}

export interface RobotCreateAxiosPostRequestInterface {
	data: {
		type: string;
		attributes: {
			name: string;
			customerName: string;
			configs: {
				ceInventoryId: string;
				isOnlineCheckDisabled: boolean;
				isHidden: boolean;
			};
		};
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

export interface RobotCreateAxiosPostResponseInterface {
	data: {
		id: string;
		type: string;
		attributes: IRobotTwinSummaryInterface;
	};
}

export interface RobotTwinsAxiosGetInterface {
	data: {
		id: string;
		type: string;
		attributes: IRobotTwinInterface;
	};
}

export interface RobotMapAxiosGetInterface {
	data: {
		id: string;
		type: string;
		attributes: SROContentMapInterface;
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

export interface RobotOrdersAxiosGetInterface extends JsonAPIResponseInterface {
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
			robot: {
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

export interface RobotPurchasesAxiosGetInterface extends JsonAPIResponseInterface {
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

export interface RobotCommandLogsAxiosGetInterface extends JsonAPIResponseInterface {
	data: {
		id: string;
		type: string;
		attributes: CLCDataInterface;
	}[];
}

export interface RobotElevatorCallsAxiosGetInterface extends JsonAPIResponseInterface {
	data: {
		id: string;
		type: string;
		attributes: ECCDataInterface;
	}[];
}

export interface RobotElevatorCallsTemplateAxiosGetInterface {
	data: {
		type: string;
		attributes: {
			template: string;
		};
	};
}
