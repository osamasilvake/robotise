import { Box } from '@mui/material';
import { FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../components/content/page-empty/PageEmpty';
import PageError from '../../../../components/content/page-error/PageError';
import { AppConfigService } from '../../../../services';
import {
	MiddlewareConfigFetchList,
	middlewareConfigSelector
} from '../../../../slices/settings/middleware-config/MiddlewareConfig.slice';
import { MiddlewareConfigListPayloadInterface } from './MiddlewareConfigList.interface';
import MiddlewareConfigTable from './table/MiddlewareConfigTable';

const MiddlewareConfigList: FC = () => {
	const dispatch = useDispatch();
	const middlewareConfig = useSelector(middlewareConfigSelector);

	const page = middlewareConfig.content?.state?.page || 0;
	const rowsPerPage =
		middlewareConfig.content?.state?.rowsPerPage ||
		AppConfigService.AppOptions.screens.settings.middlewareConfig.list.defaultPageSize;

	const pageRef = useRef({
		page: (middlewareConfig.content?.meta?.page || 0) - 1,
		rowsPerPage
	});

	useEffect(() => {
		const payload: MiddlewareConfigListPayloadInterface = {
			page,
			rowsPerPage
		};

		if (pageRef.current.rowsPerPage !== rowsPerPage && page === 0) {
			// dispatch: fetch middleware config
			dispatch(MiddlewareConfigFetchList(payload));

			// update ref
			pageRef.current.page = page;
			pageRef.current.rowsPerPage = rowsPerPage;
		} else {
			const condition2 = middlewareConfig.content === null;
			const condition4 = pageRef.current.page !== -1; // page switch back and forth
			const condition5 = page > pageRef.current.page; // detect next click

			if (condition2 || condition4) {
				if (condition5) {
					// dispatch: fetch middleware config
					dispatch(MiddlewareConfigFetchList(payload));

					// update ref
					pageRef.current.page = page;
				}
			}
		}
	}, [dispatch, middlewareConfig.content, page, rowsPerPage]);

	useEffect(() => {
		const executeServices = () => {
			if (middlewareConfig.content) {
				// dispatch: fetch middleware config
				dispatch(
					MiddlewareConfigFetchList(
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
			AppConfigService.AppOptions.screens.settings.middlewareConfig.list.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [dispatch, middlewareConfig.content, page, rowsPerPage]);

	// loader
	if (middlewareConfig.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (middlewareConfig.errors) {
		return <PageError message={middlewareConfig.errors?.text} />;
	}

	// init
	if (!middlewareConfig.init) return null;

	// empty
	if (!middlewareConfig.content?.data.length) {
		return <PageEmpty message="EMPTY.MESSAGE" />;
	}

	return (
		<Box>
			{/* Table */}
			<MiddlewareConfigTable
				content={middlewareConfig.content}
				page={page}
				rowsPerPage={rowsPerPage}
			/>
		</Box>
	);
};
export default MiddlewareConfigList;
