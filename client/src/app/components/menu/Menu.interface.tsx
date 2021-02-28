import { ReactEventHandler } from 'react';

export interface MenuInterface {
	anchorEl: HTMLElement;
	close: ReactEventHandler;
	menuId?: string;
	menuClass?: string;
}
