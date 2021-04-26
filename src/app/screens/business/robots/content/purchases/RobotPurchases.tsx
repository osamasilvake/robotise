import { Box } from '@material-ui/core';
import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../components/common/loader/Loader.enum';
import PageError from '../../../../../components/content/page-error/PageError';
import { AppConfigService } from '../../../../../services';
import {
	PurchasesFetchList,
	purchasesSelector
} from '../../../../../slices/purchases/Purchases.slice';
import { robotTwinsSummarySelector } from '../../../../../slices/robot-twins/RobotTwinsSummary.slice';
import { sitesSelector } from '../../../../../slices/sites/Sites.slice';
import { RobotParamsInterface } from '../../Robot.interface';
import RobotPurchasesActions from './list/actions/RobotPurchasesActions';
import RobotPurchasesTable from './list/table/RobotPurchasesTable';
import { RobotPurchasesStyles } from './RobotPurchases.style';

const RobotPurchases: FC = () => {
	const classes = RobotPurchasesStyles();

	const dispatch = useDispatch();
	const sites = useSelector(sitesSelector);
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);
	const purchases = useSelector(purchasesSelector);

	const [billed, setBilled] = useState(false);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(
		purchases.content && purchases.content.meta.rowsPerPage
			? purchases.content.meta.rowsPerPage
			: AppConfigService.AppOptions.screens.robots.content.orders.list.defaultPageSize
	);

	const pageRef = useRef({
		page: purchases.content ? purchases.content.meta.page - 1 : page - 1,
		rowsPerPage,
		billed
	});

	const params: RobotParamsInterface = useParams();
	const pRobotId = purchases.content?.robot?.id;
	const cRobotId = robotTwinsSummary.content?.dataById[params.robot]?.robot.id;

	useEffect(() => {
		if (pageRef.current.billed !== billed && page === 0) {
			// dispatch: fetch purchases
			cRobotId && dispatch(PurchasesFetchList(cRobotId, 1, rowsPerPage, billed));

			// update ref
			pageRef.current.page = 0;
			pageRef.current.billed = billed;
		} else if (pageRef.current.rowsPerPage !== rowsPerPage && page === 0) {
			// dispatch: fetch purchases
			cRobotId && dispatch(PurchasesFetchList(cRobotId, page + 1, rowsPerPage, billed));

			// update ref
			pageRef.current.page = page;
			pageRef.current.rowsPerPage = rowsPerPage;
		} else {
			const condition1 = robotTwinsSummary.content !== null;
			const condition2 = purchases.content === null;
			const condition3 = purchases.content !== null && pRobotId && pRobotId !== cRobotId;
			const condition4 = pageRef.current.page !== -1; // page switch back and forth
			const condition5 = page > pageRef.current.page; // detect next click

			if (condition1) {
				if (condition2 || condition3 || condition4) {
					if (condition3 || condition5) {
						// dispatch: fetch purchases
						cRobotId &&
							dispatch(PurchasesFetchList(cRobotId, page + 1, rowsPerPage, billed));

						// update ref
						pageRef.current.page = page;
					}
				}
			}
		}
	}, [
		dispatch,
		robotTwinsSummary.content,
		purchases.content,
		pRobotId,
		cRobotId,
		rowsPerPage,
		page,
		billed
	]);

	// loader
	if (sites.loader || robotTwinsSummary.loader || purchases.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (purchases.errors) {
		return <PageError message={purchases.errors.text} />;
	}

	// empty
	if (!purchases.content) {
		return null;
	}

	return (
		<Box className={classes.sBox}>
			{/* Options */}
			<RobotPurchasesActions billed={billed} setBilled={setBilled} setPage={setPage} />

			{/* Table */}
			<RobotPurchasesTable
				content={purchases.content}
				page={page}
				setPage={setPage}
				rowsPerPage={rowsPerPage}
				setRowsPerPage={setRowsPerPage}
			/>
		</Box>
	);
};
export default RobotPurchases;
