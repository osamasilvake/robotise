import { ReactEventHandler } from 'react';

export interface ModalInterface {
	show: boolean;
	close: ReactEventHandler;
	modalClass?: string;
}
