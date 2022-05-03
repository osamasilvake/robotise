import { useEffect, useState } from 'react';

/**
 * debounce
 * @param value
 * @param delay
 * @returns
 */
const useDebounce = <T,>(value: T, delay?: number): T => {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const timer = setTimeout(() => setDebouncedValue(value), delay || 500);
		return () => {
			clearTimeout(timer);
		};
	}, [value, delay]);

	return debouncedValue;
};

export { useDebounce };
