import { AppConfigService } from '../../../services';

/**
 * robot location image
 * @param mapId
 * @param date
 * @returns
 */
export const robotLocationImageUrl = (mapId: string, date?: Date) => {
	const url = `${AppConfigService.envBaseURL}/${AppConfigService.envApiVersion}`;
	const datePart = date ? `?t=${date}` : '';
	return `${url}/storage/maps/${mapId}.jpg${datePart}`;
};

/**
 * robot camera image
 * @param imageId
 * @returns
 */
export const robotCameraImageUrl = (imageId: string | undefined) => {
	const url = `${AppConfigService.envBaseURL}/${AppConfigService.envApiVersion}`;
	return `${url}/storage/camera-images/${imageId}.jpg`;
};
