import { InventoryDrawersTypeEnum } from './Inventory.slice.enum';
import { SIContentInterface } from './Inventory.slice.interface';

/**
 * filter drawers
 * @param content
 * @returns
 */
export const filterDrawers = (content: SIContentInterface) => ({
	...content,
	drawers: content.drawers.filter((d) => d.type !== InventoryDrawersTypeEnum.DELIVERY)
});
