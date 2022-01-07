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
		return a && integer.test(a.floor) && integer.test(b.floor)
			? +a.floor - +b.floor
			: a.floor.localeCompare(b.floor);
	});
