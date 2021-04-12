import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../components/common/loader/Loader.enum';
import PageError from '../../../../../components/content/page-error/PageError';
import {
	InventoryFetchList,
	inventorySelector
} from '../../../../../slices/inventory/Inventory.slice';
import { ProductsFetchList, productsSelector } from '../../../../../slices/products/Products.slice';
import { robotTwinsSummarySelector } from '../../../../../slices/robot-twins/RobotTwinsSummary.slice';
import { RobotParamsInterface } from '../../Robot.interface';
import RobotInventoryDrawers from './RobotInventoryDrawers';

const RobotInventory: FC = () => {
	const dispatch = useDispatch();
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);
	const products = useSelector(productsSelector);
	const inventory = useSelector(inventorySelector);

	const params: RobotParamsInterface = useParams();
	const pRobotId = inventory.content?.robot.id;
	const cRobotId = robotTwinsSummary.content?.dataById[params.id]?.robot.id;
	const cSiteId = robotTwinsSummary.content?.dataById[params.id]?.site.id;

	useEffect(() => {
		const condition1 = robotTwinsSummary.content !== null;
		const condition2 = products.content !== null;
		const condition3 = inventory.content === null;
		const condition4 = inventory.content !== null && pRobotId !== cRobotId;

		// prerequisite: products
		if (cSiteId && !condition2) {
			// dispatch: fetch products
			dispatch(ProductsFetchList(cSiteId));
		}

		// inventory
		if (cRobotId && condition1 && condition2 && (condition3 || condition4)) {
			// dispatch: fetch inventory
			dispatch(InventoryFetchList(cRobotId));
		}
	}, [
		dispatch,
		inventory.content,
		robotTwinsSummary.content,
		products.content,
		cRobotId,
		pRobotId,
		cSiteId
	]);

	// loader
	if (robotTwinsSummary.loader || products.loader || inventory.loader) {
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

	return <RobotInventoryDrawers />;
};
export default RobotInventory;
