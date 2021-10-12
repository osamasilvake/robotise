import { Box } from '@mui/material';
import { FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../../../components/content/page-empty/PageEmpty';
import PageError from '../../../../../../components/content/page-error/PageError';
import { AppConfigService } from '../../../../../../services';
import {
	phoneConfigsSelector,
	SitePhoneConfigsFetch
} from '../../../../../../slices/business/sites/phone-configs/PhoneConfigs.slice';
import { SiteParamsInterface } from '../../../Site.interface';
import { SitePhoneConfigsListPayloadInterface } from './SitePhoneConfigsList.interface';
import { SitePhoneConfigsListStyle } from './SitePhoneConfigsList.style';
import SitePhoneConfigsTable from './table/SitePhoneConfigsTable';

const SitePhoneConfigsList: FC = () => {
	const classes = SitePhoneConfigsListStyle();

	const dispatch = useDispatch();
	const phoneConfigs = useSelector(phoneConfigsSelector);

	const page = phoneConfigs.content?.state?.page || 0;
	const rowsPerPage =
		phoneConfigs.content?.state?.rowsPerPage ||
		AppConfigService.AppOptions.screens.business.sites.content.phoneConfigs.list
			.defaultPageSize;

	const pageRef = useRef({
		page: (phoneConfigs.content?.meta?.page || 0) - 1,
		rowsPerPage
	});

	const params: SiteParamsInterface = useParams();
	const pSiteId = phoneConfigs.content?.state?.pSiteId;
	const cSiteId = params.siteId;

	useEffect(() => {
		const payload: SitePhoneConfigsListPayloadInterface = {
			page,
			rowsPerPage
		};

		if (pageRef.current.rowsPerPage !== rowsPerPage && page === 0) {
			// dispatch: fetch site phone configs
			dispatch(SitePhoneConfigsFetch(cSiteId, payload));

			// update ref
			pageRef.current.page = page;
			pageRef.current.rowsPerPage = rowsPerPage;
		} else {
			const condition1 = phoneConfigs.content === null;
			const condition2 = !!(phoneConfigs.content !== null && pSiteId && pSiteId !== cSiteId);

			const condition3 = pageRef.current.page !== -1; // page switch back and forth
			const condition4 = page > pageRef.current.page; // detect next click

			if (condition1 || condition2 || condition3) {
				if (condition2 || condition4) {
					// dispatch: fetch site phone configs
					dispatch(
						SitePhoneConfigsFetch(cSiteId, {
							...payload,
							page: condition2 ? 0 : page
						})
					);

					// update ref
					pageRef.current.page = condition2 ? 0 : page;
				}
			}
		}
	}, [dispatch, phoneConfigs.content, cSiteId, pSiteId, page, rowsPerPage]);

	useEffect(() => {
		const executeServices = () => {
			if (phoneConfigs.content) {
				// dispatch: fetch site phone configs
				dispatch(
					SitePhoneConfigsFetch(
						cSiteId,
						{
							page: 0,
							rowsPerPage
						},
						true
					)
				);
			}
		};

		// interval
		const intervalId = window.setInterval(
			executeServices,
			AppConfigService.AppOptions.screens.business.sites.content.phoneConfigs.list.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [dispatch, phoneConfigs.content, cSiteId, page, rowsPerPage]);

	// loader
	if (phoneConfigs.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (phoneConfigs.errors) {
		return <PageError message={phoneConfigs.errors?.text} />;
	}

	// null
	if (!phoneConfigs.content) {
		return null;
	}

	// empty
	if (!phoneConfigs.content.data.length) {
		return <PageEmpty message="EMPTY.MESSAGE" />;
	}

	return (
		<Box className={classes.sBox}>
			<SitePhoneConfigsTable
				content={phoneConfigs.content}
				page={page}
				rowsPerPage={rowsPerPage}
			/>
		</Box>
	);
};
export default SitePhoneConfigsList;
