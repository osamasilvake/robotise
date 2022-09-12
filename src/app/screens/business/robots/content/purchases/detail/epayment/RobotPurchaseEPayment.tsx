import { Box, Card, CardContent, Divider, Grid, Link, Stack, Typography } from '@mui/material';
import i18next from 'i18next';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Status from '../../../../../../../components/common/status/Status';
import { dateFormat1 } from '../../../../../../../utilities/methods/Date';
import { currencyFormat } from '../../../../../../../utilities/methods/Number';
import { RobotPurchaseEPaymentMethodsTypeEnum } from './RobotPurchaseEPayment.enum';
import { RobotPurchaseEPaymentInterface } from './RobotPurchaseEPayment.interface';
import { mapStatus, mapStatusColor } from './RobotPurchaseEPayment.map';
import { RobotPurchaseEPaymentStyle } from './RobotPurchaseEPayment.style';

const RobotPurchaseEPayment: FC<RobotPurchaseEPaymentInterface> = (props) => {
	const { purchase } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotPurchaseEPaymentStyle();

	const translation = 'CONTENT.PURCHASES.DETAIL.E_PAYMENT';
	const paymentData = purchase?.content?.paymentData;
	const isEPayment = paymentData?.method === RobotPurchaseEPaymentMethodsTypeEnum.E_PAYMENT;
	const currency = paymentData?.payment.currency;
	const totalPrice = +(purchase?.content?.totalPrice || 0);
	const preAuthAmount = +(paymentData?.payment.preAuthorizedAmount || 0);
	const captureAmount = +(paymentData?.payment.capturedAmount || 0);
	const preAuthAmountFormat = currencyFormat(preAuthAmount, i18next.language, currency);
	const captureAmountFormat = currencyFormat(captureAmount, i18next.language, currency);
	const isPurchaseExceedsPreAuthAmount = totalPrice > preAuthAmount;
	const missingAmount = currencyFormat(totalPrice - preAuthAmount, i18next.language, currency);

	const status = mapStatus(!!paymentData?.isPaid, paymentData?.payment?.status);
	const statusColor = mapStatusColor(!!paymentData?.isPaid, paymentData?.payment?.status);

	return isEPayment ? (
		<Box className={classes.sBox}>
			<Grid container spacing={0}>
				<Grid item xs={12} sm={8} md={4}>
					<Card square elevation={1}>
						<CardContent>
							<Box className={classes.sTitle}>
								<Typography variant="h6">{t(`${translation}.TITLE`)}</Typography>
								<Typography variant="body2" color="textSecondary">
									{t(`${translation}.EXCERPT`)}
								</Typography>
							</Box>

							<Box>
								<Typography variant="body2" color="textSecondary">
									{t(`${translation}.METHOD`)}
								</Typography>
								<Typography variant="body2">{paymentData.method}</Typography>
							</Box>

							<Box className={classes.sBlock}>
								<Typography variant="body2" color="textSecondary">
									{t(`${translation}.STATUS.LABEL`)}
								</Typography>
								<Stack spacing={0.5} direction="row" alignItems="center">
									<Typography>
										<Status level={statusColor} small>
											{t(status)}
										</Status>
									</Typography>
								</Stack>
							</Box>

							<Box className={classes.sBlock}>
								<Typography variant="body2" color="textSecondary">
									{t(`${translation}.PRE_AUTHORIZED`)}
								</Typography>
								<Grid container spacing={0}>
									<Grid item xs={8}>
										<Typography variant="body2">
											{dateFormat1(paymentData.payment.preAuthorizedAt)}
										</Typography>
									</Grid>
									<Grid item xs={4} textAlign="right">
										<Typography variant="body2">
											{preAuthAmountFormat}
										</Typography>
									</Grid>
								</Grid>
							</Box>

							<Box className={classes.sBlock}>
								<Typography variant="body2" color="textSecondary">
									{t(`${translation}.CAPTURED`)}
								</Typography>
								<Grid container spacing={0}>
									<Grid item xs={8}>
										<Typography variant="body2">
											{dateFormat1(paymentData.payment.capturedAt)}
										</Typography>
									</Grid>
									<Grid item xs={4} textAlign="right">
										<Typography variant="body2">
											{captureAmountFormat}
										</Typography>
									</Grid>
								</Grid>
							</Box>

							{isPurchaseExceedsPreAuthAmount && (
								<>
									<Divider className={classes.sBlock} />
									<Box className={classes.sBlock}>
										<Grid container spacing={0}>
											<Grid item xs={6}>
												<Typography
													variant="body2"
													color="error"
													fontWeight={500}>
													{t(`${translation}.MISSING_AMOUNT`)}
												</Typography>
											</Grid>
											<Grid item xs={6} textAlign="right">
												<Typography
													variant="body2"
													color="error"
													fontWeight={500}>
													{missingAmount}
												</Typography>
											</Grid>
										</Grid>
									</Box>
								</>
							)}

							<Box className={classes.sBlock}>
								<Typography variant="body2" color="textSecondary">
									{t(`${translation}.MORE_DETAILS`)}
								</Typography>
								<Grid container spacing={0}>
									{paymentData.payment.vendorPaymentUrl && (
										<Grid item xs={6}>
											<Link
												variant="body2"
												underline="hover"
												href={paymentData.payment.vendorPaymentUrl}
												target="_blank">
												Payment Panel
											</Link>
										</Grid>
									)}
									{paymentData.payment.receiptUrl && (
										<Grid item xs={6} textAlign="right">
											<Link
												variant="body2"
												underline="hover"
												href={paymentData.payment.receiptUrl}
												target="_blank">
												Print receipt
											</Link>
										</Grid>
									)}
								</Grid>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Box>
	) : null;
};
export default RobotPurchaseEPayment;
