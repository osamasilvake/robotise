import { SPCDataInterface, SPContentInterface } from './Purchases.slice.interface';

/**
 * update edited comment
 * @param state
 * @param purchase
 * @returns
 */
export const updateEditedComment = (
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
