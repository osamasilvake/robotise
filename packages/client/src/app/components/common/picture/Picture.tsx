import { Box } from '@material-ui/core';
import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';

import { AppConfigService } from '../../../services';
import { PictureInterface } from './Picture.interface';
import { PictureStyles } from './Picture.style';

const Picture: FC<PictureInterface> = (props) => {
	const { src, alt, fallback } = props;
	const pictureClasses = PictureStyles();

	const [image, setImage] = useState(src);

	useEffect(() => {
		// set image
		setImage(src);
	}, [src]);

	return (
		<Box
			className={clsx(pictureClasses.sPicture, {
				[pictureClasses.sPictureBox]: image === AppConfigService.AppImageURLs.logo.icon
			})}>
			<img
				src={image}
				alt={alt}
				onError={() => setImage(fallback || AppConfigService.AppImageURLs.logo.icon)}
				className={clsx(pictureClasses.sPicture, {
					[pictureClasses.sFallback]: image === AppConfigService.AppImageURLs.logo.icon
				})}
			/>
		</Box>
	);
};
export default Picture;
