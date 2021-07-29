import { Box, Grid } from '@material-ui/core';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../../components/content/page-empty/PageEmpty';
import PageError from '../../../../../components/content/page-error/PageError';
import { robotSelector } from '../../../../../slices/business/robots/Robot.slice';
import { robotTwinsSummarySelector } from '../../../../../slices/business/robots/RobotTwinsSummary.slice';
import { RobotParamsInterface } from '../../Robot.interface';
import RobotConfig from './robot-config/RobotConfig';
import { RobotConfigurationStyle } from './RobotConfiguration.style';
import SyncProducts from './sync-products/SyncProducts';

const RobotConfiguration: FC = () => {
	const classes = RobotConfigurationStyle();

	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);
	const robot = useSelector(robotSelector);

	const params: RobotParamsInterface = useParams();
	const robotTwinId = robotTwinsSummary.content?.dataById[params.robotId]?.id;

	// loader
	if (robotTwinsSummary.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (!robotTwinId || robotTwinsSummary.errors) {
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
		<Box className={classes.sBox}>
			<Grid container spacing={1} className={classes.sGridMargin}>
				<Grid item xs={12} md={3}>
					<SyncProducts robotTwinsSummary={robotTwinsSummary} robot={robot} />
				</Grid>
			</Grid>
			<Grid container spacing={1}>
				<Grid item xs={12} md={6}>
					<RobotConfig robotTwinsSummary={robotTwinsSummary} robot={robot} />
				</Grid>
			</Grid>
		</Box>
	);
};
export default RobotConfiguration;
