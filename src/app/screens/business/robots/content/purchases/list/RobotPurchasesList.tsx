import { Box } from '@material-ui/core';
import { FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../../../components/content/page-empty/PageEmpty';
import PageError from '../../../../../../components/content/page-error/PageError';
import { AppConfigService } from '../../../../../../services';
import {
	PurchasesFetchList,
	purchasesSelector
} from '../../../../../../slices/business/robots/purchases/Purchases.slice';
import { RobotParamsInterface } from '../../../Robot.interface';
import RobotPurchasesActions from './actions/RobotPurchasesActions';
import { RobotPurchasesListPayloadInterface } from './RobotPurchasesList.interface';
import { RobotPurchasesListStyle } from './RobotPurchasesList.style';
import RobotPurchasesTable from './table/RobotPurchasesTable';

const RobotPurchasesList: FC = () => {
	const classes = RobotPurchasesListStyle();

	const dispatch = useDispatch();
	const purchases = useSelector(purchasesSelector);

	const page = purchases.content?.state?.page || 0;
	const rowsPerPage =
		purchases.content?.state?.rowsPerPage ||
		AppConfigService.AppOptions.screens.business.robots.content.purchases.list.defaultPageSize;
	const billed = !!purchases.content?.state?.billed;
	const debug = !!purchases.content?.state?.debug;

	const pageRef = useRef({
		page: (purchases.content?.meta?.page || 0) - 1,
		rowsPerPage,
		billed,
		debug
	});

	const params: RobotParamsInterface = useParams();
	const pRobotId = purchases.content?.state?.robotId;
	const cRobotId = params.robotId;

	useEffect(() => {
		const payload: RobotPurchasesListPayloadInterface = {
			robotId: cRobotId,
			page,
			rowsPerPage,
			billed,
			debug
		};

		if (pageRef.current.billed !== billed && page === 0) {
			// dispatch: fetch purchases
			dispatch(PurchasesFetchList(payload));

			// update ref
			pageRef.current.page = page;
			pageRef.current.billed = billed;
		} else if (pageRef.current.debug !== debug && page === 0) {
			// dispatch: fetch purchases
			dispatch(PurchasesFetchList(payload));

			// update ref
			pageRef.current.page = page;
			pageRef.current.debug = debug;
		} else if (pageRef.current.rowsPerPage !== rowsPerPage && page === 0) {
			// dispatch: fetch purchases
			dispatch(PurchasesFetchList(payload));

			// update ref
			pageRef.current.page = page;
			pageRef.current.rowsPerPage = rowsPerPage;
		} else {
			const condition1 = purchases.content === null;
			const condition2 = !!(purchases.content !== null && pRobotId && pRobotId !== cRobotId);

			const condition3 = pageRef.current.page !== -1; // page switch back and forth
			const condition4 = page > pageRef.current.page; // detect next click

			if (condition1 || condition2 || condition3) {
				if (condition2 || condition4) {
					// dispatch: fetch purchases
					dispatch(
						PurchasesFetchList({
							...payload,
							page: condition2 ? 0 : page,
							billed: condition2 ? false : billed,
							debug: condition2 ? false : debug
						})
					);

					// update ref
					pageRef.current.page = condition2 ? 0 : page;
					pageRef.current.billed = condition2 ? false : billed;
					pageRef.current.debug = condition2 ? false : debug;
				}
			}
		}
	}, [dispatch, purchases.content, pRobotId, cRobotId, rowsPerPage, page, billed, debug]);

	useEffect(() => {
		const executeServices = () => {
			if (purchases.content) {
				// dispatch: fetch purchases
				dispatch(
					PurchasesFetchList(
						{
							robotId: cRobotId,
							page: 0,
							rowsPerPage,
							billed,
							debug
						},
						true
					)
				);
			}
		};

		// interval
		const intervalId = window.setInterval(
			executeServices,
			AppConfigService.AppOptions.screens.business.robots.content.purchases.list.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [dispatch, purchases.content, cRobotId, page, rowsPerPage, billed, debug]);

	// loader
	if (purchases.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (purchases.errors) {
		return <PageError message={purchases.errors?.text} />;
	}

	// null
	if (!purchases.content) {
		return null;
	}

	// empty
	if (!purchases.content.data.length) {
		return (
			<Box className={classes.sBox}>
				{/* Actions */}
				<RobotPurchasesActions billed={billed} debug={debug} />

				{/* Empty */}
				<PageEmpty message="EMPTY.MESSAGE" paddingTop />
			</Box>
		);
	}

	return (
		<Box className={classes.sBox}>
			{/* Actions */}
			<RobotPurchasesActions billed={billed} debug={debug} />

			{/* Table */}
			<RobotPurchasesTable
				content={purchases.content}
				page={page}
				rowsPerPage={rowsPerPage}
			/>
		</Box>
	);
};
export default RobotPurchasesList;
