import { useEffect, useState } from 'react';

/**
 * custom hook: useDebounce
 * limit the component to re-render too many times
 * @param value
 * @param delay
 * @returns
 */
export const useDebounce = <T,>(value: T, delay?: number): T => {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const timer = setTimeout(() => setDebouncedValue(value), delay || 500);
		return () => clearTimeout(timer);
	}, [value, delay]);

	return debouncedValue;
};
