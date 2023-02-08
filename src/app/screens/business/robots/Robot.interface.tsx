import { ReactNode } from 'react';

export interface RobotCommonInterface {
	children: ReactNode;
}

export interface RobotParamsInterface {
	robotId: string;
	orderId: string;
	purchaseId: string;
}
