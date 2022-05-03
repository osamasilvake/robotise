import { Box, Link, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link as RouterLink, useParams } from 'react-router-dom';

import ExternalLink from '../../../../../../../components/common/external-link/ExternalLink';
import { ExternalLinkActionTypeEnum } from '../../../../../../../components/common/external-link/ExternalLink.enum';
import { AppConfigService } from '../../../../../../../services';
import { deepLinkSelector } from '../../../../../../../slices/settings/deep-links/DeepLink.slice';
import { dateMinsPriorToDate } from '../../../../../../../utilities/methods/Date';
import { RobotParamsInterface } from '../../../../Robot.interface';
import RobotPurchasesActionBilled from '../../actions/RobotPurchasesActionBilled';
import { RobotPurchaseHeadInterface } from './RobotPurchaseHead.interface';
import { RobotPurchaseHeadStyle } from './RobotPurchaseHead.style';

const RobotPurchaseHead: FC<RobotPurchaseHeadInterface> = (props) => {
	const { purchase } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotPurchaseHeadStyle();

	const deepLink = useSelector(deepLinkSelector);

	const params = useParams<keyof RobotParamsInterface>() as RobotParamsInterface;

	const translation = 'CONTENT.PURCHASES.DETAIL.HEAD';
	const cRobotId = params.robotId;

	return cRobotId ? (
		<Box className={classes.sBox}>
			<Stack
				spacing={0.5}
				direction="row"
				alignItems="center"
				justifyContent="space-between"
				className={classes.sStack}>
				{purchase?.content && (
					<RobotPurchasesActionBilled
						detailPage
						purchaseId={purchase.content.id}
						isBilled={purchase.content.isBilled}
					/>
				)}

				<Stack spacing={1.5} direction="row">
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
						{purchase && purchase.content && (
							<ExternalLink
								text={t(`${translation}.ITEM_TRACKING`)}
								payload={{
									robotId: cRobotId,
									from: dateMinsPriorToDate(purchase.content.createdAt, 15),
									to: purchase.content.createdAt
								}}
								actionType={ExternalLinkActionTypeEnum.ITEM_TRACKING}
								showIcon={deepLink.itemTracking.loading}
								disabled={deepLink.itemTracking.loading}
							/>
						)}
					</Box>
				</Stack>
			</Stack>

			<Typography variant="h6" color="textSecondary">
				{t(`${translation}.TITLE`)}
			</Typography>
		</Box>
	) : null;
};
export default RobotPurchaseHead;
