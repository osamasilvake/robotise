import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../components/content/page-empty/PageEmpty';
import PageError from '../../../../components/content/page-error/PageError';
import { AppConfigService } from '../../../../services';
import { SitesFetchList, sitesSelector } from '../../../../slices/sites/Sites.slice';
import SitesTable from './table/SitesTable';

const SitesList: FC = () => {
	const dispatch = useDispatch();
	const sites = useSelector(sitesSelector);

	useEffect(() => {
		if (sites.content === null) {
			// dispatch: fetch sites
			dispatch(SitesFetchList());
		}
	}, [dispatch, sites.content]);

	useEffect(() => {
		const executeServices = () => {
			// dispatch: fetch sites
			dispatch(SitesFetchList(true));
		};

		// start now
		const setIntervalAndExecute = (fn: () => void, timeout: number) => {
			fn();
			return window.setInterval(fn, timeout);
		};

		// interval
		const intervalId = setIntervalAndExecute(
			executeServices,
			AppConfigService.AppOptions.screens.sites.list.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [dispatch]);

	// loader
	if (sites.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (sites.errors) {
		return <PageError message={sites.errors.text} />;
	}

	// null
	if (!sites.content) {
		return null;
	}

	// empty
	if (!sites.content.data.length) {
		return <PageEmpty message="EMPTY.MESSAGE"></PageEmpty>;
	}

	return <SitesTable content={sites.content} />;
};
export default SitesList;
