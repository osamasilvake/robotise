import dayjs from 'dayjs';
import { DurationUnitType } from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekOfYear);
dayjs.extend(utc);

/**
 * day JS
 * @param date
 * @returns
 */
const dateDayJs = (date?: Date | string) => {
	return date ? dayjs(date) : dayjs();
};

/**
 * format 1
 * @param date
 * @returns
 */
const dateFormat1 = (date: Date | string): string => {
	return dayjs(date).format('DD MMM YYYY HH:mm:ss');
};

/**
 * format 2
 * @param date
 * @returns
 */
const dateFormat2 = (date: Date): string => {
	return dayjs(date).format('DD MMMM, HH:mm:ss');
};

/**
 * format 3
 * @param date
 * @returns
 */
const dateFormat3 = (date: Date): string => {
	return dayjs(date).format('HH:mm:ss');
};

/**
 * format 4
 * @param date
 * @returns
 */
const dateFormat4 = (date: Date): string => {
	return dayjs(date).format('YYYY-MM-DD');
};

/**
 * format 5
 * @param date
 * @returns
 */
const dateFormat5 = (date: Date): string => {
	return dayjs(date).format('YYYY-MM-DD hh:mm:ss A');
};

/**
 * format 6
 * @param date
 * @returns
 */
const dateFormat6 = (date: Date): string => {
	return dayjs(date).format('DD MMM YYYY');
};

/**
 * format 7
 * @param date
 * @returns
 */
const dateFormat7 = (date: Date): string => {
	return dayjs(date).format('YYYY-MM');
};

/**
 * format 8
 * @param date
 * @returns
 */
const dateFormat8 = (date: Date): string => {
	return dayjs(date).format('DD MMM');
};

/**
 * Date.now()
 * @returns
 */
const dateNow = (): number => {
	return dayjs().valueOf();
};

/**
 * today
 * @returns
 */
const dateToday = (): string => {
	return dayjs().format('YYYY-MM-DD');
};

/**
 * days prior to today
 * @param days
 * @returns
 */
const dateDaysPriorToToday = (days: number): string => {
	return dayjs().subtract(days, 'days').format('YYYY-MM-DD');
};

/**
 * mins prior to date
 * @param date
 * @param mins
 * @returns
 */
const dateMinsPriorToDate = (date: Date, mins: number): Date => {
	return dayjs(date).subtract(mins, 'minutes').toDate();
};

/**
 * current year
 * @returns
 */
const dateCurrentYear = (): number => {
	return dayjs().year();
};

/**
 * ISO string
 * @returns
 */
const dateISOString = (date?: Date): string => {
	return date ? dayjs(date).toISOString() : dayjs().toISOString();
};

/**
 * from and to dates difference
 * @param date1
 * @param date2
 * @returns
 */
const dateFromToDiff = (date1: Date | string, date2: Date | string): boolean => {
	return dayjs(date1).diff(dayjs(date2)) >= 1;
};

/**
 * use for sorting
 * @param date
 * @returns
 */
const dateSort = (date: Date): dayjs.Dayjs => dayjs(date);

/**
 * locale
 * @param language
 * @returns
 */
const dateLocale = (language: string) => {
	return dayjs.locale(language);
};

/**
 * utc
 * @param utc
 * @returns
 */
const dateUTC = (utc: number) => {
	return dayjs.utc(utc);
};

/**
 * add to date
 * @param val
 * @param unit
 * @returns
 */
const dateAdd = (val: number, unit: DurationUnitType) => {
	return dayjs().add(val, unit);
};

/**
 * date is before another date
 * @param date1
 * @param date2
 * @returns
 */
const dateIsBefore = (date1: Date | string, date2: Date | string) => {
	return dayjs(date1).isBefore(dayjs(date2));
};

/**
 * date is same with another date
 * @param date1
 * @param date2
 * @returns
 */
const dateIsSame = (date1: Date | string, date2: Date | string) => {
	return dayjs(date1).isSame(dayjs(date2));
};

/**
 * date is after another date
 * @param date1
 * @param date2
 * @returns
 */
const dateIsAfter = (date1: Date | string, date2: Date | string) => {
	return dayjs(date1).isAfter(dayjs(date2));
};

export {
	dateAdd,
	dateCurrentYear,
	dateDayJs,
	dateDaysPriorToToday,
	dateFormat1,
	dateFormat2,
	dateFormat3,
	dateFormat4,
	dateFormat5,
	dateFormat6,
	dateFormat7,
	dateFormat8,
	dateFromToDiff,
	dateIsAfter,
	dateIsBefore,
	dateISOString,
	dateIsSame,
	dateLocale,
	dateMinsPriorToDate,
	dateNow,
	dateSort,
	dateToday,
	dateUTC
};
