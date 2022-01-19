import { Box, Tab, Tabs } from '@mui/material';
import { FC, lazy, Suspense, SyntheticEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Loader from '../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../components/common/loader/Loader.enum';
import PageError from '../../../components/content/page-error/PageError';
import ErrorBoundary from '../../../components/frame/error-boundary/ErrorBoundary';
import { AppConfigService } from '../../../services';
import { robotTwinsSummarySelector } from '../../../slices/business/robots/RobotTwinsSummary.slice';
import {
	ServicePositionsFetchList,
	servicePositionsSelector
} from '../../../slices/business/sites/configuration/ServicePositions.slice';
import { RobotParamsInterface } from './Robot.interface';
import robotsRoutes from './Robots.routes';

const RobotDetail = lazy(() => import('./content/detail/RobotDetail'));
const RobotInventoryList = lazy(() => import('./content/inventory/list/RobotInventoryList'));
const RobotOrdersList = lazy(() => import('./content/orders/list/RobotOrdersList'));
const RobotPurchasesList = lazy(() => import('./content/purchases/list/RobotPurchasesList'));
const RobotCommandsLogList = lazy(() => import('./content/commands-log/list/RobotCommandsLogList'));
const RobotElevatorCallsList = lazy(
	() => import('./content/elevator-calls/list/RobotElevatorCallsList')
);
const RobotConfiguration = lazy(() => import('./content/configuration/RobotConfiguration'));

const RobotTabs: FC = () => {
	const { t } = useTranslation('ROBOTS');

	const dispatch = useDispatch();
	const servicePositions = useSelector(servicePositionsSelector);
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);

	const [value, setValue] = useState(-1);
	const params = useParams<keyof RobotParamsInterface>() as RobotParamsInterface;
	const location = useLocation();
	const navigate = useNavigate();

	const cRobotId = params.robotId;
	const cSiteId = robotTwinsSummary.content?.dataById[cRobotId]?.siteId;
	const pSiteId = servicePositions.content?.state?.pSiteId;
	const robotSingle = robotTwinsSummary.content?.dataById[cRobotId];
	const problem = !!robotTwinsSummary.errors?.id || !robotSingle?.id;

	const translation = 'CONTENT.TABS';

	useEffect(() => {
		const condition1 = servicePositions.content === null;
		const condition2 = servicePositions.content !== null && pSiteId && pSiteId !== cSiteId;

		if (condition1 || condition2) {
			// dispatch: fetch site service positions
			cSiteId && dispatch(ServicePositionsFetchList(cSiteId, true));
		}
	}, [dispatch, pSiteId, cSiteId, servicePositions.content]);

	useEffect(() => {
		const skipLastSlashes = AppConfigService.AppOptions.regex.skipLastSlashes;
		const cPath = location.pathname.replace(skipLastSlashes, '');
		const cIndex = robotsRoutes.findIndex(
			(r) => r.path.replace(':robotId', cRobotId) === cPath
		);

		setValue(cIndex - 1);
	}, [location.pathname, cRobotId]);

	/**
	 * handle tab change
	 * @param _event
	 * @param value
	 */
	const handleTabChange = (_event: SyntheticEvent, value: number) => {
		// prepare link
		const link = robotsRoutes[value + 1].path.replace(':robotId', cRobotId);

		// navigate
		navigate(link);
	};

	// Loader & Error
	if (robotTwinsSummary.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	} else if (problem) {
		return <PageError />;
	}

	return value !== -1 && !problem ? (
		<Box>
			{/* Tabs */}
			<Tabs
				allowScrollButtonsMobile
				value={value}
				onChange={handleTabChange}
				variant="scrollable"
				textColor="primary">
				<Tab label={t(`${translation}.DETAIL`)} />
				<Tab label={t(`${translation}.INVENTORY`)} />
				<Tab label={t(`${translation}.ORDERS`)} />
				<Tab label={t(`${translation}.PURCHASES`)} />
				<Tab label={t(`${translation}.COMMANDS_LOGS`)} />
				<Tab label={t(`${translation}.ELEVATOR_CALLS`)} />
				<Tab label={t(`${translation}.CONFIGURATION`)} />
			</Tabs>

			{/* Tab Panel */}
			<Box>
				{/* Detail */}
				{value === 0 && (
					<ErrorBoundary>
						<Suspense fallback={null}>
							<RobotDetail />
						</Suspense>
					</ErrorBoundary>
				)}

				{/* Inventory */}
				{value === 1 && (
					<ErrorBoundary>
						<Suspense fallback={null}>
							<RobotInventoryList />
						</Suspense>
					</ErrorBoundary>
				)}

				{/* Orders */}
				{value === 2 && (
					<ErrorBoundary>
						<Suspense fallback={null}>
							<RobotOrdersList />
						</Suspense>
					</ErrorBoundary>
				)}

				{/* Purchases */}
				{value === 3 && (
					<ErrorBoundary>
						<Suspense fallback={null}>
							<RobotPurchasesList />
						</Suspense>
					</ErrorBoundary>
				)}

				{/* Commands Log */}
				{value === 4 && (
					<ErrorBoundary>
						<Suspense fallback={null}>
							<RobotCommandsLogList />
						</Suspense>
					</ErrorBoundary>
				)}

				{/* Elevator Calls */}
				{value === 5 && (
					<ErrorBoundary>
						<Suspense fallback={null}>
							<RobotElevatorCallsList />
						</Suspense>
					</ErrorBoundary>
				)}

				{/* Configuration */}
				{value === 6 && (
					<ErrorBoundary>
						<Suspense fallback={null}>
							<RobotConfiguration />
						</Suspense>
					</ErrorBoundary>
				)}
			</Box>
		</Box>
	) : null;
};
export default RobotTabs;
