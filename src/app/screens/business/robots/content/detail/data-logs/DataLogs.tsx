import { Box, Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ExternalLink from '../../../../../../components/common/external-link/ExternalLink';
import { robotTwinsSummarySelector } from '../../../../../../slices/business/robots/RobotTwinsSummary.slice';
import {
	DeepLinkAuditLogsLinkFetch,
	DeepLinkBatteryLinkFetch,
	DeepLinkDiagnosticsLogsLinkFetch,
	deepLinkSelector,
	DeepLinkTemperatureLinkFetch
} from '../../../../../../slices/settings/deep-links/DeepLink.slice';
import { RobotParamsInterface } from '../../../Robot.interface';
import { RobotDetailDataLogsStyle } from './DataLogs.style';

const RobotDetailDataLogs: FC = () => {
	const { t } = useTranslation('ROBOTS');
	const classes = RobotDetailDataLogsStyle();

	const deepLink = useSelector(deepLinkSelector);
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);

	const params = useParams() as RobotParamsInterface;

	const cRobotId = params.robotId;
	const cSiteId = robotTwinsSummary.content?.dataById[cRobotId]?.siteId;
	const translation = 'CONTENT.DETAIL.DATA_LOGS';

	return (
		<Box className={classes.sStateContainer}>
			{/* Title */}
			<Typography variant="h6" color="textSecondary">
				{t('CONTENT.DETAIL.DATA_LOGS.TITLE')}
			</Typography>

			<Grid container spacing={1}>
				{/* Deep Link: Audit Logs */}
				<Grid item xs={12} sm={6} md={4} lg={2}>
					<Typography variant="caption" color="textSecondary">
						{t(`${translation}.AUDIT_LOGS.LABEL`)}
					</Typography>
					<Box className={classes.sContent}>
						<ExternalLink
							text={t(`${translation}.AUDIT_LOGS.TEXT`)}
							payload={{
								siteId: cSiteId,
								robotId: cRobotId,
								from: 'now-7d',
								to: 'now'
							}}
							FetchExternalLink={DeepLinkAuditLogsLinkFetch}
							showIcon={deepLink.auditLogs.loading}
							disabled={deepLink.auditLogs.loading}
						/>
					</Box>
				</Grid>

				{/* Deep Link: Battery */}
				<Grid item xs={12} sm={6} md={4} lg={2}>
					<Typography variant="caption" color="textSecondary">
						{t(`${translation}.BATTERY.LABEL`)}
					</Typography>
					<Box className={classes.sContent}>
						<ExternalLink
							text={t(`${translation}.BATTERY.TEXT`)}
							payload={{
								robotId: cRobotId,
								from: 'now-1d',
								to: 'now'
							}}
							FetchExternalLink={DeepLinkBatteryLinkFetch}
							showIcon={deepLink.battery.loading}
							disabled={deepLink.battery.loading}
						/>
					</Box>
				</Grid>

				{/* Deep Link: Temperature */}
				<Grid item xs={12} sm={6} md={4} lg={2}>
					<Typography variant="caption" color="textSecondary">
						{t(`${translation}.TEMPERATURE.LABEL`)}
					</Typography>
					<Box className={classes.sContent}>
						<ExternalLink
							text={t(`${translation}.TEMPERATURE.TEXT`)}
							payload={{
								robotId: cRobotId,
								from: 'now-6h',
								to: 'now'
							}}
							FetchExternalLink={DeepLinkTemperatureLinkFetch}
							showIcon={deepLink.temperature.loading}
							disabled={deepLink.temperature.loading}
						/>
					</Box>
				</Grid>

				{/* Deep Link: Diagnostics Logs */}
				<Grid item xs={12} sm={6} md={4} lg={2}>
					<Typography variant="caption" color="textSecondary">
						{t(`${translation}.DIAGNOSTICS_LOGS.LABEL`)}
					</Typography>
					<Box className={classes.sContent}>
						<ExternalLink
							text={t(`${translation}.DIAGNOSTICS_LOGS.TEXT`)}
							payload={{
								robotId: cRobotId,
								from: 'now-1d',
								to: 'now'
							}}
							FetchExternalLink={DeepLinkDiagnosticsLogsLinkFetch}
							showIcon={deepLink.diagnosticsLogs.loading}
							disabled={deepLink.diagnosticsLogs.loading}
						/>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};
export default RobotDetailDataLogs;
