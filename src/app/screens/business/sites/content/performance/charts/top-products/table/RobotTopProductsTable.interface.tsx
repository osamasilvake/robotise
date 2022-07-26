import { SPContentTopProductsBucketInterface } from '../../../../../../../../slices/business/sites/performance/Performance.slice.interface';
import { RobotTopProductsTableColumnsTypeEnum } from './RobotTopProductsTable.enum';

export interface RobotTopProductsTableInterface {
	topProducts: SPContentTopProductsBucketInterface[];
	currency?: string;
}

export interface RobotTopProductsTableColumnInterface {
	id: RobotTopProductsTableColumnsTypeEnum;
	label: string;
	minWidth?: number;
	width?: number;
	align?: RobotTopProductsTableHeadAlignment;
}

export type RobotTopProductsTableHeadAlignment =
	| 'inherit'
	| 'left'
	| 'center'
	| 'right'
	| 'justify';
