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
	AllPhoneCallsFetchList,
	allPhoneCallsSelector
} from '../../../../../slices/business/general/all-phone-calls/AllPhoneCalls.slice';
import GeneralAllPhoneCallsActions from './actions/GeneralAllPhoneCallsActions';
import { GeneralAllPhoneCallsListPayloadInterface } from './GeneralAllPhoneCallsList.interface';
import { GeneralAllPhoneCallsListStyle } from './GeneralAllPhoneCallsList.style';
import GeneralAllPhoneCallsTable from './table/GeneralAllPhoneCallsTable';

const GeneralAllPhoneCallsList: FC = () => {
	const classes = GeneralAllPhoneCallsListStyle();

	const dispatch = useDispatch<AppDispatch>();
	const allPhoneCalls = useSelector(allPhoneCallsSelector);

	const page = allPhoneCalls.content?.state?.page || 0;
	const rowsPerPage =
		allPhoneCalls.content?.state?.rowsPerPage ||
		AppConfigService.AppOptions.screens.business.general.allPhoneCalls.list.defaultPageSize;
	const siteId = allPhoneCalls.content?.state?.siteId;
	const includeAllCalls = !!allPhoneCalls.content?.state?.includeAllCalls;

	const pageRef = useRef({
		page: (allPhoneCalls.content?.meta?.page || 0) - 1,
		rowsPerPage,
		siteId,
		includeAllCalls
	});

	useEffect(() => {
		const payload: GeneralAllPhoneCallsListPayloadInterface = {
			page,
			rowsPerPage,
			siteId,
			includeAllCalls
		};

		if (pageRef.current.siteId !== siteId && page === 0) {
			// dispatch: fetch all phone calls
			dispatch(AllPhoneCallsFetchList(payload));

			// update ref
			pageRef.current.page = page;
			pageRef.current.siteId = siteId;
		} else if (pageRef.current.includeAllCalls !== includeAllCalls && page === 0) {
			// dispatch: fetch all phone calls
			dispatch(AllPhoneCallsFetchList(payload));

			// update ref
			pageRef.current.page = page;
			pageRef.current.includeAllCalls = includeAllCalls;
		} else if (pageRef.current.rowsPerPage !== rowsPerPage && page === 0) {
			// dispatch: fetch all phone calls
			dispatch(AllPhoneCallsFetchList(payload));

			// update ref
			pageRef.current.page = page;
			pageRef.current.rowsPerPage = rowsPerPage;
		} else {
			const condition1 = allPhoneCalls.content === null;

			const condition2 = pageRef.current.page !== -1; // page switch back and forth
			const condition3 = page > pageRef.current.page; // detect next click

			if (condition1 || condition2) {
				if (condition3) {
					// dispatch: fetch all phone calls
					dispatch(AllPhoneCallsFetchList(payload));

					// update ref
					pageRef.current.page = page;
				}
			}
		}
	}, [dispatch, allPhoneCalls.content, page, rowsPerPage, siteId, includeAllCalls]);

	useEffect(() => {
		const executeServices = () => {
			// dispatch: fetch all phone calls
			dispatch(
				AllPhoneCallsFetchList(
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
			AppConfigService.AppOptions.screens.business.general.allPhoneCalls.list.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [dispatch, page, rowsPerPage, siteId, includeAllCalls]);

	// loader
	if (allPhoneCalls.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (allPhoneCalls.errors) {
		return <PageError message={allPhoneCalls.errors?.text} />;
	}

	// init
	if (!allPhoneCalls.init) return null;

	// empty
	if (!allPhoneCalls.content?.data.length) {
		return (
			<Box className={classes.sBox}>
				{/* Actions */}
				<GeneralAllPhoneCallsActions siteId={siteId} includeAllCalls={includeAllCalls} />
				{/* Empty */}
				<PageEmpty message="EMPTY.MESSAGE" />;
			</Box>
		);
	}

	return (
		<Box className={classes.sBox}>
			{/* Actions */}
			<GeneralAllPhoneCallsActions siteId={siteId} includeAllCalls={includeAllCalls} />

			{/* Table */}
			<GeneralAllPhoneCallsTable
				content={allPhoneCalls.content}
				page={page}
				rowsPerPage={rowsPerPage}
			/>
		</Box>
	);
};
export default GeneralAllPhoneCallsList;
