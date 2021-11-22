import { DrawerListBadgeTypeEnum } from './Drawer.enum';

export interface DrawerListInterface {
	id: number;
	icon: string;
	label: string;
	path: string;
	hint?: string;
	badge?: DrawerListBadgeTypeEnum;
	scope?: boolean;
}
