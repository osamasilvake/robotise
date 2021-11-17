import moment from 'moment';

/**
 * use for sorting
 * @param date
 * @returns
 */
const momentSort = <T,>(date: T): moment.Moment => moment(date);

/**
 * format 1
 * @param date
 * @returns
 */
const momentFormat1 = <T,>(date: T): string => {
	return moment(date).format('DD MMM YYYY HH:mm:ss');
};

/**
 * format 2
 * @param date
 * @returns
 */
const momentFormat2 = <T,>(date: T): string => {
	return moment(date).format('DD MMMM, HH:mm:ss');
};

/**
 * format 3
 * @param date
 * @returns
 */
const momentFormat3 = <T,>(date: T): string => {
	return moment(date).format('HH:mm:ss');
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
 * days prior to today
 * @param days
 * @returns
 */
const momentDaysPriorToToday = (days: number): string => {
	return moment().subtract(days, 'days').format('YYYY-MM-DD');
};

/**
 * mins prior to date
 * @param date
 * @param mins
 * @returns
 */
const momentMinsPriorToDate = <T,>(date: T, mins: number): Date => {
	return moment(date).subtract(mins, 'minutes').toDate();
};

/**
 * from and to dates difference
 * @param date1
 * @param date2
 * @returns
 */
const momentFromToDiff = <T,>(date1: T, date2: T): boolean => {
	return moment(date1).diff(moment(date2)) >= 1;
};

export {
	momentCurrentYear,
	momentDaysPriorToToday,
	momentFormat1,
	momentFormat2,
	momentFormat3,
	momentFromToDiff,
	momentISOString,
	momentMinsPriorToDate,
	momentNow,
	momentSort,
	momentToday
};
