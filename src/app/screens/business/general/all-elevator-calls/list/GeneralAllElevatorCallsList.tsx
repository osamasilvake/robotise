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
	AllElevatorCallsFetchList,
	allElevatorCallsSelector
} from '../../../../../slices/business/general/all-elevator-calls/AllElevatorCalls.slice';
import { GeneralAllElevatorCallsListPayloadInterface } from './GeneralAllElevatorCallsList.interface';
import { GeneralAllElevatorCallsListStyle } from './GeneralAllElevatorCallsList.style';
import RobotElevatorCallsTable from './table/GeneralAllElevatorCallsTable';

const GeneralAllElevatorCallsList: FC = () => {
	const classes = GeneralAllElevatorCallsListStyle();

	const dispatch = useDispatch<AppDispatch>();
	const allElevatorCalls = useSelector(allElevatorCallsSelector);

	const page = allElevatorCalls.content?.state?.page || 0;
	const rowsPerPage =
		allElevatorCalls.content?.state?.rowsPerPage ||
		AppConfigService.AppOptions.screens.business.general.allElevatorCalls.list.defaultPageSize;
	const siteId = allElevatorCalls.content?.state?.siteId;

	const pageRef = useRef({
		page: (allElevatorCalls.content?.meta?.page || 0) - 1,
		rowsPerPage,
		siteId
	});

	useEffect(() => {
		const payload: GeneralAllElevatorCallsListPayloadInterface = {
			page,
			rowsPerPage,
			siteId
		};

		if (pageRef.current.rowsPerPage !== rowsPerPage && page === 0) {
			// dispatch: fetch all elevator calls
			dispatch(AllElevatorCallsFetchList(payload));

			// update ref
			pageRef.current.page = page;
			pageRef.current.rowsPerPage = rowsPerPage;
		} else {
			const condition1 = allElevatorCalls.content === null;

			const condition2 = pageRef.current.page !== -1; // page switch back and forth
			const condition3 = page > pageRef.current.page; // detect next click

			if (condition1 || condition2) {
				if (condition3) {
					// dispatch: fetch all elevator calls
					dispatch(AllElevatorCallsFetchList(payload));

					// update ref
					pageRef.current.page = page;
				}
			}
		}
	}, [dispatch, allElevatorCalls.content, page, rowsPerPage, siteId]);

	useEffect(() => {
		const executeServices = () => {
			if (allElevatorCalls.content) {
				// dispatch: fetch all elevator calls
				dispatch(
					AllElevatorCallsFetchList(
						{
							page: 0,
							rowsPerPage,
							siteId
						},
						true
					)
				);
			}
		};

		// interval
		const intervalId = window.setInterval(
			executeServices,
			AppConfigService.AppOptions.screens.business.general.allElevatorCalls.list.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [dispatch, allElevatorCalls.content, page, rowsPerPage, siteId]);

	// loader
	if (allElevatorCalls.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (allElevatorCalls.errors) {
		return <PageError message={allElevatorCalls.errors?.text} />;
	}

	// init
	if (!allElevatorCalls.init) return null;

	// empty
	if (!allElevatorCalls.content?.data.length) {
		return (
			<Box className={classes.sBox}>
				{/* Empty */}
				<PageEmpty message="EMPTY.MESSAGE" />
			</Box>
		);
	}

	return (
		<Box className={classes.sBox}>
			{/* Table */}
			<RobotElevatorCallsTable
				content={allElevatorCalls.content}
				page={page}
				rowsPerPage={rowsPerPage}
			/>
		</Box>
	);
};
export default GeneralAllElevatorCallsList;
