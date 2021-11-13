import { Edit, InfoOutlined } from '@mui/icons-material';
import { Grid, IconButton, Link, Stack, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link as RouterLink, useParams } from 'react-router-dom';

import ExternalLink from '../../../../../../components/common/external-link/ExternalLink';
import ReadMore from '../../../../../../components/common/read-more/ReadMore';
import Status from '../../../../../../components/common/status/Status';
import { AppConfigService } from '../../../../../../services';
import {
	RobotAuditLogsLinkFetch,
	robotSelector
} from '../../../../../../slices/business/robots/Robot.slice';
import { momentFormat1 } from '../../../../../../utilities/methods/Moment';
import { strRemoveSymbols } from '../../../../../../utilities/methods/String';
import { RobotParamsInterface } from '../../../Robot.interface';
import { RobotDetailControlModeTypeEnum } from '../commands/RobotDetailCommands.enum';
import DialogNote from './DialogNote';
import { RobotDetailGeneralInterface } from './RobotDetailGeneral.interface';
import { RobotDetailGeneralStyle } from './RobotDetailGeneral.style';

const RobotDetailGeneral: FC<RobotDetailGeneralInterface> = (props) => {
	const { robotTwins } = props;
	const { t } = useTranslation(['ROBOTS', 'TOOLTIPS']);
	const classes = RobotDetailGeneralStyle();

	const robot = useSelector(robotSelector);

	const [open, setOpen] = useState(false);

	const params = useParams() as RobotParamsInterface;

	const cRobotId = params.robotId;
	const translation = 'CONTENT.DETAIL.GENERAL';

	return (
		<Grid container spacing={1}>
			{/* Site */}
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<Typography variant="caption" color="textSecondary">
					{t(`${translation}.SITE`)}
				</Typography>
				<Box>
					<Link
						component={RouterLink}
						variant="body1"
						underline="hover"
						to={AppConfigService.AppRoutes.SCREENS.BUSINESS.SITES.DETAIL.replace(
							':siteId',
							robotTwins.site.id
						)}>
						{robotTwins.site.title}
					</Link>
				</Box>
			</Grid>

			{/* Last Updated */}
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<Typography variant="caption" color="textSecondary">
					{t(`${translation}.LAST_UPDATED`)}
				</Typography>
				<Typography>{momentFormat1(robotTwins.updatedAt)}</Typography>
			</Grid>

			{/* Status */}
			<Grid item xs={12} sm={6} md={4} lg={2}>
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
			<Grid item xs={12} sm={6} md={4} lg={2}>
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
			<Grid item xs={12} sm={6} md={4} lg={2} className={classes.sGridLastRowItem}>
				<Typography variant="caption" color="textSecondary">
					{t(`${translation}.ACCEPT_ORDERS.LABEL`)}
				</Typography>
				<Box>
					<Status active={!!robotTwins.site.acceptOrders}>
						{robotTwins.site.acceptOrders
							? t(`${translation}.ACCEPT_ORDERS.ACTIVE`)
							: t(`${translation}.ACCEPT_ORDERS.INACTIVE`)}
					</Status>
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

			{/* Mission */}
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<Typography variant="caption" color="textSecondary">
					{t(`${translation}.MISSION`)}
				</Typography>
				<Stack spacing={0.5} direction="row" alignItems="center">
					<Typography>
						{robotTwins.mission.status || AppConfigService.AppOptions.common.none}
					</Typography>
					{robotTwins.mission.description && (
						<Tooltip title={robotTwins.mission.description}>
							<InfoOutlined fontSize="small" className={classes.sGridItemInfoIcon} />
						</Tooltip>
					)}
				</Stack>
			</Grid>

			{/* Note */}
			<Grid item xs={12} sm={6} md={8} lg={6} className={classes.sNoteGrid}>
				<Typography variant="caption" color="textSecondary">
					{t(`${translation}.NOTE.LABEL`)}
					<Tooltip
						placement="right"
						title={t<string>('TOOLTIPS:EDIT')}
						onClick={() => setOpen(true)}>
						<IconButton
							className={classes.sNoteEditIconButton}
							onClick={() => setOpen(true)}>
							<Edit color="primary" className={classes.sNoteEditIcon} />
						</IconButton>
					</Tooltip>
				</Typography>
				<ReadMore text={robotTwins.robot.note} />
				{open && <DialogNote open={open} setOpen={setOpen} note={robotTwins.robot.note} />}
			</Grid>

			{/* Deep Link: Audit Logs */}
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<Typography variant="caption" color="textSecondary">
					{t(`${translation}.AUDIT_LOGS.LABEL`)}
				</Typography>
				<Box>
					<ExternalLink
						text={t(`${translation}.AUDIT_LOGS.TEXT`)}
						payload={{
							robotId: cRobotId,
							from: 'now-7d',
							to: 'now'
						}}
						FetchExternalLink={RobotAuditLogsLinkFetch}
						showIcon={robot.auditLogs.loading}
						disabled={robot.auditLogs.loading}
					/>
				</Box>
			</Grid>
		</Grid>
	);
};
export default RobotDetailGeneral;
