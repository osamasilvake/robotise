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
	const [rowsPerPage, setRowsPerPage] = useState(
		content
			? content.meta.rowsPerPage || AppConfigService.AppOptions.screens.robots.pageSizes[1]
			: AppConfigService.AppOptions.screens.robots.pageSizes[1]
	);
	const pageState = useRef({
		page: content ? content.meta.page - 1 : page - 1,
		rowsPerPage
	});

	useEffect(() => {
		// when rows per page is changed
		if (pageState.current.rowsPerPage !== rowsPerPage && page === 0) {
			// fetch sites, robot twins and robots and map them to create robots list
			dispatch(RobotsFetchList(page + 1, rowsPerPage));

			// update page state and rows per page
			pageState.current.page = page;
			pageState.current.rowsPerPage = rowsPerPage;
		} else {
			const cond1 = pageState.current.page !== -1; // page switch back and forth
			const cond2 = content === null && !cond1; // init
			const cond3 = page > pageState.current.page; // detect next click
			if (cond1 || cond2) {
				if (cond3) {
					// fetch sites, robot twins and robots and map them to create robots list
					dispatch(RobotsFetchList(page + 1, rowsPerPage));

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
