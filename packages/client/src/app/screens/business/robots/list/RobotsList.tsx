import { Box } from '@material-ui/core';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../../../components/common/loader/Loader';
import { RobotsFetchList, robotsSelector } from '../../../../slices/robots/Robots.slice';
import RobotsListTable from './RobotsListTable';

const RobotsList: FC = () => {
	const dispatch = useDispatch();
	const { loading, errors, content } = useSelector(robotsSelector);

	useEffect(() => {
		// fetch sites, robot twins and robots and map them to create robots list
		dispatch(RobotsFetchList());
	}, [dispatch]);

	// loading
	if (loading) {
		return <Loader spinner spinnerSmall spinnerText="LOADING" />;
	}

	// error
	if (errors) {
		return <h1>Error Happened</h1>;
	}

	return (
		<Box>
			{/* Table */}
			<RobotsListTable content={content} />
		</Box>
	);
};
export default RobotsList;

/**
 * Checks:
 * 00: Page Error
 * 00: Loader
 * 01: Sorting
 * 02: Pagination
 * 03: Styling
 * 04: Columns with alignement and formating
 * 05: Set translations
 * 06: Auto-refresh Robots list
 */
