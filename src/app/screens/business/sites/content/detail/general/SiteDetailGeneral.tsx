import { InfoOutlined } from '@mui/icons-material';
import { Box, Grid, Stack, Tooltip, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Status from '../../../../../../components/common/status/Status';
import { AppConfigService } from '../../../../../../services';
import { robotTwinsSummarySelector } from '../../../../../../slices/business/robots/RobotTwinsSummary.slice';
import { sitesSelector } from '../../../../../../slices/business/sites/Sites.slice';
import { dateFormat1 } from '../../../../../../utilities/methods/Date';
import { SiteDetailGeneralInterface } from './SiteDetailGeneral.interface';
import { SiteDetailGeneralStyle } from './SiteDetailGeneral.style';

const SiteDetailGeneral: FC<SiteDetailGeneralInterface> = (props) => {
	const { site } = props;
	const { t } = useTranslation('SITES');
	const classes = SiteDetailGeneralStyle();

	const sites = useSelector(sitesSelector);
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);

	const cSiteRobot = sites.content?.dataById[site.id].robots[0];
	const attachedRobot = robotTwinsSummary.content?.dataById[cSiteRobot?.id || ''];
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
				<Typography>{dateFormat1(site.updatedAt)}</Typography>
			</Grid>

			{/* Accept Orders */}
			<Grid item xs={12} sm={6} lg={3}>
				<Stack spacing={0.5} direction="row" alignItems="center">
					<Typography variant="caption" color="textSecondary">
						{t(`${translation}.ACCEPT_ORDERS.LABEL`)}
					</Typography>
					{site && site.acceptOrdersLastModifiedAt && (
						<Tooltip
							title={
								<Box>
									<Typography variant="caption">
										{dateFormat1(site.acceptOrdersLastModifiedAt)} (
										{site.acceptOrdersLastModifiedOrigin})
									</Typography>
								</Box>
							}>
							<InfoOutlined fontSize="small" />
						</Tooltip>
					)}
				</Stack>
				<Box>
					<Status active={!!site.acceptOrders}>
						{site.acceptOrders
							? t(`${translation}.ACCEPT_ORDERS.ACTIVE`)
							: t(`${translation}.ACCEPT_ORDERS.INACTIVE`)}
					</Status>
				</Box>
			</Grid>

			{/* Default Robot */}
			<Grid item xs={12} sm={6} lg={2} className={classes.sGeneralLastItem}>
				<Typography variant="caption" color="textSecondary">
					{t(`${translation}.DEFAULT_ROBOT`)}
				</Typography>
				<Typography>
					{attachedRobot?.robotTitle || AppConfigService.AppOptions.common.none}
				</Typography>
			</Grid>

			{/* Timezone */}
			<Grid item xs={12} sm={6} lg={2}>
				<Typography variant="caption" color="textSecondary">
					{t(`${translation}.TIMEZONE`)}
				</Typography>
				<Typography>{site.timezone}</Typography>
			</Grid>
		</Grid>
	);
};
export default SiteDetailGeneral;
