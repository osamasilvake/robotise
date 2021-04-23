import { TFunctionResult } from 'i18next';

import { StatusTypeEnum } from './Status.enum';

export interface StatusInterface {
	children: TFunctionResult | string | number;
	small?: boolean;
	active?: boolean;
	level?: StatusTypeEnum;
}
