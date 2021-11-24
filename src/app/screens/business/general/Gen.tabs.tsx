import { Box, Tab, Tabs } from '@mui/material';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import Loader from '../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../components/common/loader/Loader.enum';
import PageError from '../../../components/content/page-error/PageError';
import { AppConfigService } from '../../../services';
import { sitesSelector } from '../../../slices/business/sites/Sites.slice';
import GeneralEmailsList from './emails/list/GeneralEmailsList';
import generalRoutes from './General.routes';

const GenTabs: FC = () => {
	const { t } = useTranslation('GENERAL');

	const sites = useSelector(sitesSelector);

	const [value, setValue] = useState(-1);
	const navigate = useNavigate();
	const location = useLocation();

	const problem = !!sites.errors?.id;

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
			{/* Loader */}
			{!problem && sites.loader && (
				<Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />
			)}

			{/* Error */}
			{problem && <PageError />}

			{/* Content */}
			{!problem && sites.content && (
				<>
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
				</>
			)}
		</Box>
	) : null;
};
export default GenTabs;
