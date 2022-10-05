import { Box } from '@mui/material';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../../components/content/page-empty/PageEmpty';
import PageError from '../../../../../components/content/page-error/PageError';
import { AppDispatch } from '../../../../../slices';
import {
	SiteConfigurationFetch,
	siteConfigurationSelector
} from '../../../../../slices/business/sites/configuration/site-configuration/SiteConfiguration.slice';
import { SiteParamsInterface } from '../../Site.interface';
import { SiteConfigurationStyle } from './SiteConfiguration.style';
import SiteConfigurationTabs from './SiteConfiguration.tabs';

const SiteConfiguration: FC = () => {
	const classes = SiteConfigurationStyle();

	const dispatch = useDispatch<AppDispatch>();
	const siteConfiguration = useSelector(siteConfigurationSelector);

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;

	const section = siteConfiguration.content;
	const pSiteId = siteConfiguration.content?.pSiteId;
	const cSiteId = params.siteId;

	useEffect(() => {
		const condition1 = siteConfiguration.content === null && cSiteId;
		const condition2 = siteConfiguration.content !== null && pSiteId && pSiteId !== cSiteId;

		if (condition1 || condition2) {
			// dispatch: fetch site configuration
			dispatch(SiteConfigurationFetch(cSiteId));
		}
	}, [dispatch, pSiteId, cSiteId, siteConfiguration.content]);

	// loader
	if (siteConfiguration.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (siteConfiguration.errors) {
		return <PageError message={siteConfiguration.errors?.text} />;
	}

	// init
	if (!siteConfiguration.init) return null;

	// empty
	if (!siteConfiguration.content) {
		return <PageEmpty message="EMPTY.MESSAGE" />;
	}

	return (
		<Box className={classes.sBox}>
			{/* Content */}
			{section?.data && <SiteConfigurationTabs sections={section.data} />}
		</Box>
	);
};
export default SiteConfiguration;
