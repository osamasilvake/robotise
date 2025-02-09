import { Box, Tab, Tabs } from '@mui/material';
import { FC, lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import ErrorBoundary from '../../../../../components/frame/error-boundary/ErrorBoundary';
import { AppConfigService } from '../../../../../services';
import { sitesSelector } from '../../../../../slices/business/sites/Sites.slice';
import { strRemoveSymbols } from '../../../../../utilities/methods/String';
import { SiteParamsInterface } from '../../Site.interface';
import sitesRoutes from '../../Sites.routes';
import SiteConfigurationColdCalls from './cold-calls/SiteConfigurationColdCalls';
import DialogSiteConfigurationConfirmation from './DialogSiteConfigurationConfirmation';
import SiteConfigurationMarketingRides from './marketing-rides/SiteConfigurationMarketingRides';
import SiteConfigurationSite from './site/SiteConfigurationSite';
import {
	SiteConfigurationConfirmationTypeEnum,
	SiteConfigurationTabsTypeEnum
} from './SiteConfiguration.enum';
import { SiteConfigurationTabsInterface } from './SiteConfiguration.interface';

const SiteConfigurationCloud = lazy(() => import('./cloud/SiteConfigurationCloud'));

const SiteConfigurationTabs: FC<SiteConfigurationTabsInterface> = (props) => {
	const { sections } = props;
	const { t } = useTranslation('SITES');

	const sites = useSelector(sitesSelector);

	const [value, setValue] = useState(0);
	const [sectionName, setSectionName] = useState('');
	const [confirm, setConfirm] = useState(SiteConfigurationConfirmationTypeEnum.CLOSE);
	const [formDirty, setFormDirty] = useState(false);

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;
	const location = useLocation();
	const navigate = useNavigate();
	const tab = useRef(0);

	const cSiteId = params.siteId;
	const siteSingle = sites.content?.dataById[cSiteId];
	const problem = !!sites.errors?.id || !siteSingle?.id;

	const translation = 'CONTENT.TABS';
	const offset = 9;

	useEffect(() => {
		const skipLastSlashes = AppConfigService.AppOptions.regex.skipLastSlashes;
		const cPath = location.pathname.replace(skipLastSlashes, '');
		const slashIndex = cPath.lastIndexOf('/');
		const pathSection = cPath.substring(slashIndex + 1);

		const all = [
			{ sectionName: SiteConfigurationTabsTypeEnum.CLOUD },
			{ sectionName: SiteConfigurationTabsTypeEnum.MARKETING_RIDES },
			{ sectionName: SiteConfigurationTabsTypeEnum.COLD_CALLS },
			...sections
		];
		const index = all?.findIndex((s) => s.sectionName === pathSection);

		// set value
		setValue(index == -1 ? 0 : index);

		!sectionName && setSectionName(pathSection);
	}, [location.pathname, sections, sectionName]);

	/**
	 * handle tab change
	 * @param _event
	 * @param value
	 */
	const handleTabChange = useCallback(
		(value: number) => {
			tab.current = value;

			// confirm before leaving the route
			if (formDirty) {
				setConfirm(SiteConfigurationConfirmationTypeEnum.OPEN);
				return false;
			}

			const all = [
				{ sectionName: SiteConfigurationTabsTypeEnum.CLOUD },
				{ sectionName: SiteConfigurationTabsTypeEnum.MARKETING_RIDES },
				{ sectionName: SiteConfigurationTabsTypeEnum.COLD_CALLS },
				...sections
			];
			const updateSectionName = all[value]?.sectionName;

			// set section name
			setSectionName(updateSectionName);

			// prepare link
			const link = sitesRoutes[offset + 1].path
				.replace(':configId', updateSectionName)
				.replace(':siteId', cSiteId);

			// navigate
			navigate(link);
		},
		[cSiteId, formDirty, navigate, sections]
	);

	useEffect(() => {
		if (confirm === SiteConfigurationConfirmationTypeEnum.CONFIRM) {
			handleTabChange(tab.current);
			setConfirm(SiteConfigurationConfirmationTypeEnum.CLOSE);
		}
	}, [confirm, handleTabChange]);

	return value !== -1 && !problem ? (
		<Box>
			{/* Tabs */}
			<Tabs
				allowScrollButtonsMobile
				value={value}
				onChange={(_, val) => handleTabChange(val)}
				variant="scrollable"
				textColor="primary">
				<Tab label={t(`${translation}.CONFIGURATION.CLOUD`)} />
				<Tab label={t(`${translation}.CONFIGURATION.MARKETING_RIDES`)} />
				<Tab label={t(`${translation}.CONFIGURATION.COLD_CALLS`)} />
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
							<SiteConfigurationCloud />
						</Suspense>
					</ErrorBoundary>
				)}

				{/* Marketing Rides */}
				{value === 1 && (
					<ErrorBoundary>
						<Suspense fallback={null}>
							<SiteConfigurationMarketingRides setFormDirty={setFormDirty} />
						</Suspense>
					</ErrorBoundary>
				)}

				{/* Cold Calls */}
				{value === 2 && (
					<ErrorBoundary>
						<Suspense fallback={null}>
							<SiteConfigurationColdCalls />
						</Suspense>
					</ErrorBoundary>
				)}

				{/* Site */}
				{value >= 3 &&
					sections
						?.filter((s) => !!s?.sectionName)
						?.map(
							(section) =>
								section.sectionName === sectionName && (
									<ErrorBoundary key={section.id}>
										<Suspense fallback={null}>
											<SiteConfigurationSite section={section} />
										</Suspense>
									</ErrorBoundary>
								)
						)}
			</Box>

			{/* Dialog: Test Call Confirmation */}
			{confirm === SiteConfigurationConfirmationTypeEnum.OPEN && (
				<DialogSiteConfigurationConfirmation
					open={confirm}
					setOpen={setConfirm}
					setFormDirty={setFormDirty}
				/>
			)}
		</Box>
	) : null;
};
export default SiteConfigurationTabs;
