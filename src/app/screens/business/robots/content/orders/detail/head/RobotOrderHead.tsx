import { Box, Grid, Link, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useParams } from 'react-router-dom';

import Status from '../../../../../../../components/common/status/Status';
import { StatusTypeEnum } from '../../../../../../../components/common/status/Status.enum';
import { AppConfigService } from '../../../../../../../services';
import { dateDayJs, dateUTC } from '../../../../../../../utilities/methods/Date';
import { RobotParamsInterface } from '../../../../Robot.interface';
import { mapStatus } from '../../list/table/RobotOrdersTable.map';
import { RobotOrderHeadInterface } from './RobotOrderHead.interface';
import { RobotOrderHeadStyle } from './RobotOrderHead.style';

const RobotOrderHead: FC<RobotOrderHeadInterface> = (props) => {
	const { order } = props;
	const { t } = useTranslation('GENERAL');
	const classes = RobotOrderHeadStyle();

	const params = useParams<keyof RobotParamsInterface>() as RobotParamsInterface;

	const cRobotId = params.robotId;
	const history = order?.content?.history;
	const startDate = history && history[0]?.createdAt;
	const endDate = history && history[history?.length - 1]?.createdAt;
	const totalOrderTimeSecs = dateDayJs(endDate).diff(dateDayJs(startDate), 's');
	const totalOrderTimeFormatted = dateUTC(totalOrderTimeSecs * 1000).format('mm:ss');
	const translation = 'COMMON.ORDERS.DETAIL.HEAD';

	return (
		<Grid container spacing={2} className={classes.sBox}>
			<Grid item xs={12} sm={4} md={5}>
				<Box className={classes.sRoomWrapper}>
					{/* Room */}
					<Typography variant="h1" className={classes.sRoom}>
						{order?.content?.location}
					</Typography>

					{/* Debug */}
					{order?.content?.isDebug && (
						<Box className={classes.sDebug}>
							<Status small level={StatusTypeEnum.WARN}>
								{t(`${translation}.TEST_ORDER.TITLE`)}
							</Status>
						</Box>
					)}
				</Box>
			</Grid>
			<Grid item xs={12} sm={8} md={7}>
				<Stack
					spacing={0}
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					flexWrap="wrap"
					className={classes.sItems}>
					{/* Origin */}
					<Box className={classes.sItem}>
						<Typography variant="body2">{t(`${translation}.ORIGIN.TITLE`)}</Typography>
						<Typography variant="body2" color="textSecondary">
							{t(`COMMON.ORDERS.LIST.TABLE.VALUES.ORIGIN.${order?.content?.origin}`)}
						</Typography>
					</Box>

					{/* Mode */}
					<Box className={classes.sItem}>
						<Typography variant="body2">{t(`${translation}.MODE.TITLE`)}</Typography>
						<Typography variant="body2" color="textSecondary">
							{t(`COMMON.MODE.${order?.content?.mode}`)}
						</Typography>
					</Box>

					{/* Final Status */}
					<Box className={classes.sItem}>
						<Typography variant="body2">
							{t(`${translation}.FINAL_STATUS.TITLE`)}
						</Typography>
						<Status level={mapStatus(order?.content?.status || '')}>
							{t(
								`COMMON.ORDERS.LIST.TABLE.VALUES.STATUS.${order?.content?.status?.replace(
									':',
									'_'
								)}`
							)}
						</Status>
					</Box>

					{/* Elapsed Time */}
					{totalOrderTimeFormatted && (
						<Box className={classes.sItem}>
							<Typography variant="body2">
								{t(`${translation}.ELAPSED_TIME.TITLE`)}
							</Typography>
							<Typography variant="body2" color="textSecondary">
								{totalOrderTimeFormatted}
							</Typography>
						</Box>
					)}

					{/* Purchase Detail */}
					{order?.content?.orderReport && (
						<Box className={classes.sItem}>
							<Typography variant="body2">
								{t(`${translation}.PURCHASE_DETAIL.TITLE`)}
							</Typography>
							<Link
								component={RouterLink}
								variant="body2"
								underline="hover"
								to={AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.PURCHASES.DETAIL.replace(
									':robotId',
									cRobotId
								).replace(':purchaseId', order.content.orderReport.id)}>
								{t(`${translation}.PURCHASE_DETAIL.TEXT`)}
							</Link>
						</Box>
					)}
				</Stack>
			</Grid>
		</Grid>
	);
};
export default RobotOrderHead;
