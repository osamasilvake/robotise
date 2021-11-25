import { SPCDataInterface } from '../../sites/products/Products.slice.interface';
import {
	SICDrawerInterface,
	SICDrawerLaneInterface,
	SIContentInterface
} from './Inventory.slice.interface';

/**
 * map products to inventory
 * @param inventory
 * @param products
 * @returns
 */
export const mapProductsToInventory = (
	inventory: SIContentInterface,
	products: SPCDataInterface[]
) => ({
	...inventory,
	drawers: [
		...inventory.drawers.map((drawer: SICDrawerInterface) => ({
			...drawer,
			lanes: drawer.lanes.map((lane: SICDrawerLaneInterface) => {
				const product = products.find((p: SPCDataInterface) => p.id === lane.productId);
				return {
					...lane,
					product: product || null
				};
			})
		}))
	]
});
