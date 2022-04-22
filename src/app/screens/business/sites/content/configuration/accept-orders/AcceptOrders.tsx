import {
	Box,
	Card,
	CardContent,
	CircularProgress,
	FormControlLabel,
	Switch,
	Typography
} from '@mui/material';
import clsx from 'clsx';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppDispatch } from '../../../../../../slices';
import { SiteOrdersAccept } from '../../../../../../slices/business/sites/SiteOperations.slice';
import { SitesFetchList } from '../../../../../../slices/business/sites/Sites.slice';
import { SiteParamsInterface } from '../../../Site.interface';
import { AcceptOrdersInterface } from './AcceptOrders.interface';
import { AcceptOrdersStyle } from './AcceptOrders.style';

const AcceptOrders: FC<AcceptOrdersInterface> = (props) => {
	const { sites, siteOperations } = props;
	const { t } = useTranslation('SITES');
	const classes = AcceptOrdersStyle();

	const dispatch = useDispatch<AppDispatch>();

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;
	const cSiteId = params.siteId;
	const siteSingle = sites.content?.dataById[cSiteId];

	const translation = 'CONTENT.CONFIGURATION.ACCEPT_ORDERS';

	/**
	 * handle accept orders
	 */
	const handleAcceptOrders = () => {
		// dispatch: accept orders
		dispatch(
			SiteOrdersAccept(cSiteId, !siteSingle?.acceptOrders, () => {
				const cSite = sites.content?.dataById[cSiteId];
				if (cSite) {
					// dispatch: fetch sites
					dispatch(SitesFetchList(true));
				}
			})
		);
	};

	return (
		<Card square elevation={1}>
			<CardContent className={clsx(classes.sContent)}>
				{siteOperations.acceptOrders.loading && (
					<Box className={classes.sLoader}>
						<CircularProgress size={20} />
					</Box>
				)}

				<Box>
					<Typography variant="h6">{t(`${translation}.TITLE`)}</Typography>
					<Typography variant="body2" color="textSecondary">
						{t(`${translation}.EXCERPT`)}
					</Typography>
				</Box>

				<Box className={classes.sBox}>
					<FormControlLabel
						disabled={siteOperations.acceptOrders.loading}
						control={
							<Switch
								name="acceptOrders"
								checked={!!siteSingle?.acceptOrders}
								onChange={handleAcceptOrders}
							/>
						}
						label={t<string>(`${translation}.ACTIVE`)}
					/>
				</Box>
			</CardContent>
		</Card>
	);
};
export default AcceptOrders;
