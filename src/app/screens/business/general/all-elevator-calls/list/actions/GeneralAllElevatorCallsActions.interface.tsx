export interface GeneralAllElevatorCallsActionsInterface {
	siteId?: string;
	callType?: string;
	vendor?: string;
	includeAllCalls: boolean;
}

export interface GeneralAllElevatorCallsSiteInterface {
	siteId?: string;
}

export interface GeneralAllElevatorCallsCallTypeInterface {
	callType?: string;
}

export interface GeneralAllElevatorCallsVendorInterface {
	vendor?: string;
}

export interface GeneralAllElevatorCallsIncludeAllCallsInterface {
	includeAllCalls: boolean;
}

export interface GeneralAllElevatorCallsAutocompleteInterface {
	id: string;
	label: string;
}
