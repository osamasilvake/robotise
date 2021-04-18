import { useEffect, useState } from 'react';

/**
 * useDebounce
 * check for network connection
 * @returns
 */
export const useNetwork = (): boolean => {
	const [isOnline, setNetwork] = useState(window.navigator.onLine);

	/**
	 * update network
	 */
	const updateNetwork = () => {
		setNetwork(window.navigator.onLine);
	};

	useEffect(() => {
		window.addEventListener('offline', updateNetwork);
		window.addEventListener('online', updateNetwork);
		return () => {
			window.removeEventListener('offline', updateNetwork);
			window.removeEventListener('online', updateNetwork);
		};
	});

	return isOnline;
};
