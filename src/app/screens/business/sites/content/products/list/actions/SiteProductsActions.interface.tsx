import { Dispatch, SetStateAction } from 'react';

export interface SiteProductsActionsInterface {
	topSpace?: boolean;
}

export interface DialogCreateProductInterface {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}
