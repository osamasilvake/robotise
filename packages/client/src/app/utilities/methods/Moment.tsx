import moment from 'moment';

/**
 * use for sorting
 * @param value
 */
const momentSort = <T,>(value: T) => {
	return moment(value);
};

/**
 * format 1
 * @param value
 */
const momentFormat1 = <T,>(value: T) => {
	return moment(value).format('DD, MMM YYYY HH:mm:ss');
};

/**
 * Date.now()
 */
const momentNow = () => {
	return moment().valueOf();
};

/**
 * current year
 */
const momentCurrentYear = () => {
	return moment().year();
};

/**
 * ISO string
 */
const momentISOString = () => {
	return moment().year();
};

export { momentCurrentYear, momentFormat1, momentISOString, momentNow, momentSort };
