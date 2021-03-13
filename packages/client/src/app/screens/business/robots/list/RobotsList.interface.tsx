import { RobotsSliceResponseAllInterface } from '../../../../slices/robots/Robots.slice.interface';

export interface RobotsListTableInterface {
	content: RobotsSliceResponseAllInterface[] | null;
}

export interface RobotsListTableHeadInterface {
	columns: RobotsListTableColumnInterface[];
}

export interface RobotsListTableColumnInterface {
	id: 'name' | 'siteTitle' | 'isReady' | 'updatedAt' | 'alerts';
	label: string;
	minWidth?: number;
	align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
	format?: (value: any) => string;
}
