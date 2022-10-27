import { TFunction } from 'i18next';
import { ReactNode } from 'react';

import { ErrorTypeEnum } from '../../common/error/Error.enum';

export interface ErrorBoundaryStateInterface {
	hasError: boolean;
	error: Error | null;
}

export interface ErrorBoundaryPropsInterface {
	children: ReactNode;
	classes: ErrorBoundaryPropsClassesInterface;
	t: TFunction;
	error?: ErrorTypeEnum;
}

export interface ErrorBoundaryPropsClassesInterface {
	sTitle: string;
	sDescription: string;
}
