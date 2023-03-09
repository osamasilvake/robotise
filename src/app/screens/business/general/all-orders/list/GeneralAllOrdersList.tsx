import { Box } from '@mui/material';
import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../../components/content/page-empty/PageEmpty';
import PageError from '../../../../../components/content/page-error/PageError';
import { AppConfigService } from '../../../../../services';
import { AppDispatch } from '../../../../../slices';
import {
	AllOrdersFetchList,
	allOrdersSelector
} from '../../../../../slices/business/general/all-orders/AllOrders.slice';
import GeneralAllOrdersActions from './actions/GeneralAllOrdersActions';
import { generalAllOrdersPeriod } from './actions/GeneralAllOrdersActions.list';
import { GeneralAllOrdersListPayloadInterface } from './GeneralAllOrdersList.interface';
import { GeneralAllOrdersListStyle } from './GeneralAllOrdersList.style';
import GeneralAllOrdersTable from './table/GeneralAllOrdersTable';

const GeneralAllOrdersList: FC = () => {
	const classes = GeneralAllOrdersListStyle();

	const dispatch = useDispatch<AppDispatch>();
	const allOrders = useSelector(allOrdersSelector);

	const [currentPeriod, setCurrentPeriod] = useState(
		allOrders.content?.state?.currentPeriod || generalAllOrdersPeriod[0]
	);

	const page = allOrders.content?.state?.page || 0;
	const rowsPerPage =
		allOrders.content?.state?.rowsPerPage ||
		AppConfigService.AppOptions.screens.business.general.allOrders.list.defaultPageSize;
	const siteId = allOrders.content?.state?.siteId;

	const period = currentPeriod.id;
	const includeAllOrders = !!allOrders.content?.state?.includeAllOrders;

	const pageRef = useRef({
		page: (allOrders.content?.meta?.page || 0) - 1,
		rowsPerPage,
		siteId,
		period,
		includeAllOrders
	});

	useEffect(() => {
		const payload: GeneralAllOrdersListPayloadInterface = {
			page,
			rowsPerPage,
			siteId,
			period,
			includeAllOrders
		};

		if (pageRef.current.siteId !== siteId && page === 0) {
			// dispatch: fetch all orders
			dispatch(AllOrdersFetchList(payload));

			// update ref
			pageRef.current.page = page;
			pageRef.current.siteId = siteId;
		} else if (pageRef.current.period !== period && page === 0) {
			// dispatch: fetch all orders
			dispatch(AllOrdersFetchList(payload));

			// update ref
			pageRef.current.page = page;
			pageRef.current.period = period;
		} else if (pageRef.current.includeAllOrders !== includeAllOrders && page === 0) {
			// dispatch: fetch all orders
			dispatch(AllOrdersFetchList(payload));

			// update ref
			pageRef.current.page = page;
			pageRef.current.includeAllOrders = includeAllOrders;
		} else if (pageRef.current.rowsPerPage !== rowsPerPage && page === 0) {
			// dispatch: fetch all orders
			dispatch(AllOrdersFetchList(payload));

			// update ref
			pageRef.current.page = page;
			pageRef.current.rowsPerPage = rowsPerPage;
		} else {
			const condition1 = allOrders.content === null;

			const condition2 = pageRef.current.page !== -1; // page switch back and forth
			const condition3 = page > pageRef.current.page; // detect next click

			if (condition1 || condition2) {
				if (condition3) {
					// dispatch: fetch all orders
					dispatch(AllOrdersFetchList(payload));

					// update ref
					pageRef.current.page = page;
				}
			}
		}
	}, [dispatch, allOrders.content, rowsPerPage, page, siteId, period, includeAllOrders]);

	useEffect(() => {
		const executeServices = () => {
			// dispatch: fetch all orders
			dispatch(
				AllOrdersFetchList(
					{
						page: 0,
						rowsPerPage,
						siteId,
						period,
						includeAllOrders
					},
					true
				)
			);
		};

		// interval
		const intervalId = window.setInterval(
			executeServices,
			AppConfigService.AppOptions.screens.business.general.allOrders.list.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [dispatch, page, rowsPerPage, siteId, period, includeAllOrders]);

	// loader
	if (allOrders.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (allOrders.errors) {
		return <PageError message={allOrders.errors?.text} />;
	}

	// init
	if (!allOrders.init) return null;

	// empty
	if (!allOrders.content?.data.length) {
		return (
			<Box className={classes.sBox}>
				{/* Actions */}
				<GeneralAllOrdersActions
					siteId={siteId}
					currentPeriod={currentPeriod.id}
					setCurrentPeriod={setCurrentPeriod}
					includeAllOrders={includeAllOrders}
				/>

				{/* Empty */}
				<PageEmpty message="EMPTY.MESSAGE" paddingTop />
			</Box>
		);
	}

	return (
		<Box className={classes.sBox}>
			{/* Actions */}
			<GeneralAllOrdersActions
				siteId={siteId}
				currentPeriod={currentPeriod.id}
				setCurrentPeriod={setCurrentPeriod}
				includeAllOrders={includeAllOrders}
			/>

			{/* Table */}
			<GeneralAllOrdersTable
				content={allOrders.content}
				page={page}
				rowsPerPage={rowsPerPage}
			/>
		</Box>
	);
};
export default GeneralAllOrdersList;
