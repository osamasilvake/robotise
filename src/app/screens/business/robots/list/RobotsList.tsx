import { Box } from '@mui/material';
import { FC } from 'react';
import { useSelector } from 'react-redux';

import Loader from '../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../components/content/page-empty/PageEmpty';
import PageError from '../../../../components/content/page-error/PageError';
import { robotTwinsSummarySelector } from '../../../../slices/business/robots/RobotTwinsSummary.slice';
import RobotsActions from './actions/RobotsActions';
import { RobotsInterface } from './RobotsList.interface';
import RobotsTable from './table/RobotsTable';

const RobotsList: FC<RobotsInterface> = (props) => {
	const { hideCreateBtn, hideTableScroll, siteId } = props;
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);

	// loader
	if (robotTwinsSummary.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (robotTwinsSummary.errors) {
		return <PageError message={robotTwinsSummary.errors?.text} />;
	}

	// init
	if (!robotTwinsSummary.init) return null;

	// empty
	if (!robotTwinsSummary.content?.data.length) {
		return <PageEmpty message="EMPTY.MESSAGE" />;
	}

	return (
		<Box>
			{/* Actions */}
			<RobotsActions hideCreateBtn={hideCreateBtn} />

			{/* Table */}
			<RobotsTable
				hideTableScroll={hideTableScroll}
				siteId={siteId}
				content={robotTwinsSummary.content}
			/>
		</Box>
	);
};
export default RobotsList;
