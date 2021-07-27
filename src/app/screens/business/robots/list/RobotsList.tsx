import { Box } from '@material-ui/core';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../components/content/page-empty/PageEmpty';
import PageError from '../../../../components/content/page-error/PageError';
import {
	RobotTwinsSummaryFetchList,
	robotTwinsSummarySelector
} from '../../../../slices/robots/RobotTwinsSummary.slice';
import { sitesSelector } from '../../../../slices/sites/Sites.slice';
import RobotsActions from './actions/RobotsActions';
import RobotsTable from './table/RobotsTable';

const RobotsList: FC = () => {
	const dispatch = useDispatch();
	const sites = useSelector(sitesSelector);
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);

	useEffect(() => {
		// dispatch: fetch robot twins summary
		dispatch(RobotTwinsSummaryFetchList(true));
	}, [dispatch]);

	// loader
	if (sites.loader || robotTwinsSummary.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (sites.errors || robotTwinsSummary.errors) {
		return <PageError message={sites.errors?.text || robotTwinsSummary.errors?.text} />;
	}

	// null
	if (!robotTwinsSummary.content) {
		return null;
	}

	// empty
	if (!robotTwinsSummary.content.data.length) {
		return <PageEmpty message="EMPTY.MESSAGE" />;
	}

	return (
		<Box>
			{/* Actions */}
			<RobotsActions />

			{/* Table */}
			<RobotsTable content={robotTwinsSummary.content} />
		</Box>
	);
};
export default RobotsList;
