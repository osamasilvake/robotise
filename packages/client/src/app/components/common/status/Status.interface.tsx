import { ReactElement } from 'react';

export interface StatusInterface {
	children: ReactElement;
	active: boolean;
	small?: boolean;
}
