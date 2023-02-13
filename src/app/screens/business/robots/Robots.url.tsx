import { AppConfigService } from '../../../services';

/**
 * robot location image
 * @param imagePath
 * @param date
 * @returns
 */
export const robotLocationImageUrl = (imagePath: string, date?: Date) => {
	const url = AppConfigService.envBaseURL;
	const datePart = date ? `?t=${date}` : '';
	return `${url}/${imagePath}${datePart}`;
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
