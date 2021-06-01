import { useEffect, useState } from 'react';

import { WindowInterface } from './UseWindow.interface';

/**
 * detect change in window
 * @returns
 */
export const useWindow = (): WindowInterface => {
	/**
	 * get window
	 * @returns
	 */
	const getWindow = () => {
		return {
			innerWidth: window.innerWidth
		};
	};

	const [value, setValue] = useState<WindowInterface>(getWindow());

	useEffect(() => {
		const handleResize = () => {
			setValue(getWindow());
		};
		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return value;
};
