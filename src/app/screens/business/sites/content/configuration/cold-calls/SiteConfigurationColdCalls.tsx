import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../../../components/content/page-empty/PageEmpty';
import PageError from '../../../../../../components/content/page-error/PageError';
import { AppDispatch } from '../../../../../../slices';
import {
	coldCallsSelector,
	SiteColdCallsFetchList
} from '../../../../../../slices/business/sites/configuration/cold-calls/ColdCalls.slice';
import { SiteParamsInterface } from '../../../Site.interface';
import SiteConfigurationColdCallsContent from './SiteConfigurationColdCallsContent';

const SiteConfigurationColdCalls: FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const coldCalls = useSelector(coldCallsSelector);

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;

	const cSiteId = params.siteId;
	const pColdCallsSiteId = coldCalls.content?.state?.pSiteId;

	useEffect(() => {
		if (pColdCallsSiteId === cSiteId) return;

		// dispatch: fetch cold calls
		dispatch(SiteColdCallsFetchList(cSiteId));
	}, [dispatch, pColdCallsSiteId, cSiteId]);

	// loader
	if (coldCalls.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (coldCalls.errors) {
		return <PageError message={coldCalls.errors.text} />;
	}

	// init
	if (!coldCalls.init) return null;

	// empty
	if (!coldCalls.content) {
		return <PageEmpty message="EMPTY.MESSAGE" />;
	}

	return <SiteConfigurationColdCallsContent />;
};
export default SiteConfigurationColdCalls;
