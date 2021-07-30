import { Box, Tab, Tabs } from '@material-ui/core';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import PageError from '../../../../components/content/page-error/PageError';
import { robotTwinsSummarySelector } from '../../../../slices/business/robots/RobotTwinsSummary.slice';
import {
	siteSelector,
	SiteServicePositionsFetch
} from '../../../../slices/business/sites/Site.slice';
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
	const site = useSelector(siteSelector);
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);

	const [value, setValue] = useState(-1);
	const params: RobotParamsInterface = useParams();
	const location = useLocation();
	const history = useHistory();

	const cSiteId = robotTwinsSummary.content?.dataById[params.robotId]?.siteId;
	const pSiteId = site.servicePositions.content?.site?.id;

	const common = 'CONTENT.TABS';

	useEffect(() => {
		const cIndex = robotsRoutes.findIndex(
			(r) => r.path.replace(':robotId', params.robotId) === location.pathname
		);

		setValue(cIndex - 1);
	}, [location.pathname, params.robotId]);

	useEffect(() => {
		const condition1 = site.servicePositions.content === null;
		const condition2 = site.servicePositions.content !== null && cSiteId !== pSiteId;

		if (condition1 || condition2) {
			// dispatch: fetch site service positions
			cSiteId && dispatch(SiteServicePositionsFetch(cSiteId));
		}
	}, [dispatch, pSiteId, cSiteId, site.servicePositions.content]);

	/**
	 * handle tab change
	 * @param _event
	 * @param value
	 */
	const handleTabChange = (_event: SyntheticEvent, value: number) => {
		// prepare link
		const url = robotsRoutes[value + 1].path.replace(':robotId', params.robotId);

		// push to history
		history.push(url);
	};

	return value !== -1 ? (
		<Box>
			{!!cSiteId && (
				<>
					{/* Tabs */}
					<Tabs
						value={value}
						onChange={handleTabChange}
						variant="scrollable"
						textColor="primary">
						<Tab label={t(`${common}.DETAIL`)} />
						<Tab label={t(`${common}.INVENTORY`)} />
						<Tab label={t(`${common}.ORDERS`)} />
						<Tab label={t(`${common}.PURCHASES`)} />
						<Tab label={t(`${common}.CONFIGURATION`)} />
						<Tab label={t(`${common}.LOGS`)} />
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

			{(!!sites.errors?.id ||
				(robotTwinsSummary.content && !cSiteId) ||
				!!robotTwinsSummary.errors?.id) && <PageError />}
		</Box>
	) : null;
};
export default RobotContent;
