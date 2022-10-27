import {
	SNContentNotificationTypeInterface,
	SNContentNotificationUsersInterface
} from '../../../slices/business/sites/configuration/Notifications.slice.interface';
import { SSCDataInterface } from '../../../slices/business/sites/configuration/ServicePositions.slice.interface';
import {
	SPContentInventoryInterface,
	SPContentOrdersInterface,
	SPContentPurchasesInterface,
	SPContentTopProductsInterface
} from '../../../slices/business/sites/performance/Performance.slice.interface';
import { PCCDataInterface as PCCDataAliasInterface } from '../../../slices/business/sites/phone-calls/PhoneCalls.slice.interface';
import {
	PCCDataInterface,
	PCPhoneNumbersInterface
} from '../../../slices/business/sites/phone-configs/PhoneConfigs.slice.interface';
import { SPCDataInterface } from '../../../slices/business/sites/products/Products.slice.interface';
import { SQRDataInterface } from '../../../slices/business/sites/rooms/qrCode/QRCodes.slice.interface';
import {
	SCNContentDataInterface,
	SEVContentDataInterface,
	SOOContentDataInterface
} from '../../../slices/business/sites/SiteOperations.slice.interface';
import { ISite } from '../../../slices/business/sites/Sites.slice.interface';
import {
	SWCDataInterface,
	SWCMapsDataInterface
} from '../../../slices/business/sites/statistics/WifiHeatmap.slice.interface';
import { JsonAPIResponseInterface } from '../../../slices/JsonAPI.interface';

export interface SitesAxiosGetInterface extends JsonAPIResponseInterface {
	data: {
		id: string;
		type: string;
		attributes: ISite;
	}[];
}

export interface SiteCreateAxiosPostRequestInterface {
	data: {
		type: string;
		attributes: {
			title: string;
			timezone: string;
			currency: string;
			rooms: { whitelist: null };
			acceptOrders: boolean;
		};
		relationships: object;
	};
}

export interface SiteCreateAxiosPostResponseInterface {
	data: {
		id: string;
		type: string;
		attributes: ISite;
	};
}

export interface SiteProductsAxiosGetInterface extends JsonAPIResponseInterface {
	data: {
		id: string;
		type: string;
		attributes: SPCDataInterface;
	}[];
}

export interface SiteRoomsAxiosPatchRequestInterface {
	data: {
		type: string;
		id: string;
		attributes: {
			rooms: {
				whitelist: string[];
				available?: string[];
			};
		};
	};
}

export interface SiteRoomsAxiosPatchResponseInterface {
	data: {
		id: string;
		type: string;
		attributes: ISite;
	};
}

export interface SiteQRCodesAxiosGetInterface extends JsonAPIResponseInterface {
	data: {
		id: string;
		type: string;
		attributes: SPCDataInterface;
	}[];
}

export interface SiteQRCodeCreateAxiosPostRequestInterface {
	data: {
		type: string;
		attributes: {
			room: string;
			expirationDate: string;
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

export interface SiteQRCodeCreateAxiosPostResponseInterface {
	data: {
		id: string;
		type: string;
		attributes: SQRDataInterface;
	};
}

export interface SitePhoneConfigsAxiosGetInterface extends JsonAPIResponseInterface {
	data: {
		id: string;
		type: string;
		attributes: PCCDataInterface;
	}[];
}

export interface SitePhoneConfigPhoneNumbersAxiosGetInterface extends JsonAPIResponseInterface {
	data: {
		id: string;
		type: string;
		attributes: PCPhoneNumbersInterface;
	}[];
}

export interface SitePhoneCallsAxiosGetInterface extends JsonAPIResponseInterface {
	data: {
		id: string;
		type: string;
		attributes: PCCDataAliasInterface;
	}[];
}

export interface SiteWifiHeatmapAxiosGetInterface {
	data: {
		id: string;
		type: string;
		attributes: SWCDataInterface;
	}[];
}

export interface SiteMapsAxiosGetInterface {
	data: {
		id: string;
		type: string;
		attributes: SWCMapsDataInterface;
	}[];
}

export interface SitePerformancePurchasesAxiosGetInterface {
	data: {
		type: string;
		attributes: SPContentPurchasesInterface;
	};
}

export interface SitePerformanceOrdersAxiosGetInterface {
	data: {
		type: string;
		attributes: SPContentOrdersInterface;
	};
}

export interface SitePerformanceInventoryAxiosGetInterface {
	data: {
		type: string;
		attributes: SPContentInventoryInterface;
	};
}

export interface SitePerformanceTopProductsAxiosGetInterface {
	data: {
		type: string;
		attributes: SPContentTopProductsInterface;
	};
}

export interface SiteNotificationTypesAxiosGetInterface {
	data: {
		id: string;
		type: string;
		attributes: SNContentNotificationTypeInterface;
	}[];
}

export interface SiteNotificationUsersAxiosGetInterface {
	data: {
		id: string;
		type: string;
		attributes: SNContentNotificationUsersInterface;
	}[];
}

export interface SiteServicePositionsAxiosGetInterface extends JsonAPIResponseInterface {
	data: {
		id: string;
		type: string;
		attributes: SSCDataInterface;
	}[];
}

export interface SiteOrderOriginsAxiosGetInterface extends JsonAPIResponseInterface {
	data: {
		id: string;
		type: string;
		attributes: SOOContentDataInterface;
	}[];
}

export interface SiteCustomerNotificationTypesAxiosGetInterface extends JsonAPIResponseInterface {
	data: {
		id: string;
		type: string;
		attributes: SCNContentDataInterface;
	}[];
}

export interface SiteElevatorVendorsAxiosGetInterface extends JsonAPIResponseInterface {
	data: {
		id: string;
		type: string;
		attributes: SEVContentDataInterface;
	}[];
}
