import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
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
			{/* Elevator Vendor */}
			<Grid item xs={12} sm={6} lg={3}>
				<Typography variant="caption" color="textSecondary">
					{t(`${translation}.ELEVATOR_VENDOR`)}
				</Typography>
				<Typography>
					{site.elevators?.vendor || AppConfigService.AppOptions.common.none}
				</Typography>
			</Grid>

			{/* Last Updated */}
			<Grid item xs={12} sm={6} lg={4}>
				<Typography variant="caption" color="textSecondary">
					{t(`${translation}.LAST_UPDATED`)}
				</Typography>
				<Typography>{momentFormat1(site.updatedAt)}</Typography>
			</Grid>

			{/* Timezone */}
			<Grid item xs={12} sm={6} lg={2}>
				<Typography variant="caption" color="textSecondary">
					{t(`${translation}.TIMEZONE`)}
				</Typography>
				<Typography>{site.timezone}</Typography>
			</Grid>

			{/* Accept Orders */}
			<Grid item xs={12} sm={6} lg={3} className={classes.sGeneralLastItem}>
				<Typography variant="caption" color="textSecondary">
					{t(`${translation}.ACCEPT_ORDERS.LABEL`)}
				</Typography>
				<Box>
					<Status active={!!site.acceptOrders}>
						{site.acceptOrders
							? t(`${translation}.ACCEPT_ORDERS.ACTIVE`)
							: t(`${translation}.ACCEPT_ORDERS.INACTIVE`)}
					</Status>
				</Box>
			</Grid>
		</Grid>
	);
};
export default SiteDetailGeneral;
