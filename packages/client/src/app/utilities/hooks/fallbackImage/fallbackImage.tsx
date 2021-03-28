import log from 'loglevel';
import { SyntheticEvent, useState } from 'react';

/**
 * returns an object that can be spread onto an img tag
 * @param img
 * @param fallback
 * @returns
 */
export const useFallbackImg = (img: string, fallback: string) => {
	const [src, setImg] = useState(img);

	/**
	 * execute error callback on image fail
	 * @param event
	 */
	const onError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
		// log info on console
		log.info(img, event);

		// react bails out of hook renders if the state
		// is the same as the previous state, otherwise
		// fallback erroring out would cause an infinite loop
		setImg(fallback);
	};

	return { src, onError };
};
