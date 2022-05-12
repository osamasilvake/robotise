import { SRPContentInterface } from '../../../slices/setup/robot-password/RobotPassword.interface';

export interface SetupRobotPasswordAxiosGetInterface {
	data: {
		type: string;
		attributes: SRPContentInterface;
	};
}

export interface SetupRobotPasswordAxiosPostResponseInterface {
	data: {
		id: string;
		type: string;
		attributes: SRPContentInterface;
	};
}
