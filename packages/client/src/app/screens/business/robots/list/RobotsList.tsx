import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../components/common/loader/Loader.enum';
import PageError from '../../../../components/content/page-error/PageError';
import {
	RobotTwinsSummaryFetchList,
	robotTwinsSummarySelector
} from '../../../../slices/robot-twins/RobotTwinsSummary.slice';
import RobotsTable from './table/RobotsTable';

const RobotsList: FC = () => {
	const dispatch = useDispatch();
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);

	useEffect(() => {
		const condition1 = robotTwinsSummary.content === null;
		if (condition1) {
			// dispatch: fetch robot twins summary
			dispatch(RobotTwinsSummaryFetchList());
		}
	}, [dispatch, robotTwinsSummary.content]);

	// loader
	if (robotTwinsSummary.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (robotTwinsSummary.errors) {
		return <PageError message={robotTwinsSummary.errors.text} />;
	}

	// empty
	if (!robotTwinsSummary.content) {
		return null;
	}

	return <RobotsTable content={robotTwinsSummary.content} />;
};
export default RobotsList;
