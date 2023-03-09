import { Box } from '@mui/material';
import { FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../../components/content/page-empty/PageEmpty';
import PageError from '../../../../../components/content/page-error/PageError';
import { AppConfigService } from '../../../../../services';
import { AppDispatch } from '../../../../../slices';
import {
	AllSMSListFetchList,
	allSMSListSelector
} from '../../../../../slices/business/general/all-sms-list/AllSMSList.slice';
import GeneralAllSMSListActions from './actions/GeneralAllSMSListActions';
import { GeneralAllSMSListPayloadInterface } from './GeneralAllSMSList.interface';
import { GeneralAllSMSListStyle } from './GeneralAllSMSList.style';
import GeneralAllSMSListTable from './table/GeneralAllSMSListTable';

const GeneralAllSMSList: FC = () => {
	const classes = GeneralAllSMSListStyle();

	const dispatch = useDispatch<AppDispatch>();
	const allSMSList = useSelector(allSMSListSelector);

	const page = allSMSList.content?.state?.page || 0;
	const rowsPerPage =
		allSMSList.content?.state?.rowsPerPage ||
		AppConfigService.AppOptions.screens.business.general.allSMSList.list.defaultPageSize;
	const siteId = allSMSList.content?.state?.siteId;
	const includeAllCalls = !!allSMSList.content?.state?.includeAllCalls;

	const pageRef = useRef({
		page: (allSMSList.content?.meta?.page || 0) - 1,
		rowsPerPage,
		siteId,
		includeAllCalls
	});

	useEffect(() => {
		const payload: GeneralAllSMSListPayloadInterface = {
			page,
			rowsPerPage,
			siteId,
			includeAllCalls
		};

		if (pageRef.current.siteId !== siteId && page === 0) {
			// dispatch: fetch all SMS list
			dispatch(AllSMSListFetchList(payload));

			// update ref
			pageRef.current.page = page;
			pageRef.current.siteId = siteId;
		} else if (pageRef.current.includeAllCalls !== includeAllCalls && page === 0) {
			// dispatch: fetch all SMS list
			dispatch(AllSMSListFetchList(payload));

			// update ref
			pageRef.current.page = page;
			pageRef.current.includeAllCalls = includeAllCalls;
		} else if (pageRef.current.rowsPerPage !== rowsPerPage && page === 0) {
			// dispatch: fetch all SMS list
			dispatch(AllSMSListFetchList(payload));

			// update ref
			pageRef.current.page = page;
			pageRef.current.rowsPerPage = rowsPerPage;
		} else {
			const condition1 = allSMSList.content === null;

			const condition2 = pageRef.current.page !== -1; // page switch back and forth
			const condition3 = page > pageRef.current.page; // detect next click

			if (condition1 || condition2) {
				if (condition3) {
					// dispatch: fetch all SMS list
					dispatch(AllSMSListFetchList(payload));

					// update ref
					pageRef.current.page = page;
				}
			}
		}
	}, [dispatch, allSMSList.content, page, rowsPerPage, siteId, includeAllCalls]);

	useEffect(() => {
		const executeServices = () => {
			// dispatch: fetch all SMS list
			dispatch(
				AllSMSListFetchList(
					{
						page: 0,
						rowsPerPage,
						siteId,
						includeAllCalls
					},
					true
				)
			);
		};

		// interval
		const intervalId = window.setInterval(
			executeServices,
			AppConfigService.AppOptions.screens.business.general.allSMSList.list.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [dispatch, page, rowsPerPage, siteId, includeAllCalls]);

	// loader
	if (allSMSList.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (allSMSList.errors) {
		return <PageError message={allSMSList.errors?.text} />;
	}

	// init
	if (!allSMSList.init) return null;

	// empty
	if (!allSMSList.content?.data.length) {
		return (
			<Box className={classes.sBox}>
				{/* Actions */}
				<GeneralAllSMSListActions siteId={siteId} includeAllCalls={includeAllCalls} />
				{/* Empty */}
				<PageEmpty message="EMPTY.MESSAGE" />;
			</Box>
		);
	}

	return (
		<Box className={classes.sBox}>
			{/* Actions */}
			<GeneralAllSMSListActions siteId={siteId} includeAllCalls={includeAllCalls} />

			{/* Table */}
			<GeneralAllSMSListTable
				content={allSMSList.content}
				page={page}
				rowsPerPage={rowsPerPage}
			/>
		</Box>
	);
};
export default GeneralAllSMSList;
