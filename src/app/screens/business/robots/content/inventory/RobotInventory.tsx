import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../components/common/loader/Loader.enum';
import PageError from '../../../../../components/content/page-error/PageError';
import { AppConfigService } from '../../../../../services';
import {
	InventoryFetchList,
	inventorySelector
} from '../../../../../slices/inventory/Inventory.slice';
import { ProductsFetchList, productsSelector } from '../../../../../slices/products/Products.slice';
import { robotTwinsSummarySelector } from '../../../../../slices/robot-twins/RobotTwinsSummary.slice';
import { sitesSelector } from '../../../../../slices/sites/Sites.slice';
import { RobotParamsInterface } from '../../Robot.interface';
import RobotInventoryDrawers from './RobotInventoryDrawers';

const RobotInventory: FC = () => {
	const dispatch = useDispatch();
	const sites = useSelector(sitesSelector);
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);
	const products = useSelector(productsSelector);
	const inventory = useSelector(inventorySelector);

	const params: RobotParamsInterface = useParams();
	const pRobotId = inventory.content?.robot.id;
	const cRobotId = robotTwinsSummary.content?.dataById[params.robot]?.robot.id;
	const pSiteId = products.content?.site.id;
	const cSiteId = robotTwinsSummary.content?.dataById[params.robot]?.site.id;

	useEffect(() => {
		const condition1 = robotTwinsSummary.content !== null;
		const condition2 = products.content === null;
		const condition3 = products.content !== null && pSiteId && pSiteId !== cSiteId;
		const condition4 = inventory.content === null;
		const condition5 = inventory.content !== null && pRobotId && pRobotId !== cRobotId;

		// products
		if (condition2 || condition3) {
			// dispatch: fetch products
			cSiteId && dispatch(ProductsFetchList(cSiteId));
		}

		// inventory
		else if (condition1 && (condition4 || condition5)) {
			// dispatch: fetch inventory
			cRobotId && dispatch(InventoryFetchList(cRobotId));
		}
	}, [
		dispatch,
		inventory.content,
		robotTwinsSummary.content,
		products.content,
		pSiteId,
		cSiteId,
		pRobotId,
		cRobotId
	]);

	useEffect(() => {
		const executeServices = () => {
			// dispatch: fetch inventory
			cRobotId && dispatch(InventoryFetchList(cRobotId, true));
		};

		// interval
		const intervalId = window.setInterval(
			executeServices,
			AppConfigService.AppOptions.screens.robots.content.inventory.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [dispatch, cRobotId]);

	// loader
	if (sites.loader || robotTwinsSummary.loader || products.loader || inventory.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (inventory.errors) {
		return <PageError message={inventory.errors.text} />;
	}

	// empty
	if (!inventory.content) {
		return null;
	}

	return <RobotInventoryDrawers inventory={inventory} />;
};
export default RobotInventory;
