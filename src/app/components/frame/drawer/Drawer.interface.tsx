import { DrawerListBadgeTypeEnum } from './Drawer.enum';

export interface DrawerListInterface {
	icon: string;
	label: string;
	path: string;
	hint?: string;
	badge?: DrawerListBadgeTypeEnum;
	scope?: boolean;
}
