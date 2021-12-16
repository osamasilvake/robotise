import { Edit, InfoOutlined } from '@mui/icons-material';
import { Box, Grid, IconButton, Link, Stack, Tooltip, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import ReadMore from '../../../../../../components/common/read-more/ReadMore';
import Status from '../../../../../../components/common/status/Status';
import { AppConfigService } from '../../../../../../services';
import { momentFormat1 } from '../../../../../../utilities/methods/Moment';
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
				<Typography>{momentFormat1(robotTwins.updatedAt)}</Typography>
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
							<InfoOutlined fontSize="small" className={classes.sGridItemInfoIcon} />
						</Tooltip>
					)}
				</Stack>
			</Grid>

			{/* Note */}
			<Grid item xs={12} sm={6} md={4} lg={9} className={classes.sNoteGrid}>
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
