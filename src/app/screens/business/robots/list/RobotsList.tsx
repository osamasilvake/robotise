import { Box } from '@mui/material';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../components/content/page-empty/PageEmpty';
import PageError from '../../../../components/content/page-error/PageError';
import { AppConfigService } from '../../../../services';
import {
	RobotTwinsSummaryFetchList,
	robotTwinsSummarySelector
} from '../../../../slices/business/robots/RobotTwinsSummary.slice';
import RobotsActions from './actions/RobotsActions';
import RobotsTable from './table/RobotsTable';

const RobotsList: FC = () => {
	const dispatch = useDispatch();
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);

	useEffect(() => {
		const executeServices = () => {
			// dispatch: fetch robot twins summary
			dispatch(RobotTwinsSummaryFetchList(true));
		};

		// interval
		const intervalId = window.setInterval(
			executeServices,
			AppConfigService.AppOptions.screens.business.robots.list.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [dispatch]);

	// loader
	if (robotTwinsSummary.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (robotTwinsSummary.errors) {
		return <PageError message={robotTwinsSummary.errors?.text} />;
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
