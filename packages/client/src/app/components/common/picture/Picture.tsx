import { Box } from '@material-ui/core';
import clsx from 'clsx';
import { ChangeEvent, FC, useEffect, useState } from 'react';

import { AppConfigService } from '../../../services';
import { PictureInterface } from './Picture.interface';
import { PictureStyles } from './Picture.style';

const Picture: FC<PictureInterface> = (props) => {
	const { src, alt, fallback, onLoad } = props;
	const pictureClasses = PictureStyles();

	const [image, setImage] = useState(src);

	useEffect(() => {
		// set image
		setImage(src);
	}, [src]);

	/**
	 * on image load
	 * @param event
	 */
	const onImageLoad = (event: ChangeEvent<HTMLImageElement>) => {
		const target = event.target;
		if (target && onLoad) {
			onLoad({
				naturalWidth: target.naturalWidth,
				naturalHeight: target.naturalHeight,
				clientWidth: target.clientWidth,
				clientHeight: target.clientHeight
			});
		}
	};

	return (
		<Box
			className={clsx(pictureClasses.sPicture, {
				[pictureClasses.sPictureBox]: image === AppConfigService.AppImageURLs.logo.iconOff
			})}>
			<img
				src={image}
				alt={alt}
				onLoad={onImageLoad}
				onError={() => setImage(fallback || AppConfigService.AppImageURLs.logo.iconOff)}
				className={clsx(pictureClasses.sPicture, {
					[pictureClasses.sFallback]: image === AppConfigService.AppImageURLs.logo.iconOff
				})}
			/>
		</Box>
	);
};
export default Picture;
