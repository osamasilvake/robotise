import {
	Box,
	Card,
	CardContent,
	CircularProgress,
	FormControlLabel,
	Switch,
	Typography
} from '@material-ui/core';
import clsx from 'clsx';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { SiteAcceptOrders } from '../../../../../../slices/sites/Site.slice';
import { SiteUpdate } from '../../../../../../slices/sites/Sites.slice';
import { CardStyles } from '../../../../../../utilities/styles/Card.style';
import { SiteParamsInterface } from '../../../Site.interface';
import { SiteConfigurationAcceptOrdersInterface } from './SiteConfigurationAcceptOrders.interface';
import { SiteConfigurationAcceptOrdersStyles } from './SiteConfigurationAcceptOrders.style';

const SiteConfigurationAcceptOrders: FC<SiteConfigurationAcceptOrdersInterface> = (props) => {
	const { sites, site } = props;
	const { t } = useTranslation('SITES');
	const classes = SiteConfigurationAcceptOrdersStyles();
	const cardClasses = CardStyles();

	const dispatch = useDispatch();

	const params: SiteParamsInterface = useParams();
	const siteContent = sites.content?.dataById[params.site];
	const siteId = params.site;

	/**
	 * handle accept orders
	 */
	const handleAcceptOrders = () => {
		Promise.all([dispatch(SiteAcceptOrders(siteId, !siteContent?.acceptOrders))]).then(() => {
			const cSite = sites.content?.dataById[siteId];
			if (cSite) {
				// dispatch: update site
				dispatch(
					SiteUpdate({
						...cSite,
						acceptOrders: !siteContent?.acceptOrders
					})
				);
			}
		});
	};

	return (
		<Card square elevation={1}>
			<CardContent className={clsx(cardClasses.sCardContent1, classes.sContent)}>
				{site.acceptOrders.loading && (
					<Box className={classes.sLoader}>
						<CircularProgress size={20} />
					</Box>
				)}

				<Box>
					<Typography variant="h6">
						{t('CONTENT.CONFIGURATION.ACCEPT_ORDERS.TITLE')}
					</Typography>
					<Typography variant="body2" color="textSecondary">
						{t('CONTENT.CONFIGURATION.ACCEPT_ORDERS.EXCERPT')}
					</Typography>
				</Box>

				<Box className={classes.sBox}>
					<FormControlLabel
						disabled={site.acceptOrders.loading}
						control={
							<Switch
								name="accept-orders"
								checked={!!siteContent?.acceptOrders}
								onChange={handleAcceptOrders}
							/>
						}
						label={t('CONTENT.CONFIGURATION.ACCEPT_ORDERS.ACTIVE')}
					/>
				</Box>
			</CardContent>
		</Card>
	);
};
export default SiteConfigurationAcceptOrders;
