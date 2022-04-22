import { Box } from '@mui/material';
import { FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../../../components/content/page-empty/PageEmpty';
import PageError from '../../../../../../components/content/page-error/PageError';
import { AppConfigService } from '../../../../../../services';
import { AppDispatch } from '../../../../../../slices';
import {
	PhoneCallsFetchList,
	phoneCallsSelector
} from '../../../../../../slices/business/sites/phone-calls/PhoneCalls.slice';
import { SiteParamsInterface } from '../../../Site.interface';
import { SitePhoneCallsListPayloadInterface } from './SitePhoneCallsList.interface';
import { SitePhoneCallsListStyle } from './SitePhoneCallsList.style';
import SitePhoneCallsTable from './table/SitePhoneCallsTable';

const SitePhoneCallsList: FC = () => {
	const classes = SitePhoneCallsListStyle();

	const dispatch = useDispatch<AppDispatch>();
	const phoneCalls = useSelector(phoneCallsSelector);

	const page = phoneCalls.content?.state?.page || 0;
	const rowsPerPage =
		phoneCalls.content?.state?.rowsPerPage ||
		AppConfigService.AppOptions.screens.business.sites.content.phoneCalls.list.defaultPageSize;

	const pageRef = useRef({
		page: (phoneCalls.content?.meta?.page || 0) - 1,
		rowsPerPage
	});

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;
	const pSiteId = phoneCalls.content?.state?.pSiteId;
	const cSiteId = params.siteId;

	useEffect(() => {
		const payload: SitePhoneCallsListPayloadInterface = {
			page,
			rowsPerPage
		};

		if (pageRef.current.rowsPerPage !== rowsPerPage && page === 0) {
			// dispatch: fetch site phone calls
			dispatch(PhoneCallsFetchList(cSiteId, payload));

			// update ref
			pageRef.current.page = page;
			pageRef.current.rowsPerPage = rowsPerPage;
		} else {
			const condition1 = phoneCalls.content === null;
			const condition2 = !!(phoneCalls.content !== null && pSiteId && pSiteId !== cSiteId);

			const condition3 = pageRef.current.page !== -1; // page switch back and forth
			const condition4 = page > pageRef.current.page; // detect next click

			if (condition1 || condition2 || condition3) {
				if (condition2 || condition4) {
					// dispatch: fetch site phone calls
					dispatch(
						PhoneCallsFetchList(cSiteId, {
							...payload,
							page: condition2 ? 0 : page
						})
					);

					// update ref
					pageRef.current.page = condition2 ? 0 : page;
				}
			}
		}
	}, [dispatch, phoneCalls.content, cSiteId, pSiteId, page, rowsPerPage]);

	useEffect(() => {
		const executeServices = () => {
			if (phoneCalls.content) {
				// dispatch: fetch site phone calls
				dispatch(
					PhoneCallsFetchList(
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
			AppConfigService.AppOptions.screens.business.sites.content.phoneCalls.list.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [dispatch, phoneCalls.content, cSiteId, page, rowsPerPage]);

	// loader
	if (phoneCalls.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (phoneCalls.errors) {
		return <PageError message={phoneCalls.errors?.text} />;
	}

	// init
	if (!phoneCalls.init) return null;

	// empty
	if (!phoneCalls.content?.data.length) {
		return <PageEmpty message="EMPTY.MESSAGE" />;
	}

	return (
		<Box className={classes.sBox}>
			<SitePhoneCallsTable
				content={phoneCalls.content}
				page={page}
				rowsPerPage={rowsPerPage}
			/>
		</Box>
	);
};
export default SitePhoneCallsList;
