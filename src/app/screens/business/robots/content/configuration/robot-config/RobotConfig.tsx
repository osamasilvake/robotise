import {
	Box,
	Button,
	Card,
	CardContent,
	CircularProgress,
	FormControl,
	FormControlLabel,
	FormHelperText,
	Grid,
	Switch,
	TextField,
	Typography
} from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { AppConfigService } from '../../../../../../services';
import { RobotConfigUpdate } from '../../../../../../slices/business/robots/Robot.slice';
import { RobotTwinsFetch } from '../../../../../../slices/business/robots/RobotTwins.slice';
import { RobotTwinsSummaryFetchList } from '../../../../../../slices/business/robots/RobotTwinsSummary.slice';
import { useForm } from '../../../../../../utilities/hooks/form/UseForm';
import {
	validateEmptyObj,
	validateEmptyObjProperty
} from '../../../../../../utilities/methods/Object';
import { RobotParamsInterface } from '../../../Robot.interface';
import { RobotConfigFormInterface, RobotConfigInterface } from './RobotConfig.interface';
import { RobotConfigStyle } from './RobotConfig.style';
import { RobotConfigValidation } from './RobotConfig.validation';

const RobotConfig: FC<RobotConfigInterface> = (props) => {
	const { robotTwinsSummary, robot } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotConfigStyle();

	const dispatch = useDispatch();

	const params: RobotParamsInterface = useParams();
	const history = useHistory();

	const cRobotId = params.robotId;
	const robotTwinsSingle = robotTwinsSummary.content?.dataById[cRobotId];
	const common = 'CONTENT.CONFIGURATION.ROBOT_CONFIG';

	const { handleChangeInput, handleChangeCheckbox, handleBlur, handleSubmit, values, errors } =
		useForm<RobotConfigFormInterface>(
			{
				name: robotTwinsSingle?.robotTitle || '',
				customerName: robotTwinsSingle?.robotCustomerName || '',
				isHidden: !!robotTwinsSingle?.robotHidden,
				isOnlineCheckDisabled: !!robotTwinsSingle?.robotOnlineCheckDisabled
			},
			RobotConfigValidation,
			async () => {
				if (robotTwinsSingle) {
					// dispatch: update robot config
					dispatch(
						RobotConfigUpdate(cRobotId, values, () => {
							if (!robotTwinsSummary.content?.state?.hidden && values.isHidden) {
								// prepare link
								const robotsLink =
									AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.MAIN;

								// push to history
								history.push(robotsLink);
							} else {
								// dispatch: fetch robot twins summary
								dispatch(RobotTwinsSummaryFetchList(true));

								// dispatch: fetch robot twins of a robot
								dispatch(RobotTwinsFetch(robotTwinsSingle.id, true));
							}
						})
					);
				}
			}
		);

	return (
		<Card square elevation={1}>
			<CardContent>
				<Typography variant="h6">{t(`${common}.TITLE`)}</Typography>
				<Typography variant="body2" color="textSecondary" className={classes.sExcerpt}>
					{t(`${common}.EXCERPT`)}
				</Typography>

				<form onSubmit={handleSubmit} className={classes.sForm}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<FormControl error fullWidth>
								<TextField
									required
									variant="outlined"
									type="string"
									id="name"
									name="name"
									value={values?.name}
									error={!!errors?.name}
									onChange={handleChangeInput}
									onBlur={handleBlur}
									label={t(`${common}.FORM.FIELDS.NAME.LABEL`)}
									placeholder={t(`${common}.FORM.FIELDS.NAME.PLACEHOLDER`)}
								/>
								{errors?.name && <FormHelperText>{t(errors.name)}</FormHelperText>}
							</FormControl>
							<FormControl error fullWidth margin="normal">
								<TextField
									required
									variant="outlined"
									type="string"
									id="customerName"
									name="customerName"
									value={values?.customerName}
									error={!!errors?.customerName}
									onChange={handleChangeInput}
									onBlur={handleBlur}
									label={t(`${common}.FORM.FIELDS.CUSTOMER_NAME.LABEL`)}
									placeholder={t(
										`${common}.FORM.FIELDS.CUSTOMER_NAME.PLACEHOLDER`
									)}
								/>
								{errors?.customerName && (
									<FormHelperText>{t(errors.customerName)}</FormHelperText>
								)}
							</FormControl>
							<Box>
								<FormControl>
									<FormControlLabel
										control={
											<Switch
												color="primary"
												name="isHidden"
												checked={values.isHidden}
												onChange={handleChangeCheckbox}
											/>
										}
										label={t(`${common}.FORM.FIELDS.CHECKBOXES.HIDDEN.LABEL`)}
									/>
								</FormControl>
								<FormHelperText className={classes.sFormHelperText}>
									{t(`${common}.FORM.FIELDS.CHECKBOXES.HIDDEN.NOTE`)}
								</FormHelperText>
							</Box>
							<Box className={classes.sFormControlBox}>
								<FormControl>
									<FormControlLabel
										control={
											<Switch
												color="primary"
												name="isOnlineCheckDisabled"
												checked={values.isOnlineCheckDisabled}
												onChange={handleChangeCheckbox}
											/>
										}
										label={t(
											`${common}.FORM.FIELDS.CHECKBOXES.ONLINE_CHECK_DISABLED.LABEL`
										)}
									/>
								</FormControl>
								<FormHelperText className={classes.sFormHelperText}>
									{t(
										`${common}.FORM.FIELDS.CHECKBOXES.ONLINE_CHECK_DISABLED.NOTE`
									)}
								</FormHelperText>
							</Box>
						</Grid>
						<Grid item xs={12}>
							<Button
								variant="outlined"
								type="submit"
								disabled={
									(!!errors && !validateEmptyObj(errors)) ||
									validateEmptyObjProperty(values)
								}
								endIcon={
									robot.robotConfig.loading && <CircularProgress size={20} />
								}>
								{t(`${common}.FORM.BUTTONS.UPDATE`)}
							</Button>
						</Grid>
					</Grid>
				</form>
			</CardContent>
		</Card>
	);
};
export default RobotConfig;
