import { ReactNode } from 'react';
import { TFunction } from 'react-i18next';

export interface ErrorBoundaryStateInterface {
	hasError: boolean;
	error: Error | null;
}

export interface ErrorBoundaryPropsInterface {
	children: ReactNode;
	classes: ErrorBoundaryPropsClassesInterface;
	t: TFunction;
}

export interface ErrorBoundaryPropsClassesInterface {
	sTitle: string;
	sDescription: string;
	sLink: string;
}
