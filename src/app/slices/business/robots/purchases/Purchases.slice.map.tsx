import { SPCDataInterface, SPContentInterface } from './Purchases.slice.interface';

/**
 * map edited comment
 * @param state
 * @param purchase
 * @returns
 */
export const mapEditedComment = (
	state: SPContentInterface,
	purchase: SPCDataInterface
): SPContentInterface => ({
	...state,
	data: state.data.map((item) => {
		if (item.id === purchase.id) {
			return purchase;
		}
		return item;
	})
});
