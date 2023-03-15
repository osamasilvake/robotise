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
import GeneralAllElevatorCallsActions from './actions/GeneralAllElevatorCallsActions';
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
	const callType = allElevatorCalls.content?.state?.callType;
	const includeAllCalls = !!allElevatorCalls.content?.state?.includeAllCalls;

	const pageRef = useRef({
		page: (allElevatorCalls.content?.meta?.page || 0) - 1,
		rowsPerPage,
		siteId,
		callType,
		includeAllCalls
	});

	useEffect(() => {
		const payload: GeneralAllElevatorCallsListPayloadInterface = {
			page,
			rowsPerPage,
			siteId,
			callType,
			includeAllCalls
		};

		if (pageRef.current.siteId !== siteId && page === 0) {
			// dispatch: fetch all elevator calls
			dispatch(AllElevatorCallsFetchList(payload));

			// update ref
			pageRef.current.page = page;
			pageRef.current.siteId = siteId;
		} else if (pageRef.current.callType !== callType && page === 0) {
			// dispatch: fetch all elevator calls
			dispatch(AllElevatorCallsFetchList(payload));

			// update ref
			pageRef.current.page = page;
			pageRef.current.callType = callType;
		} else if (pageRef.current.includeAllCalls !== includeAllCalls && page === 0) {
			// dispatch: fetch all elevator calls
			dispatch(AllElevatorCallsFetchList(payload));

			// update ref
			pageRef.current.page = page;
			pageRef.current.includeAllCalls = includeAllCalls;
		} else if (pageRef.current.rowsPerPage !== rowsPerPage && page === 0) {
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
	}, [dispatch, allElevatorCalls.content, page, rowsPerPage, siteId, callType, includeAllCalls]);

	useEffect(() => {
		const executeServices = () => {
			// dispatch: fetch all elevator calls
			dispatch(
				AllElevatorCallsFetchList(
					{
						page: 0,
						rowsPerPage,
						siteId,
						callType,
						includeAllCalls
					},
					true
				)
			);
		};

		// interval
		const intervalId = window.setInterval(
			executeServices,
			AppConfigService.AppOptions.screens.business.general.allElevatorCalls.list.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [dispatch, page, rowsPerPage, siteId, callType, includeAllCalls]);

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
				{/* Actions */}
				<GeneralAllElevatorCallsActions
					siteId={siteId}
					callType={callType}
					includeAllCalls={includeAllCalls}
				/>

				{/* Empty */}
				<PageEmpty message="EMPTY.MESSAGE" />
			</Box>
		);
	}

	return (
		<Box className={classes.sBox}>
			{/* Actions */}
			<GeneralAllElevatorCallsActions
				siteId={siteId}
				callType={callType}
				includeAllCalls={includeAllCalls}
			/>

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
