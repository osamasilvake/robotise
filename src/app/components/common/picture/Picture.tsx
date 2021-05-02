import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { AppConfigService } from '../../../services';
import { generalSelector } from '../../../slices/general/General.slice';
import { SliceGeneralInterface } from '../../../slices/general/General.slice.interface';
import { useDebounce } from '../../../utilities/hooks/debounce/UseDebounce';
import { useWindow } from '../../../utilities/hooks/window/UseWindow';
import { WindowInterface } from '../../../utilities/hooks/window/UseWindow.interface';
import { PictureInterface, PictureOnLoadInterface } from './Picture.interface';
import { PictureStyles } from './Picture.style';

const Picture: FC<PictureInterface> = (props) => {
	const { src, alt, fallback, onLoad } = props;
	const classes = PictureStyles();

	const general = useSelector(generalSelector);

	const [values, setValues] = useState<PictureOnLoadInterface | null>(null);
	const [image, setImage] = useState(src);
	const cWindow = useWindow();
	const debouncedWindow = useDebounce<WindowInterface | undefined>(cWindow, 500);
	const debouncedGeneral = useDebounce<SliceGeneralInterface>(general, 500);

	const imgRef = useRef<HTMLImageElement>(null);

	useEffect(() => {
		setImage(src);
	}, [src]);

	useEffect(() => {
		values && onLoad && onLoad(values);
	}, [onLoad, values]);

	useEffect(() => {
		const target = imgRef.current;
		if (target && target.naturalWidth && target.clientWidth !== values?.clientWidth) {
			prepareValues(target);
		}
	}, [debouncedWindow, debouncedGeneral, values]);

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
		setValues({
			naturalWidth: target.naturalWidth,
			naturalHeight: target.naturalHeight,
			clientWidth: target.clientWidth,
			clientHeight: target.clientHeight
		});
	};

	/**
	 * handle on error
	 * @returns
	 */
	const handleError = (fallback: string) => () => {
		setImage(fallback || AppConfigService.AppImageURLs.logo.iconOff);
	};

	return (
		<img
			ref={imgRef}
			src={image}
			alt={alt}
			onLoad={onImageLoad}
			onError={handleError(fallback || AppConfigService.AppImageURLs.logo.iconOff)}
			className={classes.sImage}
		/>
	);
};
export default Picture;
