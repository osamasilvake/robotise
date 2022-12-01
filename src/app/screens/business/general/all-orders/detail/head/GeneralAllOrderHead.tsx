import { Box, Link, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import Status from '../../../../../../components/common/status/Status';
import { AppConfigService } from '../../../../../../services';
import { dateDayJs, dateUTC } from '../../../../../../utilities/methods/Date';
import { mapStatus } from '../../list/table/GeneralAllOrdersTable.map';
import { GeneralAllOrderHeadInterface } from './GeneralAllOrderHead.interface';
import { GeneralAllOrderHeadStyle } from './GeneralAllOrderHead.style';

const GeneralAllOrderHead: FC<GeneralAllOrderHeadInterface> = (props) => {
	const { order } = props;
	const { t } = useTranslation('GENERAL');
	const classes = GeneralAllOrderHeadStyle();

	const cRobotId = order?.content?.robot.id || '';
	const history = order?.content?.history;
	const startDate = history && history[0]?.createdAt;
	const endDate = history && history[history?.length - 1]?.createdAt;
	const totalOrderTimeSecs = dateDayJs(endDate).diff(dateDayJs(startDate), 's');
	const totalOrderTimeFormatted = dateUTC(totalOrderTimeSecs * 1000).format('mm:ss');
	const translation = 'COMMON.ORDERS.DETAIL.HEAD';

	return (
		<Stack
			spacing={6}
			direction="row"
			alignItems="center"
			justifyContent="space-between"
			flexWrap="wrap"
			className={classes.sBox}>
			{/* Room */}
			<Typography variant="h1" fontWeight={500}>
				{order?.content?.location}
			</Typography>

			<Stack spacing={6} direction="row" alignItems="center" flexWrap="wrap">
				{/* Final Status */}
				<Box>
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
					<Box>
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
					<Box>
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
		</Stack>
	);
};
export default GeneralAllOrderHead;
