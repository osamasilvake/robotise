import { Box, Tab, Tabs } from '@mui/material';
import { FC, Suspense, SyntheticEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import ErrorBoundary from '../../../components/frame/error-boundary/ErrorBoundary';
import { AppConfigService } from '../../../services';
import SetupRobotPassword from './robot-password/SetupRobotPassword';
import setupRoutes from './Setup.routes';
import SetupWifiConfig from './wifi-config/SetupWifiConfig';

const SetupTabs: FC = () => {
	const { t } = useTranslation('SETUP');

	const [value, setValue] = useState(-1);
	const navigate = useNavigate();
	const location = useLocation();

	const translation = 'CONTENT.TABS';
	const offset = 1;

	useEffect(() => {
		const skipLastSlashes = AppConfigService.AppOptions.regex.skipLastSlashes;
		const cPath = location.pathname.replace(skipLastSlashes, '');
		const cIndex = setupRoutes.findIndex((r) => r.path === cPath);

		setValue(cIndex - offset);
	}, [location.pathname]);

	/**
	 * handle tab change
	 * @param _event
	 * @param value
	 */
	const handleTabChange = (_event: SyntheticEvent, value: number) => {
		// prepare link
		const link = setupRoutes[value + offset].path;

		// navigate
		navigate(link);
	};

	// navigate to first tab
	if (location.pathname === AppConfigService.AppRoutes.SCREENS.SETTINGS.SETUP.MAIN) {
		return <Navigate to={AppConfigService.AppRoutes.SCREENS.SETTINGS.SETUP.WIFI_CONFIG} />;
	}

	return value !== -1 ? (
		<Box>
			{/* Tabs */}
			<Tabs
				allowScrollButtonsMobile
				value={value}
				onChange={handleTabChange}
				variant="scrollable"
				textColor="primary">
				<Tab label={t(`${translation}.WIFI_CONFIG`)} />
				<Tab label={t(`${translation}.ROBOT_PASSWORD`)} />
			</Tabs>

			{/* Tab Panel */}
			<Box>
				{/* Wifi Config */}
				{value === 0 && (
					<ErrorBoundary>
						<Suspense fallback={null}>
							<SetupWifiConfig />
						</Suspense>
					</ErrorBoundary>
				)}

				{/* Robot Password */}
				{value === 1 && (
					<ErrorBoundary>
						<Suspense fallback={null}>
							<SetupRobotPassword />
						</Suspense>
					</ErrorBoundary>
				)}
			</Box>
		</Box>
	) : null;
};
export default SetupTabs;
