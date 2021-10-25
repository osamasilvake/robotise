import { Box, Chip, CircularProgress, Link, Stack, Typography } from '@mui/material';
import { FC, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

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

	const params: RobotParamsInterface = useParams();
	const history = useHistory();

	const translation = 'CONTENT.PURCHASES.DETAIL.HEAD';
	const cRobotId = params.robotId;
	const condition1 = robot.itemTracking.content?.purchaseId === purchase?.content?.id;
	const condition2 = robot.itemTracking.content?.data?.dlink;

	/**
	 * handle show order detail
	 * @param orderId
	 * @returns
	 */
	const handleShowOrderDetail = (orderId: string) => (event: MouseEvent<HTMLAnchorElement>) => {
		// stop propagation
		event.stopPropagation();

		// prepare link
		const url = AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.ORDERS.DETAIL;
		const robotLink = url.replace(':robotId', cRobotId).replace(':orderId', orderId);

		// push to history
		history.push(robotLink);
	};

	/**
	 * request item tracking link
	 * @returns
	 */
	const requestItemTrackingLink = () => {
		if (purchase && purchase.content) {
			// dispatch: fetch item tracking link from kibana
			dispatch(
				RobotItemTrackingLinkFetch(cRobotId, {
					purchaseId: purchase.content.id,
					from: moment15MinsFromDate(purchase.content.createdAt),
					to: purchase.content.createdAt
				})
			);
		}
	};

	return (
		<Box className={classes.sBox}>
			<Stack direction="row" spacing={1} className={classes.sStack}>
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
							underline="hover"
							component="button"
							variant="body2"
							onClick={handleShowOrderDetail(purchase.content.order.id)}>
							{t(`${translation}.LINK_ORDER`)}
						</Link>
					</Box>
				)}

				<Box>
					<>
						{!(condition1 && condition2) && (
							<Chip
								size="small"
								label={t(`${translation}.ITEM_TRACKING.REQUEST`)}
								color="primary"
								variant="outlined"
								clickable
								icon={
									robot.itemTracking.loading ? (
										<CircularProgress size={20} />
									) : undefined
								}
								disabled={robot.itemTracking.loading}
								onClick={requestItemTrackingLink}
							/>
						)}
						{!robot.itemTracking.loading && condition1 && condition2 && (
							<Link
								underline="hover"
								variant="body2"
								href={String(condition2)}
								target="_blank"
								onClick={(e) => e.stopPropagation()}>
								{t(`${translation}.ITEM_TRACKING.VISIT`)}
							</Link>
						)}
					</>
				</Box>
			</Stack>

			<Typography variant="h6" color="textSecondary">
				{t(`${translation}.TITLE`)}
			</Typography>
		</Box>
	);
};
export default RobotPurchaseHead;
