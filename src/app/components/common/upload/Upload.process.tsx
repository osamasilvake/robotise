import { ChangeEvent } from 'react';

import { AppConfigService } from '../../../services';

/**
 * fetch image from input
 * @param event
 * @returns
 */
export const fetchImageFromInput = (event: ChangeEvent<HTMLInputElement>) =>
	new Promise((resolve) => {
		const maxSize = AppConfigService.AppOptions.components.uploadImage.maxSize;
		const maxHeight = AppConfigService.AppOptions.components.uploadImage.maxHeight;
		const maxWidth = AppConfigService.AppOptions.components.uploadImage.maxWidth;
		const files = event.target.files;
		const file = files && files[0];
		if (!file) return;

		// reader
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			if (typeof reader.result !== 'string') return;

			const image: HTMLImageElement = new Image();
			image.src = reader.result;
			image.onload = () => {
				// image
				const width = image.width;
				const height = image.height;

				// image aspect ratio fit
				const fit = calculateAspectRatioFit(width, height, maxWidth, maxHeight);
				const isFit = width > maxWidth || height > maxHeight;

				// canvas
				const canvas = document.createElement('canvas');
				canvas.width = isFit ? fit.width : image.width;
				canvas.height = isFit ? fit.height : image.height;

				// draw image
				const context = canvas.getContext('2d') as CanvasRenderingContext2D;
				context.drawImage(image, 0, 0, width, height, 0, 0, canvas.width, canvas.height);

				// size
				const size = Math.round((canvas.toDataURL().length * 6) / 8);
				const fileSize = size / 1000;
				if (fileSize > maxSize) {
					resolve({
						validate: false,
						type: 1,
						value: fileSize
					});
				}

				resolve({ validate: true, value: canvas.toDataURL() });
			};
		};
	});

/**
 * conserve aspect ratio of the original region. Useful when shrinking/enlarging
 * images to fit into a certain area.
 * @param srcWidth width of source image
 * @param srcHeight height of source image
 * @param maxWidth maximum available width
 * @param maxHeight maximum available height
 * @returns
 */
const calculateAspectRatioFit = (
	srcWidth: number,
	srcHeight: number,
	maxWidth: number,
	maxHeight: number
) => {
	const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
	return { width: srcWidth * ratio, height: srcHeight * ratio };
};
