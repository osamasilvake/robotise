import { Box } from '@mui/material';
import { FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../../components/content/page-empty/PageEmpty';
import PageError from '../../../../../components/content/page-error/PageError';
import { AppConfigService } from '../../../../../services';
import { AppDispatch } from '../../../../../slices';
import {
	SMSListFetchList,
	smsListSelector
} from '../../../../../slices/business/sites/sms-list/SMSList.slice';
import { SiteParamsInterface } from '../../Site.interface';
import { SiteSMSListPayloadInterface } from './SiteSMSList.interface';
import { SiteSMSListStyle } from './SiteSMSList.style';
import SiteSMSListTable from './table/SiteSMSListTable';

const SiteSMSList: FC = () => {
	const classes = SiteSMSListStyle();

	const dispatch = useDispatch<AppDispatch>();
	const smsList = useSelector(smsListSelector);

	const page = smsList.content?.state?.page || 0;
	const rowsPerPage =
		smsList.content?.state?.rowsPerPage ||
		AppConfigService.AppOptions.screens.business.sites.content.smsList.list.defaultPageSize;

	const pageRef = useRef({
		page: (smsList.content?.meta?.page || 0) - 1,
		rowsPerPage
	});

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;
	const pSiteId = smsList.content?.state?.pSiteId;
	const cSiteId = params.siteId;

	useEffect(() => {
		const payload: SiteSMSListPayloadInterface = {
			page,
			rowsPerPage
		};

		if (pageRef.current.rowsPerPage !== rowsPerPage && page === 0) {
			// dispatch: fetch site SMS list
			dispatch(SMSListFetchList(cSiteId, payload));

			// update ref
			pageRef.current.page = page;
			pageRef.current.rowsPerPage = rowsPerPage;
		} else {
			const condition1 = smsList.content === null;
			const condition2 = !!(smsList.content !== null && pSiteId && pSiteId !== cSiteId);

			const condition3 = pageRef.current.page !== -1; // page switch back and forth
			const condition4 = page > pageRef.current.page; // detect next click

			if (condition1 || condition2 || condition3) {
				if (condition2 || condition4) {
					// dispatch: fetch site SMS list
					dispatch(
						SMSListFetchList(cSiteId, {
							...payload,
							page: condition2 ? 0 : page
						})
					);

					// update ref
					pageRef.current.page = condition2 ? 0 : page;
				}
			}
		}
	}, [dispatch, smsList.content, cSiteId, pSiteId, page, rowsPerPage]);

	useEffect(() => {
		const executeServices = () => {
			if (smsList.content) {
				// dispatch: fetch site SMS list
				dispatch(
					SMSListFetchList(
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
			AppConfigService.AppOptions.screens.business.sites.content.smsList.list.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [dispatch, smsList.content, cSiteId, page, rowsPerPage]);

	// loader
	if (smsList.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (smsList.errors) {
		return <PageError message={smsList.errors?.text} />;
	}

	// init
	if (!smsList.init) return null;

	// empty
	if (!smsList.content?.data.length) {
		return <PageEmpty message="EMPTY.MESSAGE" />;
	}

	return (
		<Box className={classes.sBox}>
			<SiteSMSListTable content={smsList.content} page={page} rowsPerPage={rowsPerPage} />
		</Box>
	);
};
export default SiteSMSList;
