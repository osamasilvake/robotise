import { FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../components/content/page-empty/PageEmpty';
import PageError from '../../../../components/content/page-error/PageError';
import { AppConfigService } from '../../../../services';
import {
	DeepLinksFetchList,
	deepLinksSelector
} from '../../../../slices/settings/deep-links/DeepLinks.slice';
import { DeepLinksListPayloadInterface } from './DeepLinksList.interface';
import DeepLinksTable from './table/DeepLinksTable';

const DeepLinksList: FC = () => {
	const dispatch = useDispatch();
	const deepLinks = useSelector(deepLinksSelector);

	const page = deepLinks.content?.state?.page || 0;
	const rowsPerPage =
		deepLinks.content?.state?.rowsPerPage ||
		AppConfigService.AppOptions.screens.settings.deepLinks.list.defaultPageSize;

	const pageRef = useRef({
		page: (deepLinks.content?.meta?.page || 0) - 1,
		rowsPerPage
	});

	useEffect(() => {
		const payload: DeepLinksListPayloadInterface = {
			page,
			rowsPerPage
		};

		if (pageRef.current.rowsPerPage !== rowsPerPage && page === 0) {
			// dispatch: fetch deep links
			dispatch(DeepLinksFetchList(payload));

			// update ref
			pageRef.current.page = page;
			pageRef.current.rowsPerPage = rowsPerPage;
		} else {
			const condition2 = deepLinks.content === null;
			const condition4 = pageRef.current.page !== -1; // page switch back and forth
			const condition5 = page > pageRef.current.page; // detect next click

			if (condition2 || condition4) {
				if (condition5) {
					// dispatch: fetch deep links
					dispatch(DeepLinksFetchList(payload));

					// update ref
					pageRef.current.page = page;
				}
			}
		}
	}, [dispatch, deepLinks.content, page, rowsPerPage]);

	useEffect(() => {
		const executeServices = () => {
			if (deepLinks.content) {
				// dispatch: fetch deep links
				dispatch(
					DeepLinksFetchList(
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
			AppConfigService.AppOptions.screens.settings.deepLinks.list.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [dispatch, deepLinks.content, page, rowsPerPage]);

	// loader
	if (deepLinks.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (deepLinks.errors) {
		return <PageError message={deepLinks.errors?.text} />;
	}

	// null
	if (!deepLinks.content) {
		return null;
	}

	// empty
	if (!deepLinks.content.data.length) {
		return <PageEmpty message="EMPTY.MESSAGE" />;
	}

	return <DeepLinksTable content={deepLinks.content} page={page} rowsPerPage={rowsPerPage} />;
};
export default DeepLinksList;
