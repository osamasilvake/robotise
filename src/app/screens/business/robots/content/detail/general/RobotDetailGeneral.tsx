import { Edit, HelpOutline } from '@mui/icons-material';
import { Box, Grid, IconButton, Link, Stack, Tooltip, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import ReadMore from '../../../../../../components/common/read-more/ReadMore';
import Status from '../../../../../../components/common/status/Status';
import { AppConfigService } from '../../../../../../services';
import { dateFormat1 } from '../../../../../../utilities/methods/Date';
import { strRemoveSymbols } from '../../../../../../utilities/methods/String';
import { RobotDetailControlModeTypeEnum } from '../commands/RobotDetailCommands.enum';
import DialogNote from './DialogNote';
import { RobotDetailGeneralInterface } from './RobotDetailGeneral.interface';
import { RobotDetailGeneralStyle } from './RobotDetailGeneral.style';

const RobotDetailGeneral: FC<RobotDetailGeneralInterface> = (props) => {
	const { robotTwins } = props;
	const { t } = useTranslation(['ROBOTS', 'TOOLTIP']);
	const classes = RobotDetailGeneralStyle();

	const [open, setOpen] = useState(false);

	const emergencyState = !!robotTwins?.emergencyState?.properties.isInEmergencyState;
	const openDrawer = robotTwins.drawerStates?.properties.drawers?.find((f) => f.isOpen);
	const translation = 'CONTENT.DETAIL.GENERAL';

	return (
		<Grid container spacing={1}>
			{/* Site */}
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<Typography variant="caption" color="textSecondary">
					{t(`${translation}.SITE`)}
				</Typography>
				<Box>
					{robotTwins.site.title && (
						<Link
							component={RouterLink}
							variant="body1"
							underline="hover"
							to={AppConfigService.AppRoutes.SCREENS.BUSINESS.SITES.DETAIL.replace(
								':siteId',
								robotTwins.site.id
							)}>
							{robotTwins.site.title || AppConfigService.AppOptions.common.none}
						</Link>
					)}
					{!robotTwins.site.title && AppConfigService.AppOptions.common.none}
				</Box>
			</Grid>

			{/* Customer Name */}
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<Typography variant="caption" color="textSecondary">
					{t(`${translation}.CUSTOMER_NAME`)}
				</Typography>
				<Typography>
					{robotTwins.robot.customerName || AppConfigService.AppOptions.common.none}
				</Typography>
			</Grid>

			{/* CE Inventory ID */}
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<Typography variant="caption" color="textSecondary">
					{t(`${translation}.CE_INVENTORY_ID`)}
				</Typography>
				<Typography>
					{robotTwins.robot?.ceInventoryId || AppConfigService.AppOptions.common.none}
				</Typography>
			</Grid>

			{/* Username */}
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<Typography variant="caption" color="textSecondary">
					{t(`${translation}.USERNAME`)}
				</Typography>
				<Typography>
					{robotTwins.ca?.username || AppConfigService.AppOptions.common.none}
				</Typography>
			</Grid>

			{/* IP Address */}
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<Typography variant="caption" color="textSecondary">
					{t(`${translation}.IP_ADDRESS`)}
				</Typography>
				<Typography>
					{robotTwins.ca?.ip || AppConfigService.AppOptions.common.none}
				</Typography>
			</Grid>

			{/* Last Updated */}
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<Typography variant="caption" color="textSecondary">
					{t(`${translation}.LAST_UPDATED`)}
				</Typography>
				<Typography>{dateFormat1(robotTwins.updatedAt)}</Typography>
			</Grid>

			{/* Status */}
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<Typography variant="caption" color="textSecondary">
					{t(`${translation}.STATUS.LABEL`)}
				</Typography>
				<Box>
					<Status active={robotTwins.robotState.isReady.value}>
						{robotTwins.robotState.isReady.value
							? t(`${translation}.STATUS.ON`)
							: t(`${translation}.STATUS.OFF`)}
					</Status>
				</Box>
			</Grid>

			{/* Control Mode */}
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<Typography variant="caption" color="textSecondary">
					{t(`${translation}.CONTROL_MODE`)}
				</Typography>
				<Box>
					<Status
						active={
							robotTwins?.controlMode?.value ===
							RobotDetailControlModeTypeEnum.AUTONOMOUS
						}>
						{robotTwins?.controlMode?.value &&
							strRemoveSymbols(robotTwins.controlMode.value)}
					</Status>
				</Box>
			</Grid>

			{/* Accept Orders */}
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<Typography variant="caption" color="textSecondary">
					{t(`${translation}.ACCEPT_ORDERS.LABEL`)}
				</Typography>
				<Box>
					{!!robotTwins.site.title && (
						<Status active={!!robotTwins.site.acceptOrders}>
							{robotTwins.site.acceptOrders
								? t(`${translation}.ACCEPT_ORDERS.ACTIVE`)
								: t(`${translation}.ACCEPT_ORDERS.INACTIVE`)}
						</Status>
					)}
					{!robotTwins.site.title && AppConfigService.AppOptions.common.none}
				</Box>
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<Stack spacing={0.5} direction="row" alignItems="center">
					<Typography variant="caption" color="textSecondary">
						{t(`${translation}.ACCEPT_ORDERS.LABEL`)}
					</Typography>
					{robotTwins?.site && robotTwins?.site?.acceptOrdersLastModifiedAt && (
						<Tooltip
							title={
								<Box>
									<Typography variant="caption">
										{dateFormat1(robotTwins?.site?.acceptOrdersLastModifiedAt)}{' '}
										({robotTwins?.site?.acceptOrdersLastModifiedOrigin})
									</Typography>
								</Box>
							}>
							<HelpOutline fontSize="small" />
						</Tooltip>
					)}
				</Stack>
				<Box>
					<Status active={!!robotTwins.site.acceptOrders}>
						{robotTwins.site.acceptOrders
							? t(`${translation}.ACCEPT_ORDERS.ACTIVE`)
							: t(`${translation}.ACCEPT_ORDERS.INACTIVE`)}
					</Status>
				</Box>
			</Grid>

			{/* Mission */}
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<Typography variant="caption" color="textSecondary">
					{t(`${translation}.MISSION`)}
				</Typography>
				<Stack spacing={0.5} direction="row" alignItems="center">
					<Typography>
						{robotTwins.mission?.value?.status ||
							AppConfigService.AppOptions.common.none}
					</Typography>
					{robotTwins.mission?.value?.description && (
						<Tooltip title={robotTwins.mission?.value?.description}>
							<HelpOutline fontSize="small" className={classes.sGridItemInfoIcon} />
						</Tooltip>
					)}
				</Stack>
			</Grid>

			{/* Emergency State */}
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<Typography variant="caption" color="textSecondary">
					{t(`${translation}.EMERGENCY.LABEL`)}
				</Typography>
				<Box>
					<Status active={!emergencyState}>
						{emergencyState
							? t(`${translation}.EMERGENCY.ACTIVE`)
							: t(`${translation}.EMERGENCY.INACTIVE`)}
					</Status>
				</Box>
			</Grid>

			{/* Drawer States */}
			{robotTwins.drawerStates && (
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<Typography variant="caption" color="textSecondary">
						{t(`${translation}.DRAWER_STATES.LABEL`)}
					</Typography>
					<Box>
						<Typography>
							{openDrawer
								? t(`${translation}.DRAWER_STATES.OPENED`, {
										value: openDrawer.drawer
								  })
								: t(`${translation}.DRAWER_STATES.CLOSED`)}
						</Typography>
					</Box>
				</Grid>
			)}

			{/* Note */}
			<Grid item xs={12} sm={6} md={4} lg={6} className={classes.sNoteGrid}>
				<Typography variant="caption" color="textSecondary">
					{t(`${translation}.NOTE.LABEL`)}
					<Tooltip
						placement="right"
						title={t<string>('TOOLTIP:EDIT')}
						onClick={() => setOpen(true)}>
						<IconButton
							className={classes.sNoteEditIconButton}
							onClick={() => setOpen(true)}>
							<Edit color="primary" className={classes.sNoteEditIcon} />
						</IconButton>
					</Tooltip>
				</Typography>

				{/* Read More */}
				<ReadMore text={robotTwins.robot.note} />

				{/* Dialog: Note */}
				{open && <DialogNote open={open} setOpen={setOpen} note={robotTwins.robot.note} />}
			</Grid>
		</Grid>
	);
};
export default RobotDetailGeneral;
