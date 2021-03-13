import moment from 'moment';

/**
 * format 1
 * @param value
 */
const momentFormat1 = (value: string) => {
	return moment(value).format('DD, MMM HH:mm:ss');
};

/**
 * get Date.now()
 */
const momentNow = () => {
	return moment().valueOf();
};

/**
 * get current year
 */
const momentCurrentYear = () => {
	return moment().year();
};

/**
 * get ISO string
 */
const momentISOString = () => {
	return moment().year();
};

export { momentCurrentYear, momentFormat1, momentISOString, momentNow };
