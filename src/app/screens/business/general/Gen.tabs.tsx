import { Box, Tab, Tabs } from '@mui/material';
import { FC, Suspense, SyntheticEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import ErrorBoundary from '../../../components/frame/error-boundary/ErrorBoundary';
import { AppConfigService } from '../../../services';
import GeneralEmailsList from './emails/list/GeneralEmailsList';
import generalRoutes from './General.routes';

const GenTabs: FC = () => {
	const { t } = useTranslation('GENERAL');

	const [value, setValue] = useState(-1);
	const navigate = useNavigate();
	const location = useLocation();

	const translation = 'CONTENT.TABS';

	useEffect(() => {
		const skipLastSlashes = AppConfigService.AppOptions.regex.skipLastSlashes;
		const cPath = location.pathname.replace(skipLastSlashes, '');
		const cIndex = generalRoutes.findIndex((r) => r.path === cPath);

		setValue(cIndex);
	}, [location.pathname]);

	/**
	 * handle tab change
	 * @param _event
	 * @param value
	 */
	const handleTabChange = (_event: SyntheticEvent, value: number) => {
		// prepare link
		const link = generalRoutes[value].path;

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
				<Tab label={t(`${translation}.EMAILS`)} />
			</Tabs>

			{/* Tab Panel */}
			<Box>
				{/* Emails */}
				{value === 0 && (
					<ErrorBoundary>
						<Suspense fallback={null}>
							<GeneralEmailsList />
						</Suspense>
					</ErrorBoundary>
				)}
			</Box>
		</Box>
	) : null;
};
export default GenTabs;
