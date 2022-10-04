import { Box, Tab, Tabs } from '@mui/material';
import { FC, lazy, Suspense, SyntheticEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import ErrorBoundary from '../../../../../components/frame/error-boundary/ErrorBoundary';
import { AppConfigService } from '../../../../../services';
import { robotTwinsSummarySelector } from '../../../../../slices/business/robots/RobotTwinsSummary.slice';
import { strRemoveSymbols } from '../../../../../utilities/methods/String';
import { RobotParamsInterface } from '../../Robot.interface';
import robotsRoutes from '../../Robots.routes';
import { RobotConfigurationTabsTypeEnum } from './RobotConfiguration.enum';
import { RobotConfigurationTabsInterface } from './RobotConfiguration.interface';

const RobotConfigurationCloud = lazy(() => import('./cloud/RobotConfigurationCloud'));
const RobotConfigurationRobot = lazy(() => import('./robot/RobotConfigurationRobot'));

const RobotConfigurationTabs: FC<RobotConfigurationTabsInterface> = (props) => {
	const { sections } = props;
	const { t } = useTranslation('ROBOTS');

	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);

	const [value, setValue] = useState(0);
	const [sectionName, setSectionName] = useState('');
	const params = useParams<keyof RobotParamsInterface>() as RobotParamsInterface;
	const location = useLocation();
	const navigate = useNavigate();

	const cRobotId = params.robotId;
	const robotSingle = robotTwinsSummary.content?.dataById[cRobotId];
	const problem = !!robotTwinsSummary.errors?.id || !robotSingle?.id;

	const translation = 'CONTENT.TABS';
	const offset = 8;

	useEffect(() => {
		const skipLastSlashes = AppConfigService.AppOptions.regex.skipLastSlashes;
		const cPath = location.pathname.replace(skipLastSlashes, '');
		const slashIndex = cPath.lastIndexOf('/');
		const pathSection = cPath.substring(slashIndex + 1);

		if (pathSection === RobotConfigurationTabsTypeEnum.CLOUD) {
			setValue(0);
		} else {
			const index = sections?.findIndex((s) => s.sectionName === pathSection);
			setValue(index + 1);
			if (!sectionName) {
				setSectionName(pathSection);
			}
		}
	}, [location.pathname, sections, sectionName]);

	/**
	 * handle tab change
	 * @param _event
	 * @param value
	 */
	const handleTabChange = (_event: SyntheticEvent, value: number) => {
		if (value > 0) {
			const updateSectionName = sections[value - 1]?.sectionName;

			// set section name
			setSectionName(updateSectionName);

			// prepare link
			const link = robotsRoutes[offset].path
				.replace(':configId', updateSectionName)
				.replace(':robotId', cRobotId);

			// navigate
			navigate(link);
		} else {
			const configId = RobotConfigurationTabsTypeEnum.CLOUD;
			const offsetNo = offset;

			// prepare link
			const link = robotsRoutes[offsetNo].path
				.replace(':robotId', cRobotId)
				.replace(':configId', configId);

			// navigate
			navigate(link);
		}
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
				{sections
					?.filter((s) => !!s?.sectionName)
					?.map((section) => (
						<Tab key={section.id} label={strRemoveSymbols(section.sectionName)} />
					))}
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
				{value !== 0 &&
					sections
						?.filter((s) => !!s?.sectionName)
						?.map(
							(section) =>
								section.sectionName === sectionName && (
									<ErrorBoundary key={section.id}>
										<Suspense fallback={null}>
											<RobotConfigurationRobot section={section} />
										</Suspense>
									</ErrorBoundary>
								)
						)}
			</Box>
		</Box>
	) : null;
};
export default RobotConfigurationTabs;
