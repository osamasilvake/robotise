import moment from 'moment';

/**
 * use for sorting
 * @param value
 * @returns
 */
const momentSort = <T,>(value: T): moment.Moment => moment(value);

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
	return moment(value).format('DD MMMM, HH:mm:ss');
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

/**
 * today
 * @returns
 */
const momentToday = (): string => {
	return moment().format('YYYY-MM-DD');
};

/**
 * 30 days prior to today
 * @returns
 */
const moment30DaysFromToday = (): string => {
	return moment().subtract(30, 'days').format('YYYY-MM-DD');
};

/**
 * From and to dates difference
 * @returns
 */
const momentFromToDiff = (date1: string, date2: string): boolean => {
	return moment(date1).diff(moment(date2)) >= 1;
};

export {
	moment30DaysFromToday,
	momentCurrentYear,
	momentFormat1,
	momentFormat2,
	momentFromToDiff,
	momentISOString,
	momentNow,
	momentSort,
	momentToday
};
