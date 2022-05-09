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
import { AppDispatch } from '../../../../../../slices';
import { RobotConfigUpdate } from '../../../../../../slices/business/robots/RobotOperations.slice';
import { RobotTwinsFetch } from '../../../../../../slices/business/robots/RobotTwins.slice';
import { RobotTwinsSummaryFetchList } from '../../../../../../slices/business/robots/RobotTwinsSummary.slice';
import { useForm } from '../../../../../../utilities/hooks/form/UseForm';
import {
	removeEmptyObjProperties,
	validateEmptyObj
} from '../../../../../../utilities/methods/Object';
import { RobotParamsInterface } from '../../../Robot.interface';
import { RobotConfigFormInterface, RobotConfigInterface } from './RobotConfig.interface';
import { RobotConfigStyle } from './RobotConfig.style';
import { RobotConfigValidation } from './RobotConfig.validation';

const RobotConfig: FC<RobotConfigInterface> = (props) => {
	const { robotTwinsSummary, robotOperations } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotConfigStyle();

	const dispatch = useDispatch<AppDispatch>();

	const params = useParams<keyof RobotParamsInterface>() as RobotParamsInterface;
	const navigate = useNavigate();

	const cRobotId = params.robotId;
	const robotTwinsSingle = robotTwinsSummary.content?.dataById[cRobotId];
	const translation = 'CONTENT.CONFIGURATION.ROBOT_CONFIG';

	const { handleChangeInput, handleChangeCheckbox, handleBlur, handleSubmit, values, errors } =
		useForm<RobotConfigFormInterface>(
			{
				name: robotTwinsSingle?.robotTitle || '',
				customerName: robotTwinsSingle?.robotCustomerName || '',
				username: robotTwinsSingle?.robotUsername || '',
				ipAddress: robotTwinsSingle?.robotIPAddress || '',
				isHidden: !!robotTwinsSingle?.robotHidden,
				isSimulator: !!robotTwinsSingle?.robotIsSimulator,
				isOnlineCheckDisabled: !!robotTwinsSingle?.robotOnlineCheckDisabled
			},
			RobotConfigValidation,
			async () => {
				if (robotTwinsSingle) {
					// dispatch: update robot config
					dispatch(
						RobotConfigUpdate(cRobotId, removeEmptyObjProperties(values), () => {
							if (!robotTwinsSummary.content?.state?.showHidden && values.isHidden) {
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
					<Grid container spacing={1}>
						<Grid item xs={12} md={6}>
							<FormControl fullWidth margin="normal">
								<TextField
									required
									type="text"
									id="name"
									name="name"
									label={t(`${translation}.FORM.FIELDS.NAME.LABEL`)}
									placeholder={t(`${translation}.FORM.FIELDS.NAME.PLACEHOLDER`)}
									value={values?.name}
									onChange={handleChangeInput}
									onBlur={handleBlur}
									error={!!errors?.name}
									helperText={errors?.name && t(errors.name)}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12} md={6}>
							<FormControl fullWidth margin="normal">
								<TextField
									required
									type="text"
									id="customerName"
									name="customerName"
									label={t(`${translation}.FORM.FIELDS.CUSTOMER_NAME.LABEL`)}
									placeholder={t(
										`${translation}.FORM.FIELDS.CUSTOMER_NAME.PLACEHOLDER`
									)}
									value={values?.customerName}
									onChange={handleChangeInput}
									onBlur={handleBlur}
									error={!!errors?.customerName}
									helperText={errors?.customerName && t(errors.customerName)}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12} md={6}>
							<FormControl fullWidth margin="normal">
								<TextField
									type="text"
									id="username"
									name="username"
									label={t(`${translation}.FORM.FIELDS.USERNAME.LABEL`)}
									placeholder={t(
										`${translation}.FORM.FIELDS.USERNAME.PLACEHOLDER`
									)}
									value={values?.username}
									onChange={handleChangeInput}
									onBlur={handleBlur}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12} md={6}>
							<FormControl fullWidth margin="normal">
								<TextField
									type="text"
									id="ipAddress"
									name="ipAddress"
									label={t(`${translation}.FORM.FIELDS.IP_ADDRESS.LABEL`)}
									placeholder={t(
										`${translation}.FORM.FIELDS.IP_ADDRESS.PLACEHOLDER`
									)}
									value={values?.ipAddress}
									onChange={handleChangeInput}
									onBlur={handleBlur}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
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
						</Grid>
						<Grid item xs={12}>
							<FormControl>
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
						<Grid item xs={12} className={classes.sSubmit}>
							<Button
								variant="outlined"
								type="submit"
								disabled={
									robotOperations.robotConfig.loading ||
									(!!errors && !validateEmptyObj(errors))
								}
								endIcon={
									robotOperations.robotConfig.loading && (
										<CircularProgress size={20} />
									)
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
