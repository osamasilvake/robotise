import { FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../components/content/page-empty/PageEmpty';
import PageError from '../../../../components/content/page-error/PageError';
import { AppConfigService } from '../../../../services';
import {
	AlertCodesFetch,
	alertCodesSelector
} from '../../../../slices/information/alert-codes/AlertCodes.slice';
import { AlertCodesListPayloadInterface } from './AlertCodesList.interface';
import AlertCodesTable from './table/AlertCodesTable';

const AlertCodesList: FC = () => {
	const dispatch = useDispatch();
	const alertCodes = useSelector(alertCodesSelector);

	const page = alertCodes.content?.state?.page || 0;
	const rowsPerPage =
		alertCodes.content?.state?.rowsPerPage ||
		AppConfigService.AppOptions.screens.information.alertCodes.list.defaultPageSize;

	const pageRef = useRef({
		page: (alertCodes.content?.meta?.page || 0) - 1,
		rowsPerPage
	});

	useEffect(() => {
		const payload: AlertCodesListPayloadInterface = {
			page,
			rowsPerPage
		};

		if (pageRef.current.rowsPerPage !== rowsPerPage && page === 0) {
			// dispatch: fetch alert codes
			dispatch(AlertCodesFetch(payload));

			// update ref
			pageRef.current.page = page;
			pageRef.current.rowsPerPage = rowsPerPage;
		} else {
			const condition2 = alertCodes.content === null;
			const condition4 = pageRef.current.page !== -1; // page switch back and forth
			const condition5 = page > pageRef.current.page; // detect next click

			if (condition2 || condition4) {
				if (condition5) {
					// dispatch: fetch alert codes
					dispatch(AlertCodesFetch(payload));

					// update ref
					pageRef.current.page = page;
				}
			}
		}
	}, [dispatch, alertCodes.content, page, rowsPerPage]);

	useEffect(() => {
		const executeServices = () => {
			if (alertCodes.content) {
				// dispatch: fetch purchases
				dispatch(
					AlertCodesFetch(
						{
							page: 0,
							rowsPerPage
						},
						true
					)
				);
			}
		};

		// interval
		const intervalId = window.setInterval(
			executeServices,
			AppConfigService.AppOptions.screens.information.alertCodes.list.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [dispatch, alertCodes.content, page, rowsPerPage]);

	// loader
	if (alertCodes.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (alertCodes.errors) {
		return <PageError message={alertCodes.errors?.text} />;
	}

	// null
	if (!alertCodes.content) {
		return null;
	}

	// empty
	if (!alertCodes.content.data.length) {
		return <PageEmpty message="EMPTY.MESSAGE" />;
	}

	return <AlertCodesTable content={alertCodes.content} page={page} rowsPerPage={rowsPerPage} />;
};
export default AlertCodesList;
