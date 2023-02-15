import { SFCDataInterface } from './Floors.slice.interface';

/**
 * sort floors
 * @param floorData
 * @returns
 */
export const sortFloors = (floorData: SFCDataInterface[]) =>
	floorData.concat().sort((a, b) => a.order - b.order);
