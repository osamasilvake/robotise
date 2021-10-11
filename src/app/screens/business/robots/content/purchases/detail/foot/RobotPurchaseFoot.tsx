import { Box, Link, Typography } from '@mui/material';
import { FC, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';

import { AppConfigService } from '../../../../../../../services';
import { RobotParamsInterface } from '../../../../Robot.interface';
import { RobotPurchaseFootInterface } from './RobotPurchaseFoot.interface';
import { RobotPurchaseFootStyle } from './RobotPurchaseFoot.style';

const RobotPurchaseFoot: FC<RobotPurchaseFootInterface> = (props) => {
	const { purchase } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotPurchaseFootStyle();

	const params: RobotParamsInterface = useParams();
	const history = useHistory();

	const cRobotId = params.robotId;

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

	return (
		<Box>
			{purchase?.content?.comment && (
				<Box className={classes.sFootBox}>
					<Typography variant="h6" color="textSecondary">
						{t('CONTENT.PURCHASES.DETAIL.FOOT.NOTE')}
					</Typography>
					<Typography>{purchase.content.comment}</Typography>
				</Box>
			)}

			{purchase?.content?.order?.id && (
				<Box className={classes.sFootBox}>
					<Typography variant="h6" color="textSecondary">
						{t('CONTENT.PURCHASES.DETAIL.FOOT.ORDER.LINK.TITLE')}
					</Typography>
					<Link
						component="button"
						variant="body1"
						underline="hover"
						onClick={handleShowOrderDetail(purchase.content.order.id)}>
						{t('CONTENT.PURCHASES.DETAIL.FOOT.ORDER.LINK.TEXT')}
					</Link>
				</Box>
			)}
		</Box>
	);
};
export default RobotPurchaseFoot;
