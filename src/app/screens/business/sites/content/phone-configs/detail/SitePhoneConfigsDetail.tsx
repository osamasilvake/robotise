import { Box } from '@mui/material';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../../../components/content/page-empty/PageEmpty';
import PageError from '../../../../../../components/content/page-error/PageError';
import { AppConfigService } from '../../../../../../services';
import {
	PhoneConfigsFetch,
	phoneConfigsSelector
} from '../../../../../../slices/business/sites/phone-configs/PhoneConfigs.slice';
import { SiteParamsInterface } from '../../../Site.interface';
import SitePhoneConfigsDetailActions from './actions/SitePhoneConfigsDetailActions';
import SitePhoneConfigsAudioMessages from './audio-messages/SitePhoneConfigsAudioMessages';
import SitePhoneConfigsGeneral from './general/SitePhoneConfigsGeneral';
import { SitePhoneConfigsDetailStyle } from './SitePhoneConfigsDetail.style';

const SitePhoneConfigsDetail: FC = () => {
	const classes = SitePhoneConfigsDetailStyle();

	const dispatch = useDispatch();
	const phoneConfigs = useSelector(phoneConfigsSelector);

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;
	const pSiteId = phoneConfigs.content?.state?.pSiteId;
	const cSiteId = params.siteId;

	useEffect(() => {
		const condition1 = phoneConfigs.content === null;
		const condition2 = !!(phoneConfigs.content !== null && pSiteId && pSiteId !== cSiteId);

		if (condition1 || condition2) {
			// dispatch: fetch site phone configs
			dispatch(PhoneConfigsFetch(cSiteId));
		}
	}, [dispatch, phoneConfigs.content, pSiteId, cSiteId]);

	useEffect(() => {
		const executeServices = () => {
			if (phoneConfigs.content) {
				// dispatch: fetch site phone configs
				dispatch(PhoneConfigsFetch(cSiteId, true));
			}
		};

		// interval
		const intervalId = window.setInterval(
			executeServices,
			AppConfigService.AppOptions.screens.business.sites.content.phoneConfigs.list.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [dispatch, phoneConfigs.content, cSiteId]);

	// loader
	if (phoneConfigs.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (phoneConfigs.errors) {
		return <PageError message={phoneConfigs.errors?.text} />;
	}

	// init
	if (!phoneConfigs.init) return null;

	// empty
	if (!phoneConfigs.content?.data.length) {
		return <PageEmpty message="EMPTY.MESSAGE" />;
	}

	return (
		<Box className={classes.sBox}>
			{/* Actions */}
			<SitePhoneConfigsDetailActions />

			{/* General */}
			<SitePhoneConfigsGeneral content={phoneConfigs.content} />

			{/* Audio Messages */}
			<SitePhoneConfigsAudioMessages content={phoneConfigs.content} />
		</Box>
	);
};
export default SitePhoneConfigsDetail;
