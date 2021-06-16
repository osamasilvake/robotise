import { Box, Grid } from '@material-ui/core';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../../components/content/page-empty/PageEmpty';
import PageError from '../../../../../components/content/page-error/PageError';
import { siteSelector } from '../../../../../slices/sites/Site.slice';
import { sitesSelector } from '../../../../../slices/sites/Sites.slice';
import { SiteParamsInterface } from '../../Site.interface';
import SiteConfigurationAcceptOrders from './accept-orders/SiteConfigurationAcceptOrders';
import { SiteConfigurationStyle } from './SiteConfiguration.style';

const SiteConfiguration: FC = () => {
	const classes = SiteConfigurationStyle();

	const sites = useSelector(sitesSelector);
	const site = useSelector(siteSelector);

	const params: SiteParamsInterface = useParams();
	const siteSingle = sites.content?.dataById[params.site];

	// loader
	if (sites.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (sites.errors) {
		return <PageError message={sites.errors.text} />;
	}

	// null
	if (!sites?.content) {
		return null;
	}

	// empty
	if (!siteSingle?.id) {
		return <PageEmpty message="EMPTY.MESSAGE" />;
	}

	return (
		<Box className={classes.sBox}>
			<Grid container>
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<SiteConfigurationAcceptOrders sites={sites} site={site} />
				</Grid>
			</Grid>
		</Box>
	);
};
export default SiteConfiguration;
