import {
	Button,
	Card,
	CardContent,
	Checkbox,
	CircularProgress,
	FormControl,
	FormControlLabel,
	FormHelperText,
	Grid,
	TextField,
	Typography
} from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { useForm } from '../../../../../../utilities/hooks/form/UseForm';
import {
	validateEmptyObj,
	validateEmptyObjProperty
} from '../../../../../../utilities/methods/ObjectUtilities';
import { CardStyle } from '../../../../../../utilities/styles/Card.style';
import { RobotParamsInterface } from '../../../Robot.interface';
import { RobotConfigInterface, RobotConfigPayloadInterface } from './RobotConfig.interface';
import { RobotConfigStyle } from './RobotConfig.style';
import { RobotConfigValidation } from './RobotConfig.validation';

const RobotConfig: FC<RobotConfigInterface> = (props) => {
	const { robotTwinsSummary } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotConfigStyle();
	const cardClasses = CardStyle();

	const params: RobotParamsInterface = useParams();
	const robot = robotTwinsSummary.content?.dataById[params.robot];

	const common = 'CONTENT.CONFIGURATION.ROBOT_CONFIG';

	const { handleChangeInput, handleBlur, handleSubmit, values, errors } =
		useForm<RobotConfigPayloadInterface>(
			{
				name: robot?.robotTitle || '',
				customerName: ''
			},
			RobotConfigValidation,
			async () => {
				console.log('called');
			}
		);

	return (
		<Card square elevation={1}>
			<CardContent className={cardClasses.sCardContent1}>
				<Typography variant="h6">{t(`${common}.TITLE`)}</Typography>
				<Typography
					variant="body2"
					color="textSecondary"
					className={classes.sRobotConfigExcerpt}>
					{t(`${common}.EXCERPT`)}
				</Typography>

				<form onSubmit={handleSubmit}>
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
							<FormControl fullWidth>
								<FormControlLabel
									control={
										<Checkbox
											color="primary"
											name="isDebug"
											//onChange={handleChangeCheckbox}
										/>
									}
									label={t(`${common}.FORM.FIELDS.CHECKBOXES.HIDDEN.LABEL`)}
								/>
							</FormControl>
							<FormControl fullWidth>
								<FormControlLabel
									control={
										<Checkbox
											color="primary"
											name="isDebug"
											//onChange={handleChangeCheckbox}
										/>
									}
									label={t(`${common}.FORM.FIELDS.CHECKBOXES.ONLINE_CHECK.LABEL`)}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<Button
								variant="outlined"
								type="submit"
								disabled={
									(!!errors && !validateEmptyObj(errors)) ||
									validateEmptyObjProperty(values)
								}
								endIcon={<CircularProgress size={20} />}>
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
