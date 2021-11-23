import {
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
} from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

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

	const params = useParams() as RobotParamsInterface;
	const navigate = useNavigate();

	const cRobotId = params.robotId;
	const robotTwinsSingle = robotTwinsSummary.content?.dataById[cRobotId];
	const translation = 'CONTENT.CONFIGURATION.ROBOT_CONFIG';

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
								const link =
									AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.MAIN;

								// navigate
								navigate(link);
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
				<Typography variant="h6">{t(`${translation}.TITLE`)}</Typography>
				<Typography variant="body2" color="textSecondary" className={classes.sExcerpt}>
					{t(`${translation}.EXCERPT`)}
				</Typography>

				<form onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<FormControl error fullWidth>
								<TextField
									required
									type="text"
									id="name"
									name="name"
									value={values?.name}
									error={!!errors?.name}
									onChange={handleChangeInput}
									onBlur={handleBlur}
									label={t(`${translation}.FORM.FIELDS.NAME.LABEL`)}
									placeholder={t(`${translation}.FORM.FIELDS.NAME.PLACEHOLDER`)}
								/>
								{errors?.name && <FormHelperText>{t(errors.name)}</FormHelperText>}
							</FormControl>
							<FormControl error fullWidth margin="normal">
								<TextField
									required
									type="text"
									id="customerName"
									name="customerName"
									value={values?.customerName}
									error={!!errors?.customerName}
									onChange={handleChangeInput}
									onBlur={handleBlur}
									label={t(`${translation}.FORM.FIELDS.CUSTOMER_NAME.LABEL`)}
									placeholder={t(
										`${translation}.FORM.FIELDS.CUSTOMER_NAME.PLACEHOLDER`
									)}
								/>
								{errors?.customerName && (
									<FormHelperText>{t(errors.customerName)}</FormHelperText>
								)}
							</FormControl>
							<FormControl>
								<FormControlLabel
									control={
										<Switch
											name="isHidden"
											checked={values.isHidden}
											onChange={handleChangeCheckbox}
										/>
									}
									label={t<string>(
										`${translation}.FORM.FIELDS.CHECKBOXES.HIDDEN.LABEL`
									)}
								/>
								<FormHelperText className={classes.sFormHelperText}>
									{t(`${translation}.FORM.FIELDS.CHECKBOXES.HIDDEN.NOTE`)}
								</FormHelperText>
							</FormControl>
							<FormControl className={classes.sFormControlBox}>
								<FormControlLabel
									control={
										<Switch
											name="isOnlineCheckDisabled"
											checked={values.isOnlineCheckDisabled}
											onChange={handleChangeCheckbox}
										/>
									}
									label={t<string>(
										`${translation}.FORM.FIELDS.CHECKBOXES.ONLINE_CHECK_DISABLED.LABEL`
									)}
								/>
								<FormHelperText className={classes.sFormHelperText}>
									{t(
										`${translation}.FORM.FIELDS.CHECKBOXES.ONLINE_CHECK_DISABLED.NOTE`
									)}
								</FormHelperText>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<Button
								variant="outlined"
								type="submit"
								disabled={
									robot.robotConfig.loading ||
									(!!errors && !validateEmptyObj(errors)) ||
									validateEmptyObjProperty(values)
								}
								endIcon={
									robot.robotConfig.loading && <CircularProgress size={20} />
								}>
								{t(`${translation}.FORM.BUTTONS.UPDATE`)}
							</Button>
						</Grid>
					</Grid>
				</form>
			</CardContent>
		</Card>
	);
};
export default RobotConfig;
