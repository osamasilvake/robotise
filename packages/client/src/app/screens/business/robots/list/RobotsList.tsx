import { Box } from '@material-ui/core';
import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../components/common/loader/Loader.enum';
import PageError from '../../../../components/content/page-error/PageError';
import { AppConfigService } from '../../../../services';
import {
	RobotTwinsSummaryFetchList,
	robotTwinsSummarySelector
} from '../../../../slices/robot-twins/RobotTwinsSummary.slice';
import RobotsTable from './table/RobotsTable';

const RobotsList: FC = () => {
	const dispatch = useDispatch();
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(
		robotTwinsSummary.content
			? robotTwinsSummary.content.meta.rowsPerPage ||
					AppConfigService.AppOptions.screens.robots.list.defaultPageSize
			: AppConfigService.AppOptions.screens.robots.list.defaultPageSize
	);
	const pageRef = useRef({
		page: robotTwinsSummary.content ? robotTwinsSummary.content.meta.page - 1 : page - 1,
		rowsPerPage
	});

	useEffect(() => {
		// when rows per page is changed
		if (pageRef.current.rowsPerPage !== rowsPerPage && page === 0) {
			// dispatch: fetch robot twins summary
			dispatch(RobotTwinsSummaryFetchList(page + 1, rowsPerPage));

			// update page state and rows per page
			pageRef.current.page = page;
			pageRef.current.rowsPerPage = rowsPerPage;
		} else {
			const condition1 = pageRef.current.page !== -1; // page switch back and forth
			const condition2 = robotTwinsSummary.content === null && !condition1; // init
			const condition3 = page > pageRef.current.page; // detect next click
			if (condition1 || condition2) {
				if (condition3) {
					// dispatch: fetch robot twins summary
					dispatch(RobotTwinsSummaryFetchList(page + 1, rowsPerPage));

					// update page state
					pageRef.current.page = page;
				}
			}
		}
	}, [dispatch, robotTwinsSummary.content, page, rowsPerPage]);

	// loader
	if (robotTwinsSummary.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (robotTwinsSummary.errors && robotTwinsSummary.errors.text) {
		return <PageError message={robotTwinsSummary.errors.text} />;
	}

	// empty
	if (!robotTwinsSummary.content) {
		return null;
	}

	return (
		<Box>
			{/* Table */}
			<RobotsTable
				content={robotTwinsSummary.content}
				page={page}
				rowsPerPage={rowsPerPage}
				setRowsPerPage={setRowsPerPage}
				setPage={setPage}
			/>
		</Box>
	);
};
export default RobotsList;
