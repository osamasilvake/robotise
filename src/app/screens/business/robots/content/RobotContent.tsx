import { Box, Tab, Tabs } from '@material-ui/core';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import Loader from '../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../components/common/loader/Loader.enum';
import PageError from '../../../../components/content/page-error/PageError';
import { robotTwinsSummarySelector } from '../../../../slices/business/robots/RobotTwinsSummary.slice';
import {
	ServicePositionsFetch,
	servicePositionsSelector
} from '../../../../slices/business/sites/configuration/ServicePositions.slice';
import { sitesSelector } from '../../../../slices/business/sites/Sites.slice';
import { RobotParamsInterface } from '../Robot.interface';
import robotsRoutes from '../Robots.routes';
import RobotConfiguration from './configuration/RobotConfiguration';
import RobotDetail from './detail/RobotDetail';
import RobotInventoryList from './inventory/list/RobotInventoryList';
import RobotLogsList from './logs/list/RobotLogsList';
import RobotOrdersList from './orders/list/RobotOrdersList';
import RobotPurchasesList from './purchases/list/RobotPurchasesList';

const RobotContent: FC = () => {
	const { t } = useTranslation('ROBOTS');

	const dispatch = useDispatch();
	const sites = useSelector(sitesSelector);
	const servicePositions = useSelector(servicePositionsSelector);
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);

	const [value, setValue] = useState(-1);
	const params: RobotParamsInterface = useParams();
	const location = useLocation();
	const history = useHistory();

	const cRobotId = params.robotId;
	const cSiteId = robotTwinsSummary.content?.dataById[cRobotId]?.siteId;
	const pSiteId = servicePositions.content?.site?.id;
	const problem =
		!!sites.errors?.id ||
		(robotTwinsSummary.content && !cSiteId) ||
		!!robotTwinsSummary.errors?.id;

	const translation = 'CONTENT.TABS';

	useEffect(() => {
		const cIndex = robotsRoutes.findIndex(
			(r) => r.path.replace(':robotId', cRobotId) === location.pathname
		);

		setValue(cIndex - 1);
	}, [location.pathname, cRobotId]);

	useEffect(() => {
		const condition1 = servicePositions.content === null;
		const condition2 = servicePositions.content !== null && cSiteId !== pSiteId;

		if (condition1 || condition2) {
			// dispatch: fetch service positions
			cSiteId && dispatch(ServicePositionsFetch(cSiteId, true));
		}
	}, [dispatch, pSiteId, cSiteId, servicePositions.content]);

	/**
	 * handle tab change
	 * @param _event
	 * @param value
	 */
	const handleTabChange = (_event: SyntheticEvent, value: number) => {
		// prepare link
		const url = robotsRoutes[value + 1].path.replace(':robotId', cRobotId);

		// push to history
		history.push(url);
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
						value={value}
						onChange={handleTabChange}
						variant="scrollable"
						textColor="primary">
						<Tab label={t(`${translation}.DETAIL`)} />
						<Tab label={t(`${translation}.INVENTORY`)} />
						<Tab label={t(`${translation}.ORDERS`)} />
						<Tab label={t(`${translation}.PURCHASES`)} />
						<Tab label={t(`${translation}.CONFIGURATION`)} />
						<Tab label={t(`${translation}.LOGS`)} />
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

						{/* Configuration */}
						{value === 4 && <RobotConfiguration />}

						{/* Logs */}
						{value === 5 && <RobotLogsList />}
					</Box>
				</>
			)}
		</Box>
	) : null;
};
export default RobotContent;
