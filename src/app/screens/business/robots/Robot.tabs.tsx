import { Box, Tab, Tabs } from '@mui/material';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
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
import RobotCommandsLogList from './content/commands-log/list/RobotCommandsLogList';
import RobotConfiguration from './content/configuration/RobotConfiguration';
import RobotDetail from './content/detail/RobotDetail';
import RobotElevatorCallsList from './content/elevator-calls/list/RobotElevatorCallsList';
import RobotInventoryList from './content/inventory/list/RobotInventoryList';
import RobotOrdersList from './content/orders/list/RobotOrdersList';
import RobotPurchasesList from './content/purchases/list/RobotPurchasesList';
import { RobotParamsInterface } from './Robot.interface';
import robotsRoutes from './Robots.routes';

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
						<RobotDetail />
					</ErrorBoundary>
				)}

				{/* Inventory */}
				{value === 1 && (
					<ErrorBoundary>
						<RobotInventoryList />
					</ErrorBoundary>
				)}

				{/* Orders */}
				{value === 2 && (
					<ErrorBoundary>
						<RobotOrdersList />
					</ErrorBoundary>
				)}

				{/* Purchases */}
				{value === 3 && (
					<ErrorBoundary>
						<RobotPurchasesList />
					</ErrorBoundary>
				)}

				{/* Commands Log */}
				{value === 4 && (
					<ErrorBoundary>
						<RobotCommandsLogList />
					</ErrorBoundary>
				)}

				{/* Elevator Calls */}
				{value === 5 && (
					<ErrorBoundary>
						<RobotElevatorCallsList />
					</ErrorBoundary>
				)}

				{/* Configuration */}
				{value === 6 && (
					<ErrorBoundary>
						<RobotConfiguration />
					</ErrorBoundary>
				)}
			</Box>
		</Box>
	) : null;
};
export default RobotTabs;
