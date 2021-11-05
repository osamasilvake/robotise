import { Box, Chip, CircularProgress, Link, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useParams } from 'react-router-dom';

import Status from '../../../../../../../components/common/status/Status';
import { StatusTypeEnum } from '../../../../../../../components/common/status/Status.enum';
import { AppConfigService } from '../../../../../../../services';
import {
	RobotItemTrackingLinkFetch,
	robotSelector
} from '../../../../../../../slices/business/robots/Robot.slice';
import { moment15MinsFromDate } from '../../../../../../../utilities/methods/Moment';
import { RobotParamsInterface } from '../../../../Robot.interface';
import { RobotPurchaseHeadInterface } from './RobotPurchaseHead.interface';
import { RobotPurchaseHeadStyle } from './RobotPurchaseHead.style';

const RobotPurchaseHead: FC<RobotPurchaseHeadInterface> = (props) => {
	const { purchase } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotPurchaseHeadStyle();

	const dispatch = useDispatch();
	const robot = useSelector(robotSelector);

	const params = useParams() as RobotParamsInterface;

	const translation = 'CONTENT.PURCHASES.DETAIL.HEAD';
	const cRobotId = params.robotId;

	/**
	 * handle item tracking link
	 * @returns
	 */
	const handleItemTrackingLink = () => {
		if (purchase && purchase.content) {
			// dispatch: fetch item tracking link
			dispatch(
				RobotItemTrackingLinkFetch(
					cRobotId,
					{
						from: moment15MinsFromDate(purchase.content.createdAt),
						to: purchase.content.createdAt
					},
					(res) => {
						res.data && window.open(res.data.dlink);
					}
				)
			);
		}
	};

	return (
		<Box className={classes.sBox}>
			<Stack spacing={0.5} direction="row" className={classes.sStack}>
				<Typography variant="body2" color="textSecondary">
					<Status
						level={
							purchase?.content?.isBilled
								? StatusTypeEnum.SUCCESS_DARK
								: StatusTypeEnum.INFO
						}
						small>
						{purchase?.content?.isBilled
							? t(`${translation}.BILLED`)
							: t(`${translation}.UN_BILLED`)}
					</Status>
				</Typography>

				{purchase?.content?.order?.id && (
					<Box>
						<Link
							component={RouterLink}
							variant="body2"
							underline="hover"
							to={AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.ORDERS.DETAIL.replace(
								':robotId',
								cRobotId
							).replace(':orderId', purchase.content.order.id)}>
							{t(`${translation}.ORDER_DETAILS`)}
						</Link>
					</Box>
				)}

				<Box>
					<Chip
						size="small"
						label={t(`${translation}.ITEM_TRACKING`)}
						color="primary"
						variant="outlined"
						clickable
						icon={
							robot.itemTracking.loading ? <CircularProgress size={20} /> : undefined
						}
						disabled={robot.itemTracking.loading}
						onClick={handleItemTrackingLink}
					/>
				</Box>
			</Stack>

			<Typography variant="h6" color="textSecondary">
				{t(`${translation}.TITLE`)}
			</Typography>
		</Box>
	);
};
export default RobotPurchaseHead;
