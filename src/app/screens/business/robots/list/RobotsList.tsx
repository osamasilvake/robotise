import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../components/content/page-empty/PageEmpty';
import PageError from '../../../../components/content/page-error/PageError';
import {
	RobotTwinsSummaryFetchList,
	robotTwinsSummarySelector
} from '../../../../slices/robot-twins/RobotTwinsSummary.slice';
import { sitesSelector } from '../../../../slices/sites/Sites.slice';
import RobotsTable from './table/RobotsTable';

const RobotsList: FC = () => {
	const dispatch = useDispatch();
	const sites = useSelector(sitesSelector);
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);

	useEffect(() => {
		const condition1 = sites.content !== null;
		const condition2 = robotTwinsSummary.content === null;
		if (condition1 && condition2) {
			// dispatch: fetch robot twins summary
			dispatch(RobotTwinsSummaryFetchList());
		}
	}, [dispatch, sites.content, robotTwinsSummary.content]);

	// loader
	if (sites.loader || robotTwinsSummary.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (robotTwinsSummary.errors) {
		return <PageError message={robotTwinsSummary.errors.text} />;
	}

	// empty
	if (!robotTwinsSummary.content || !robotTwinsSummary.content.data.length) {
		return <PageEmpty message="EMPTY.MESSAGE"></PageEmpty>;
	}

	return <RobotsTable content={robotTwinsSummary.content} />;
};
export default RobotsList;
