import { Box } from '@mui/material';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../../../components/content/page-empty/PageEmpty';
import PageError from '../../../../../../components/content/page-error/PageError';
import { AppConfigService } from '../../../../../../services';
import {
	InventoryFetchList,
	inventorySelector
} from '../../../../../../slices/business/robots/inventory/Inventory.slice';
import { robotTwinsSummarySelector } from '../../../../../../slices/business/robots/RobotTwinsSummary.slice';
import {
	ProductsFetchList,
	productsSelector
} from '../../../../../../slices/business/sites/products/Products.slice';
import { RobotParamsInterface } from '../../../Robot.interface';
import RobotInventoryHead from './head/RobotInventoryHead';
import { RobotInventoryListStyle } from './RobotInventoryList.style';
import RobotInventoryTable from './table/RobotInventoryTable';

const RobotInventoryList: FC = () => {
	const classes = RobotInventoryListStyle();

	const dispatch = useDispatch();
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);
	const products = useSelector(productsSelector);
	const inventory = useSelector(inventorySelector);

	const params = useParams<keyof RobotParamsInterface>() as RobotParamsInterface;
	const pRobotId = inventory.content?.robot.id;
	const cRobotId = params.robotId;
	const pSiteId = products.content?.state?.pSiteId;
	const cSiteId = robotTwinsSummary.content?.dataById[cRobotId]?.siteId;

	useEffect(() => {
		const condition1 = products.content === null;
		const condition2 = products.content !== null && pSiteId && pSiteId !== cSiteId;
		const condition3 = inventory.content === null;
		const condition4 = inventory.content !== null && pRobotId && pRobotId !== cRobotId;

		// products
		if (condition1 || condition2) {
			// dispatch: fetch site products
			cSiteId && dispatch(ProductsFetchList(cSiteId));
		}

		// inventory
		else if (condition3 || condition4) {
			// dispatch: fetch robot inventory
			cRobotId && dispatch(InventoryFetchList(cRobotId));
		}
	}, [dispatch, products.content, inventory.content, pSiteId, cSiteId, pRobotId, cRobotId]);

	useEffect(() => {
		const executeServices = () => {
			if (inventory.content && cRobotId) {
				// dispatch: fetch robot inventory
				dispatch(InventoryFetchList(cRobotId, true));
			}
		};

		// interval
		const intervalId = window.setInterval(
			executeServices,
			AppConfigService.AppOptions.screens.business.robots.content.inventory.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [dispatch, inventory.content, cRobotId]);

	// loader
	if (products.loader || inventory.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (products.errors || inventory.errors) {
		return <PageError message={products.errors?.text || inventory.errors?.text} />;
	}

	// null
	if (!inventory.content) {
		return null;
	}

	// empty
	if (!inventory.content.drawers.length) {
		return <PageEmpty message="EMPTY.MESSAGE" />;
	}

	return (
		<Box className={classes.sBox}>
			{inventory.content.drawers.map((drawer) => (
				<Box key={drawer.index}>
					{/* Head */}
					<RobotInventoryHead drawer={drawer} />

					{/* Table */}
					<RobotInventoryTable
						drawer={drawer}
						isLastDrawer={(inventory.content?.drawers.length || 0) - 1 === drawer.index}
					/>
				</Box>
			))}
		</Box>
	);
};
export default RobotInventoryList;
