import { ReactNode } from 'react';

export interface ErrorBoundaryStateInterface {
	hasError: boolean;
	error: Error | null;
}

export interface ErrorBoundaryPropsInterface {
	children: ReactNode;
}
