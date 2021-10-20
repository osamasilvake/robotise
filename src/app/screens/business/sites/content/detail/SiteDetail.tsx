import { Box } from '@mui/material';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import PageEmpty from '../../../../../components/content/page-empty/PageEmpty';
import { AppConfigService } from '../../../../../services';
import { SitesFetchList, sitesSelector } from '../../../../../slices/business/sites/Sites.slice';
import { SiteParamsInterface } from '../../Site.interface';
import SiteDetailGeneral from './general/SiteDetailGeneral';
import { SiteDetailStyle } from './SiteDetail.style';

const SiteDetail: FC = () => {
	const classes = SiteDetailStyle();

	const dispatch = useDispatch();
	const sites = useSelector(sitesSelector);

	const params: SiteParamsInterface = useParams();
	const cSiteId = params.siteId;
	const siteSingle = sites.content?.dataById[cSiteId];

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

	// empty
	if (!sites.content?.data.length) {
		return <PageEmpty message="EMPTY.MESSAGE" />;
	}

	return siteSingle?.id ? (
		<Box className={classes.sBox}>
			<SiteDetailGeneral site={siteSingle} />
		</Box>
	) : null;
};
export default SiteDetail;
