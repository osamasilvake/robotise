import { DrawerListBadgeTypeEnum } from './Drawer.enum';

export interface DrawerListInterface {
	id: number;
	icon: string;
	label: string;
	hint?: string;
	path: string;
	newLine?: boolean;
	badge?: DrawerListBadgeTypeEnum;
}
