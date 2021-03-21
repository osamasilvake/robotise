import { Paper } from '@material-ui/core';
import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../../../components/common/loader/Loader';
import PageError from '../../../../components/content/page-error/PageError';
import { AppConfigService } from '../../../../services';
import {
	RobotTwinsSummaryFetchList,
	robotTwinsSummarySelector
} from '../../../../slices/robot-twins/RobotTwinsSummary.slice';
import RobotsListTable from './table/RobotsListTable';

const RobotsList: FC = () => {
	const dispatch = useDispatch();
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(
		robotTwinsSummary.content
			? robotTwinsSummary.content.meta.rowsPerPage ||
					AppConfigService.AppOptions.screens.robots.defaultPageSize
			: AppConfigService.AppOptions.screens.robots.defaultPageSize
	);
	const pageState = useRef({
		page: robotTwinsSummary.content ? robotTwinsSummary.content.meta.page - 1 : page - 1,
		rowsPerPage
	});

	useEffect(() => {
		// when rows per page is changed
		if (pageState.current.rowsPerPage !== rowsPerPage && page === 0) {
			// dispatch: fetch robot twins summary
			dispatch(RobotTwinsSummaryFetchList(page + 1, rowsPerPage));

			// update page state and rows per page
			pageState.current.page = page;
			pageState.current.rowsPerPage = rowsPerPage;
		} else {
			const condition1 = pageState.current.page !== -1; // page switch back and forth
			const condition2 = robotTwinsSummary.content === null && !condition1; // init
			const condition3 = page > pageState.current.page; // detect next click
			if (condition1 || condition2) {
				if (condition3) {
					// dispatch: fetch robot twins summary
					dispatch(RobotTwinsSummaryFetchList(page + 1, rowsPerPage));

					// update page state
					pageState.current.page = page;
				}
			}
		}
	}, [dispatch, robotTwinsSummary.content, page, rowsPerPage]);

	// loading
	if (robotTwinsSummary.loading) {
		return <Loader spinner spinnerSmall spinnerText="LOADING" />;
	}

	// error
	if (robotTwinsSummary.errors && robotTwinsSummary.errors.text) {
		return <PageError message={robotTwinsSummary.errors.text} />;
	}

	// init
	if (!robotTwinsSummary.content) {
		return null;
	}

	return (
		<Paper elevation={12}>
			{/* Table */}
			<RobotsListTable
				content={robotTwinsSummary.content}
				page={page}
				rowsPerPage={rowsPerPage}
				setRowsPerPage={setRowsPerPage}
				setPage={setPage}
			/>
		</Paper>
	);
};
export default RobotsList;
