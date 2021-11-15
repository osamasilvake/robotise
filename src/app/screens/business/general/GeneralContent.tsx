import { Box, Tab, Tabs } from '@mui/material';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import GeneralEmailsList from './emails/list/GeneralEmailsList';
import generalRoutes from './General.routes';

const GeneralContent: FC = () => {
	const { t } = useTranslation('GENERAL');

	const [value, setValue] = useState(-1);
	const navigate = useNavigate();
	const location = useLocation();

	const translation = 'TABS';

	useEffect(() => {
		const cIndex = generalRoutes.findIndex((r) => r.path === location.pathname);

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
				<Tab label={t(`${translation}.COMMON`)} />
				<Tab label={t(`${translation}.EMAILS`)} />
			</Tabs>

			{/* Tab Panel */}
			<Box>
				{value === 0 && <></>}

				{/* Emails */}
				{value === 1 && <GeneralEmailsList />}
			</Box>
		</Box>
	) : null;
};
export default GeneralContent;
