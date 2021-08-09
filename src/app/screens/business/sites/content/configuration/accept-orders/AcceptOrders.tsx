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

import { SiteOrdersAccept } from '../../../../../../slices/business/sites/Site.slice';
import { SitesFetchList } from '../../../../../../slices/business/sites/Sites.slice';
import { CardStyle } from '../../../../../../utilities/styles/Card.style';
import { SiteParamsInterface } from '../../../Site.interface';
import { AcceptOrdersInterface } from './AcceptOrders.interface';
import { AcceptOrdersStyle } from './AcceptOrders.style';

const AcceptOrders: FC<AcceptOrdersInterface> = (props) => {
	const { sites, site } = props;
	const { t } = useTranslation('SITES');
	const classes = AcceptOrdersStyle();
	const cardClasses = CardStyle();

	const dispatch = useDispatch();

	const params: SiteParamsInterface = useParams();
	const siteSingle = sites.content?.dataById[params.siteId];
	const siteId = params.siteId;

	const common = 'CONTENT.CONFIGURATION.ACCEPT_ORDERS';

	/**
	 * handle accept orders
	 */
	const handleAcceptOrders = () => {
		// dispatch: accept orders
		dispatch(
			SiteOrdersAccept(siteId, !siteSingle?.acceptOrders, () => {
				const cSite = sites.content?.dataById[siteId];
				if (cSite) {
					// dispatch: fetch sites
					dispatch(SitesFetchList(true));
				}
			})
		);
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
					<Typography variant="h6">{t(`${common}.TITLE`)}</Typography>
					<Typography variant="body2" color="textSecondary">
						{t(`${common}.EXCERPT`)}
					</Typography>
				</Box>

				<Box className={classes.sBox}>
					<FormControlLabel
						disabled={site.acceptOrders.loading}
						control={
							<Switch
								name="accept-orders"
								checked={!!siteSingle?.acceptOrders}
								onChange={handleAcceptOrders}
							/>
						}
						label={t(`${common}.ACTIVE`)}
					/>
				</Box>
			</CardContent>
		</Card>
	);
};
export default AcceptOrders;
