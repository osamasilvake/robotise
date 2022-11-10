import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../../../components/content/page-empty/PageEmpty';
import PageError from '../../../../../../components/content/page-error/PageError';
import { AppDispatch } from '../../../../../../slices';
import {
	marketingRidesSelector,
	SiteMarketingRidesFetchList
} from '../../../../../../slices/business/sites/configuration/marketing-rides/MarketingRides.slice';
import { SiteParamsInterface } from '../../../Site.interface';
import { SiteConfigurationMarketingRidesInterface } from './SiteConfigurationMarketingRides.interface';
import SiteConfigurationMarketingRidesContent from './SiteConfigurationMarketingRidesContent';

const SiteConfigurationMarketingRides: FC<SiteConfigurationMarketingRidesInterface> = (props) => {
	const { setFormDirty } = props;

	const dispatch = useDispatch<AppDispatch>();
	const marketingRides = useSelector(marketingRidesSelector);

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;

	const cSiteId = params.siteId;
	const pMarketingRidesSiteId = marketingRides.content?.state?.pSiteId;

	useEffect(() => {
		if (pMarketingRidesSiteId === cSiteId) return;

		// dispatch: fetch marketing rides
		dispatch(SiteMarketingRidesFetchList(cSiteId));
	}, [dispatch, pMarketingRidesSiteId, cSiteId]);

	// loader
	if (marketingRides.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (marketingRides.errors) {
		return <PageError message={marketingRides.errors.text} />;
	}

	// init
	if (!marketingRides.init) return null;

	// empty
	if (!marketingRides.content) {
		return <PageEmpty message="EMPTY.MESSAGE" />;
	}

	return <SiteConfigurationMarketingRidesContent setFormDirty={setFormDirty} />;
};
export default SiteConfigurationMarketingRides;
