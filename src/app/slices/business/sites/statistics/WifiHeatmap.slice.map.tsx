import { AppConfigService } from '../../../../services';
import { SWCMapsInterface } from './WifiHeatmap.slice.interface';

/**
 * sort map content
 * @param maps
 * @returns
 */
export const sortMapsContent = (maps: SWCMapsInterface) =>
	maps.data.concat().sort((a, b) => {
		const integer = AppConfigService.AppOptions.regex.integer;
		return a && integer.test(a.floorName) && integer.test(b.floorName)
			? +a.floorName - +b.floorName
			: a.floorName.localeCompare(b.floorName);
	});
