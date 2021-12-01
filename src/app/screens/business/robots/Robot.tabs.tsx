import { Box, Tab, Tabs } from '@mui/material';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Loader from '../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../components/common/loader/Loader.enum';
import PageError from '../../../components/content/page-error/PageError';
import { AppConfigService } from '../../../services';
import { robotTwinsSummarySelector } from '../../../slices/business/robots/RobotTwinsSummary.slice';
import {
	ServicePositionsFetchList,
	servicePositionsSelector
} from '../../../slices/business/sites/configuration/ServicePositions.slice';
import { sitesSelector } from '../../../slices/business/sites/Sites.slice';
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
	const sites = useSelector(sitesSelector);
	const servicePositions = useSelector(servicePositionsSelector);
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);

	const [value, setValue] = useState(-1);
	const params = useParams() as RobotParamsInterface;
	const location = useLocation();
	const navigate = useNavigate();

	const cRobotId = params.robotId;
	const cSiteId = robotTwinsSummary.content?.dataById[cRobotId]?.siteId;
	const pSiteId = servicePositions.content?.state?.pSiteId;
	const problem =
		!!sites.errors?.id ||
		(robotTwinsSummary.content && !cSiteId) ||
		!!robotTwinsSummary.errors?.id;

	const translation = 'CONTENT.TABS';

	useEffect(() => {
		const condition1 = servicePositions.content === null;
		const condition2 = servicePositions.content !== null && cSiteId !== pSiteId;

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

	return value !== -1 ? (
		<Box>
			{/* Loader */}
			{!problem && (sites.loader || robotTwinsSummary.loader) && (
				<Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />
			)}

			{/* Error */}
			{problem && <PageError />}

			{/* Content */}
			{!problem && !!cSiteId && (
				<>
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
						{value === 0 && <RobotDetail />}

						{/* Inventory */}
						{value === 1 && <RobotInventoryList />}

						{/* Orders */}
						{value === 2 && <RobotOrdersList />}

						{/* Purchases */}
						{value === 3 && <RobotPurchasesList />}

						{/* Commands Log */}
						{value === 4 && <RobotCommandsLogList />}

						{/* Elevator Calls */}
						{value === 5 && <RobotElevatorCallsList />}

						{/* Configuration */}
						{value === 6 && <RobotConfiguration />}
					</Box>
				</>
			)}
		</Box>
	) : null;
};
export default RobotTabs;
