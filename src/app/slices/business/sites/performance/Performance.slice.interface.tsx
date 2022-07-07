import { SPContentInterface } from '../../robots/purchases/Purchases.slice.interface';

export interface SlicePerformanceInterface {
	purchases: {
		loader: boolean;
		loading: boolean;
		content: SPContentInterface | null;
	};
}
