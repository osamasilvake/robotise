export interface SliceRobotOperationsInterface {
	note: {
		loading: boolean;
	};
	map: {
		loading: boolean;
		content: SROContentMapInterface | null;
	};
	control: {
		loading: boolean;
	};
	remoteSafetyReset: {
		loading: boolean;
	};
	camera: {
		loading: boolean;
	};
	elevatorTemplate: {
		loading: boolean;
		content: SROContentElevatorTemplateInterface | null;
	};
	emergencyState: {
		loading: boolean;
	};
	syncProducts: {
		loading: boolean;
	};
	robotConfig: {
		loading: boolean;
	};
	robotSiteConfig: {
		loading: boolean;
	};
}

export interface SROContentMapInterface {
	floor: string;
	imagePath: string;
	name: string;
	origin: number[];
	resolution: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface SROContentElevatorTemplateInterface {
	data: {
		type: string;
		attributes: {
			template: string;
		};
	};
}
