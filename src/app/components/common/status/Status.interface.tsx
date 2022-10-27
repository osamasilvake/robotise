import { StatusTypeEnum } from './Status.enum';

export interface StatusInterface {
	children: string | number;
	small?: boolean;
	active?: boolean;
	capitalize?: boolean;
	level?: StatusTypeEnum;
}
