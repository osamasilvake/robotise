import { Grid, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Status from '../../../../../../components/common/status/Status';
import { AppConfigService } from '../../../../../../services';
import { momentFormat1 } from '../../../../../../utilities/methods/Moment';
import { SiteDetailGeneralInterface } from './SiteDetailGeneral.interface';
import { SiteDetailGeneralStyle } from './SiteDetailGeneral.style';

const SiteDetailGeneral: FC<SiteDetailGeneralInterface> = (props) => {
	const { site } = props;
	const { t } = useTranslation('SITES');
	const classes = SiteDetailGeneralStyle();

	const translation = 'CONTENT.DETAIL.GENERAL';

	return (
		<Grid container spacing={1}>
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<Typography variant="caption" color="textSecondary">
					{t(`${translation}.SITE`)}
				</Typography>
				<Typography>{site.title}</Typography>
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={2}>
				<Typography variant="caption" color="textSecondary">
					{t(`${translation}.VENDOR`)}
				</Typography>
				<Typography>
					{site.elevators?.vendor || AppConfigService.AppOptions.common.none}
				</Typography>
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<Typography variant="caption" color="textSecondary">
					{t(`${translation}.LAST_UPDATED`)}
				</Typography>
				<Typography>{momentFormat1(site.updatedAt)}</Typography>
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={2}>
				<Typography variant="caption" color="textSecondary">
					{t(`${translation}.TIMEZONE`)}
				</Typography>
				<Typography>{site.timezone}</Typography>
			</Grid>
			<Grid item xs={12} sm={6} md={8} lg={2} className={classes.sGeneralLastItem}>
				<Typography
					variant="caption"
					color="textSecondary"
					className={classes.sGeneralItemBlock}>
					{t(`${translation}.ACCEPT_ORDERS.LABEL`)}
				</Typography>
				<Status active={!!site.acceptOrders}>
					{site.acceptOrders
						? t(`${translation}.ACCEPT_ORDERS.ACTIVE`)
						: t(`${translation}.ACCEPT_ORDERS.INACTIVE`)}
				</Status>
			</Grid>
		</Grid>
	);
};
export default SiteDetailGeneral;
