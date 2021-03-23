import moment from 'moment';

/**
 * use for sorting
 * @param value
 * @returns
 */
const momentSort = <T,>(value: T): moment.Moment => {
	return moment(value);
};

/**
 * format 1
 * @param value
 * @returns
 */
const momentFormat1 = <T,>(value: T): string => {
	return moment(value).format('DD MMM YYYY HH:mm:ss');
};

/**
 * format 2
 * @param value
 * @returns
 */
const momentFormat2 = <T,>(value: T): string => {
	return moment(value).format('DD MMM HH:mm:ss');
};

/**
 * Date.now()
 * @returns
 */
const momentNow = (): number => {
	return moment().valueOf();
};

/**
 * current year
 * @returns
 */
const momentCurrentYear = (): number => {
	return moment().year();
};

/**
 * ISO string
 * @returns
 */
const momentISOString = (): string => {
	return moment().toISOString();
};

export { momentCurrentYear, momentFormat1, momentFormat2, momentISOString, momentNow, momentSort };
