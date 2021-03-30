import { AppConfigService } from '../../../services';

/**
 * robot camera image
 * @param id
 * @returns
 */
export const robotCameraImageUrl = (id: string) => {
	const url = `${AppConfigService.envBaseURL}/${AppConfigService.envApiVersion}`;
	return `${url}/storage/camera-images/${id}.jpg`;
};
