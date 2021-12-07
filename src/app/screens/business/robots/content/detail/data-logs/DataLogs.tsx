import { Box, Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ExternalLink from '../../../../../../components/common/external-link/ExternalLink';
import {
	RobotAuditLogsLinkFetch,
	RobotBatteryLinkFetch,
	robotSelector,
	RobotTemperatureLinkFetch
} from '../../../../../../slices/business/robots/Robot.slice';
import { robotTwinsSummarySelector } from '../../../../../../slices/business/robots/RobotTwinsSummary.slice';
import { RobotParamsInterface } from '../../../Robot.interface';
import { RobotDetailDataLogsStyle } from './DataLogs.style';

const RobotDetailDataLogs: FC = () => {
	const { t } = useTranslation('ROBOTS');
	const classes = RobotDetailDataLogsStyle();

	const robot = useSelector(robotSelector);
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
							FetchExternalLink={RobotAuditLogsLinkFetch}
							showIcon={robot.auditLogs.loading}
							disabled={robot.auditLogs.loading}
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
							FetchExternalLink={RobotBatteryLinkFetch}
							showIcon={robot.battery.loading}
							disabled={robot.battery.loading}
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
							FetchExternalLink={RobotTemperatureLinkFetch}
							showIcon={robot.temperature.loading}
							disabled={robot.temperature.loading}
						/>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};
export default RobotDetailDataLogs;
