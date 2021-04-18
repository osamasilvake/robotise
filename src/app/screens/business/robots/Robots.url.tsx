import { AppConfigService } from '../../../services';

/**
 * robot location image
 * @param mapId
 * @returns
 */
export const robotLocationImageUrl = (mapId: string) => {
	const url = `${AppConfigService.envBaseURL}/${AppConfigService.envApiVersion}`;
	return `${url}/storage/maps/${mapId}.jpg`;
};

/**
 * robot camera image
 * @param imageId
 * @returns
 */
export const robotCameraImageUrl = (imageId: string) => {
	const url = `${AppConfigService.envBaseURL}/${AppConfigService.envApiVersion}`;
	return `${url}/storage/camera-images/${imageId}.jpg`;
};
