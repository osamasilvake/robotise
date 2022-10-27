import { DefaultTFuncReturn } from 'i18next';

import { StatusTypeEnum } from './Status.enum';

export interface StatusInterface {
	children: DefaultTFuncReturn | string | number;
	small?: boolean;
	active?: boolean;
	capitalize?: boolean;
	level?: StatusTypeEnum;
}
