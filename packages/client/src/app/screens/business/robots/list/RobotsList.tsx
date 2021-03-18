import { Box } from '@material-ui/core';
import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../../../components/common/loader/Loader';
import PageError from '../../../../components/content/page-error/PageError';
import { AppConfigService } from '../../../../services';
import {
	RobotTwinsSummaryFetchList,
	robotTwinsSummarySelector
} from '../../../../slices/robot-twins/RobotTwinsSummary.slice';
import RobotsListTable from './RobotsListTable';

const RobotsList: FC = () => {
	const dispatch = useDispatch();
	const { loading, errors, content } = useSelector(robotTwinsSummarySelector);

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(
		content
			? content.meta.rowsPerPage || AppConfigService.AppOptions.screens.robots.pageSizes[5]
			: AppConfigService.AppOptions.screens.robots.pageSizes[5]
	);
	const pageState = useRef({
		page: content ? content.meta.page - 1 : page - 1,
		rowsPerPage
	});

	useEffect(() => {
		// when rows per page is changed
		if (pageState.current.rowsPerPage !== rowsPerPage && page === 0) {
			// fetch robot twins summary
			dispatch(RobotTwinsSummaryFetchList(page + 1, rowsPerPage));

			// update page state and rows per page
			pageState.current.page = page;
			pageState.current.rowsPerPage = rowsPerPage;
		} else {
			const condition1 = pageState.current.page !== -1; // page switch back and forth
			const condition2 = content === null && !condition1; // init
			const condition3 = page > pageState.current.page; // detect next click
			if (condition1 || condition2) {
				if (condition3) {
					// fetch robot twins summary
					dispatch(RobotTwinsSummaryFetchList(page + 1, rowsPerPage));

					// update page state
					pageState.current.page = page;
				}
			}
		}
	}, [content, dispatch, page, rowsPerPage]);

	// loading
	if (loading) {
		return <Loader spinner spinnerSmall spinnerText="LOADING" />;
	}

	// error
	if (errors && errors.text) {
		return <PageError message={errors.text} />;
	}

	return (
		<Box>
			{/* Table */}
			<RobotsListTable
				content={content}
				page={page}
				rowsPerPage={rowsPerPage}
				setRowsPerPage={setRowsPerPage}
				setPage={setPage}
			/>
		</Box>
	);
};
export default RobotsList;
