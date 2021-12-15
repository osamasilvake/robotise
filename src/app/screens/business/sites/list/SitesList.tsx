import { Box } from '@mui/material';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../components/content/page-empty/PageEmpty';
import PageError from '../../../../components/content/page-error/PageError';
import { AppConfigService } from '../../../../services';
import { SitesFetchList, sitesSelector } from '../../../../slices/business/sites/Sites.slice';
import SitesActions from './actions/SitesActions';
import SitesTable from './table/SitesTable';

const SitesList: FC = () => {
	const dispatch = useDispatch();
	const sites = useSelector(sitesSelector);

	useEffect(() => {
		const executeServices = () => {
			// dispatch: fetch sites
			dispatch(SitesFetchList(true));
		};

		// interval
		const intervalId = window.setInterval(
			executeServices,
			AppConfigService.AppOptions.screens.business.sites.list.refreshTime
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
		return <PageEmpty message="EMPTY.MESSAGE" />;
	}

	return (
		<Box>
			{/* Actions */}
			<SitesActions />

			{/* Table */}
			<SitesTable content={sites.content} />
		</Box>
	);
};
export default SitesList;
