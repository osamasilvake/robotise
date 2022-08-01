import { Box, Tab, Tabs } from '@mui/material';
import { FC, lazy, Suspense, SyntheticEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import ErrorBoundary from '../../../../../components/frame/error-boundary/ErrorBoundary';
import { AppConfigService } from '../../../../../services';
import { robotTwinsSummarySelector } from '../../../../../slices/business/robots/RobotTwinsSummary.slice';
import { RobotParamsInterface } from '../../Robot.interface';
import robotsRoutes from '../../Robots.routes';

const RobotConfigurationCloud = lazy(() => import('./cloud/RobotConfigurationCloud'));
const RobotConfigurationRobot = lazy(() => import('./robot/RobotConfigurationRobot'));

const RobotConfigurationTabs: FC = () => {
	const { t } = useTranslation('ROBOTS');

	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);

	const [value, setValue] = useState(-1);
	const params = useParams<keyof RobotParamsInterface>() as RobotParamsInterface;
	const location = useLocation();
	const navigate = useNavigate();

	const cRobotId = params.robotId;
	const robotSingle = robotTwinsSummary.content?.dataById[cRobotId];
	const problem = !!robotTwinsSummary.errors?.id || !robotSingle?.id;

	const translation = 'CONTENT.TABS';
	const offset = 7;

	useEffect(() => {
		const skipLastSlashes = AppConfigService.AppOptions.regex.skipLastSlashes;
		const cPath = location.pathname.replace(skipLastSlashes, '');
		const cIndex = robotsRoutes.findIndex(
			(r) => r.path.replace(':robotId', cRobotId) === cPath
		);

		setValue(cIndex - offset);
	}, [location.pathname, cRobotId]);

	/**
	 * handle tab change
	 * @param _event
	 * @param value
	 */
	const handleTabChange = (_event: SyntheticEvent, value: number) => {
		// prepare link
		const link = robotsRoutes[value + offset].path.replace(':robotId', cRobotId);

		// navigate
		navigate(link);
	};

	return value !== -1 && !problem ? (
		<Box>
			{/* Tabs */}
			<Tabs
				allowScrollButtonsMobile
				value={value}
				onChange={handleTabChange}
				variant="scrollable"
				textColor="primary">
				<Tab label={t(`${translation}.CONFIGURATION.CLOUD`)} />
				<Tab label={t(`${translation}.CONFIGURATION.ROBOT`)} />
			</Tabs>

			{/* Tab Panel */}
			<Box>
				{/* Cloud */}
				{value === 0 && (
					<ErrorBoundary>
						<Suspense fallback={null}>
							<RobotConfigurationCloud />
						</Suspense>
					</ErrorBoundary>
				)}

				{/* Robot */}
				{value === 1 && (
					<ErrorBoundary>
						<Suspense fallback={null}>
							<RobotConfigurationRobot />
						</Suspense>
					</ErrorBoundary>
				)}
			</Box>
		</Box>
	) : null;
};
export default RobotConfigurationTabs;
