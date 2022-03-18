import { Box, Tab, Tabs } from '@mui/material';
import { FC, Suspense, SyntheticEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import ErrorBoundary from '../../../components/frame/error-boundary/ErrorBoundary';
import { AppConfigService } from '../../../services';
import setupRoutes from './Setup.routes';
import SetupWifiConfig from './wifi-config/SetupWifiConfig';

const SetupTabs: FC = () => {
	const { t } = useTranslation('SETUP');

	const [value, setValue] = useState(-1);
	const navigate = useNavigate();
	const location = useLocation();

	const translation = 'CONTENT.TABS';

	useEffect(() => {
		const skipLastSlashes = AppConfigService.AppOptions.regex.skipLastSlashes;
		const cPath = location.pathname.replace(skipLastSlashes, '');
		const cIndex = setupRoutes.findIndex((r) => r.path === cPath);

		setValue(cIndex);
	}, [location.pathname]);

	/**
	 * handle tab change
	 * @param _event
	 * @param value
	 */
	const handleTabChange = (_event: SyntheticEvent, value: number) => {
		// prepare link
		const link = setupRoutes[value].path;

		// navigate
		navigate(link);
	};

	return value !== -1 ? (
		<Box>
			{/* Tabs */}
			<Tabs
				allowScrollButtonsMobile
				value={value}
				onChange={handleTabChange}
				variant="scrollable"
				textColor="primary">
				<Tab label={t(`${translation}.COMMON`)} />
				<Tab label={t(`${translation}.WIFI_CONFIG`)} />
			</Tabs>

			{/* Tab Panel */}
			<Box>
				{value === 0 && <></>}

				{/* Emails */}
				{value === 1 && (
					<ErrorBoundary>
						<Suspense fallback={null}>
							<SetupWifiConfig />
						</Suspense>
					</ErrorBoundary>
				)}
			</Box>
		</Box>
	) : null;
};
export default SetupTabs;
