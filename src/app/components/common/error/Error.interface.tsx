import { ReactNode } from 'react';

import { ErrorTypeEnum } from './Error.enum';

export interface ErrorInterface {
	children: ReactNode;
	error: ErrorTypeEnum;
}
