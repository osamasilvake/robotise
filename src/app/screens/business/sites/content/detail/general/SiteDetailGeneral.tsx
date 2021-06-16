import { Grid, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Status from '../../../../../../components/common/status/Status';
import { momentFormat1 } from '../../../../../../utilities/methods/Moment';
import { SiteDetailGeneralInterface } from './SiteDetailGeneral.interface';
import { SiteDetailGeneralStyle } from './SiteDetailGeneral.style';

const SiteDetailGeneral: FC<SiteDetailGeneralInterface> = (props) => {
	const { site } = props;
	const { t } = useTranslation('SITES');
	const classes = SiteDetailGeneralStyle();

	return (
		<Grid container spacing={1}>
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<Typography variant="caption" color="textSecondary">
					{t('CONTENT.DETAIL.GENERAL.SITE')}
				</Typography>
				<Typography variant="body1">{site.title}</Typography>
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={2}>
				<Typography variant="caption" color="textSecondary">
					{t('CONTENT.DETAIL.GENERAL.VENDOR')}
				</Typography>
				<Typography variant="body1">
					{site.elevators?.vendor || t('CONTENT.DETAIL.GENERAL.UNKNOWN')}
				</Typography>
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<Typography variant="caption" color="textSecondary">
					{t('CONTENT.DETAIL.GENERAL.LAST_UPDATED')}
				</Typography>
				<Typography variant="body1">{momentFormat1(site.updatedAt)}</Typography>
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={2}>
				<Typography variant="caption" color="textSecondary">
					{t('CONTENT.DETAIL.GENERAL.TIMEZONE')}
				</Typography>
				<Typography variant="body1">{site.timezone}</Typography>
			</Grid>

			<Grid item xs={12} sm={6} md={8} lg={2} className={classes.sGeneralLastItem}>
				<Typography
					variant="caption"
					color="textSecondary"
					className={classes.sGeneralLastItemLabel}>
					{t('CONTENT.DETAIL.GENERAL.ACCEPT_ORDERS.LABEL')}
				</Typography>
				<Status active={!!site.acceptOrders}>
					{site.acceptOrders
						? t('CONTENT.DETAIL.GENERAL.ACCEPT_ORDERS.ACTIVE')
						: t('CONTENT.DETAIL.GENERAL.ACCEPT_ORDERS.INACTIVE')}
				</Status>
			</Grid>
		</Grid>
	);
};
export default SiteDetailGeneral;
