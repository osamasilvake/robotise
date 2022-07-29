import { ChangeEvent } from 'react';

import { AppConfigService } from '../../../services';

/**
 * fetch image from input
 * @param event
 * @returns
 */
export const fetchImageFromInput = (event: ChangeEvent<HTMLInputElement>) =>
	new Promise((resolve) => {
		const files = event.target.files;
		const file = files && files[0];
		const maxSize = AppConfigService.AppOptions.components.uploadImage.maxSize;
		const maxHeight = AppConfigService.AppOptions.components.uploadImage.maxHeight;
		const maxWidth = AppConfigService.AppOptions.components.uploadImage.maxWidth;

		if (file) {
			// size
			const fileSize = file.size / 1024 / 1024; // MegaBytes (MB)
			if (fileSize > maxSize / 1000) {
				resolve({
					validate: false,
					type: 1,
					value: maxSize // KiloBytes (KB)
				});
			}

			// reader
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				const image: HTMLImageElement = new Image();
				if (typeof reader.result === 'string') {
					image.src = reader.result;
					image.onload = () => {
						const height = image.height;
						const width = image.width;
						if (!(width <= maxWidth && height <= maxHeight)) {
							resolve({
								validate: false,
								type: 2,
								value: `${maxWidth}x${maxHeight}`
							});
						}
						resolve({
							validate: true,
							value: image.src
						});
					};
				}
			};
		}
	});
