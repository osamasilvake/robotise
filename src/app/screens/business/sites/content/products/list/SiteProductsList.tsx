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
	ProductsFetchList,
	productsSelector
} from '../../../../../../slices/business/sites/products/Products.slice';
import { SiteParamsInterface } from '../../../Site.interface';
import SiteProductsActions from './actions/SiteProductsActions';
import { siteProductsListStyle } from './SiteProductsList.style';
import SiteProductsTable from './table/SiteProductsTable';

const SiteProductsList: FC = () => {
	const classes = siteProductsListStyle();

	const dispatch = useDispatch();
	const products = useSelector(productsSelector);

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;
	const pSiteId = products.content?.state?.pSiteId;
	const cSiteId = params.siteId;

	useEffect(() => {
		const condition1 = products.content === null;
		const condition2 = !!(products.content !== null && pSiteId && pSiteId !== cSiteId);

		if (condition1 || condition2) {
			// dispatch: fetch site products
			cSiteId && dispatch(ProductsFetchList(cSiteId));
		}
	}, [dispatch, products.content, pSiteId, cSiteId]);

	useEffect(() => {
		const executeServices = () => {
			if (products.content) {
				// dispatch: fetch site products
				cSiteId && dispatch(ProductsFetchList(cSiteId, true));
			}
		};

		// interval
		const intervalId = window.setInterval(
			executeServices,
			AppConfigService.AppOptions.screens.business.sites.content.products.list.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [dispatch, products.content, cSiteId]);

	// loader
	if (products.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (products.errors) {
		return <PageError message={products.errors?.text} />;
	}

	// init
	if (!products.init) return null;

	// empty
	if (!products.content?.data.length) {
		return (
			<Box className={classes.sBox}>
				{/* Actions */}
				<SiteProductsActions />

				{/* Empty */}
				<PageEmpty message="EMPTY.MESSAGE" paddingTop />
			</Box>
		);
	}

	return (
		<Box className={classes.sBox}>
			{/* Actions */}
			<SiteProductsActions />

			{/* Table */}
			<SiteProductsTable content={products.content} />
		</Box>
	);
};
export default SiteProductsList;
