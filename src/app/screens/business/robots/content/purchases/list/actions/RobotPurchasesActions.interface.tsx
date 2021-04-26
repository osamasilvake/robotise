import { Dispatch, SetStateAction } from 'react';

export interface RobotPurchasesActionsInterface {
	billed: boolean;
	setBilled: Dispatch<SetStateAction<boolean>>;
	setPage: Dispatch<SetStateAction<number>>;
}

export interface RobotPurchasesBilledInterface {
	billed: boolean;
	setBilled: Dispatch<SetStateAction<boolean>>;
	setPage: Dispatch<SetStateAction<number>>;
}
