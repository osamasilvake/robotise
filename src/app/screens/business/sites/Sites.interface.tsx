import {
	SCNContentDataInterface,
	SEVContentDataInterface,
	SHPContentDataInterface,
	SOOContentDataInterface
} from '../../../slices/business/sites/configuration/cloud/SiteCloudConfiguration.slice.interface';
import { MRContentDataInterface } from '../../../slices/business/sites/configuration/marketing-rides/MarketingRides.slice.interface';
import {
	SNContentNotificationTypeInterface,
	SNContentNotificationUsersInterface
} from '../../../slices/business/sites/configuration/notifications/Notifications.slice.interface';
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
import { SRContentDataInterface } from '../../../slices/business/sites/rooms/Rooms.slice.interface';
import { ISite } from '../../../slices/business/sites/Sites.slice.interface';
import { SLCDataInterface } from '../../../slices/business/sites/sms-list/SMSList.slice.interface';
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

export interface SiteRoomsAxiosGetInterface extends JsonAPIResponseInterface {
	data: {
		id: string;
		type: string;
		attributes: SRContentDataInterface;
	}[];
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

export interface SiteSMSListAxiosGetInterface extends JsonAPIResponseInterface {
	data: {
		id: string;
		type: string;
		attributes: SLCDataInterface;
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

export interface SiteMarketingRidesAxiosGetInterface extends JsonAPIResponseInterface {
	data: {
		id: string;
		type: string;
		attributes: MRContentDataInterface;
	}[];
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

export interface SiteHelpPagesAxiosGetInterface extends JsonAPIResponseInterface {
	data: {
		id: string;
		type: string;
		attributes: SHPContentDataInterface;
	}[];
}

export interface SiteElevatorVendorsAxiosGetInterface extends JsonAPIResponseInterface {
	data: {
		id: string;
		type: string;
		attributes: SEVContentDataInterface;
	}[];
}
