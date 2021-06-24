import clsx from 'clsx';
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { AppConfigService } from '../../../services';
import { generalSelector } from '../../../slices/general/General.slice';
import { useWindow } from '../../../utilities/hooks/window/UseWindow';
import { PictureInterface, PictureOnLoadInterface } from './Picture.interface';
import { PictureStyle } from './Picture.style';

const Picture: FC<PictureInterface> = (props) => {
	const { src, alt, onLoad, fullWidth } = props;
	const classes = PictureStyle();

	const general = useSelector(generalSelector);

	const [values, setValues] = useState<PictureOnLoadInterface | null>(null);
	const [image, setImage] = useState(src);
	const [fallback, setFallback] = useState(false);

	const cWindow = useWindow();
	const imgRef = useRef<HTMLImageElement>(null);

	useEffect(() => {
		setImage(src);
	}, [src]);

	useEffect(() => {
		values && onLoad && onLoad(values);
	}, [onLoad, values]);

	useEffect(() => {
		setTimeout(() => {
			const target = imgRef.current;
			if (target && target.naturalWidth && target.clientWidth !== values?.clientWidth) {
				prepareValues(target);
			}
		}, 500);
	}, [values, cWindow, general.openDrawer]);

	/**
	 * on image load
	 * @param event
	 */
	const onImageLoad = (event: ChangeEvent<HTMLImageElement>) => {
		const target = event.target;
		if (target && target.naturalWidth) {
			prepareValues(target);
		}
	};

	/**
	 * prepare values
	 * @param target
	 */
	const prepareValues = (target: PictureOnLoadInterface) => {
		// set values
		setValues({
			naturalWidth: target.naturalWidth,
			naturalHeight: target.naturalHeight,
			clientWidth: target.clientWidth,
			clientHeight: target.clientHeight
		});

		// set fallback
		setFallback(target.naturalWidth === 50 && target.naturalHeight === 50);
	};

	return (
		<img
			ref={imgRef}
			src={image}
			alt={alt}
			onLoad={onImageLoad}
			onError={() => setImage(AppConfigService.AppImageURLs.logo.iconOff)}
			className={clsx(classes.sImage, {
				[classes.sImageFallback]: fallback,
				[classes.sImageFullWidth]: !fallback && fullWidth
			})}
		/>
	);
};
export default Picture;
