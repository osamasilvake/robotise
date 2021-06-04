import { Box, Grid } from '@material-ui/core';
import { FC } from 'react';
import { useSelector } from 'react-redux';

import { siteSelector } from '../../../../../slices/sites/Site.slice';
import { sitesSelector } from '../../../../../slices/sites/Sites.slice';
import SiteConfigurationAcceptOrders from './accept-orders/SiteConfigurationAcceptOrders';
import { SiteConfigurationStyles } from './SiteConfiguration.style';

const SiteConfiguration: FC = () => {
	const classes = SiteConfigurationStyles();

	const sites = useSelector(sitesSelector);
	const site = useSelector(siteSelector);

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
