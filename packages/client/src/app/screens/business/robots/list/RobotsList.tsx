import { Box } from '@material-ui/core';
import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../../../components/common/loader/Loader';
import PageError from '../../../../components/content/page-error/PageError';
import { AppConfigService } from '../../../../services';
import { RobotsFetchList, robotsSelector } from '../../../../slices/robots/Robots.slice';
import RobotsListTable from './RobotsListTable';

const RobotsList: FC = () => {
	const dispatch = useDispatch();
	const { loading, errors, content } = useSelector(robotsSelector);

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(AppConfigService.AppOptions.robots.pageSize);
	const pageState = useRef({
		page: content ? content.meta.page - 1 : page - 1,
		rowsPerPage
	});

	useEffect(() => {
		const cond1 = pageState.current.page !== -1; // page switch and forth
		const cond2 = content === null && !cond1; // init
		const cond3 = page > pageState.current.page; // only detect next click
		const cond4 = rowsPerPage !== pageState.current.rowsPerPage; // detect change click

		console.log(cond1, cond2, cond3);
		if (cond1 || cond2) {
			if (cond3 || cond4) {
				// fetch sites, robot twins and robots and map them to create robots list
				dispatch(RobotsFetchList(page + 1, rowsPerPage));

				// update page state
				pageState.current.page = page;
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

/**
 * Done:
 * Add action creators and reducers
 * Fetch data from API
 * Add types to API response
 * Loader component
 * Page Error
 * Sorting
 * Pagination
 * Set translations
 *
 * Checks:
 * 01: Pagination
 * 02: Table Styling + Responsive Layout (sidebar)
 * 03: Auto-refresh Robots list
 * 04: Show Errors on badge
 * 05: Refactor
 */
