import { ReactNode } from 'react';

export interface State {
	hasError: boolean;
	error: Error | null;
}

export interface Props {
	children: ReactNode;
}
