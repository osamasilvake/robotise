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
import { useParams } from 'react-router-dom';

import { AppDispatch } from '../../../../../../../slices';
import { SitePaymentSettingsUpdate } from '../../../../../../../slices/business/sites/configuration/cloud/SiteCloudConfiguration.slice';
import { SitesFetchList } from '../../../../../../../slices/business/sites/Sites.slice';
import { useForm } from '../../../../../../../utilities/hooks/form/UseForm';
import { validateEmptyObj } from '../../../../../../../utilities/methods/Object';
import { SiteParamsInterface } from '../../../../Site.interface';
import {
	SiteConfigurationPaymentSettingsFormInterface,
	SiteConfigurationPaymentSettingsInterface
} from './SiteConfigurationPaymentSettings.interface';
import { SiteConfigurationPaymentSettingsStyle } from './SiteConfigurationPaymentSettings.style';
import { SiteConfigurationPaymentSettingsValidation } from './SiteConfigurationPaymentSettings.validation';

const SiteConfigurationPaymentSettings: FC<SiteConfigurationPaymentSettingsInterface> = (props) => {
	const { sites, siteCloudConfiguration } = props;
	const { t } = useTranslation(['SITES', 'GENERAL']);
	const classes = SiteConfigurationPaymentSettingsStyle();

	const dispatch = useDispatch<AppDispatch>();

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;

	const cSiteId = params.siteId;
	const siteSingle = sites.content?.dataById[cSiteId];
	const paymentConfigs = siteSingle?.paymentConfigs;
	const translation = 'CONTENT.CONFIGURATION.PAYMENT_SETTINGS';

	const { handleChangeInput, handleChangeCheckbox, handleBlur, handleSubmit, values, errors } =
		useForm<SiteConfigurationPaymentSettingsFormInterface>(
			{
				accountId: paymentConfigs?.accountId || '',
				defaultPreAuthorizedAmount: paymentConfigs?.defaultPreAuthorizedAmount || 0,
				enabled: !!paymentConfigs?.enabled,
				liveMode: !!paymentConfigs?.liveMode
			},
			SiteConfigurationPaymentSettingsValidation,
			async () => {
				if (siteSingle) {
					// dispatch: update payment settings
					dispatch(
						SitePaymentSettingsUpdate(cSiteId, values, () => {
							// dispatch: fetch sites
							dispatch(SitesFetchList(true));
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
						<Grid item xs={12}>
							<FormControl>
								<FormControlLabel
									control={
										<Switch
											name="enabled"
											checked={values.enabled}
											onChange={handleChangeCheckbox}
										/>
									}
									label={t<string>(
										`${translation}.FORM.FIELDS.CHECKBOXES.ENABLED.LABEL`
									)}
								/>
								<FormHelperText>
									{t(`${translation}.FORM.FIELDS.CHECKBOXES.ENABLED.NOTE`)}
								</FormHelperText>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<FormControl>
								<FormControlLabel
									control={
										<Switch
											name="liveMode"
											checked={values.liveMode}
											onChange={handleChangeCheckbox}
										/>
									}
									label={t<string>(
										`${translation}.FORM.FIELDS.CHECKBOXES.LIVE_MODE.LABEL`
									)}
								/>
								<FormHelperText>
									{t(`${translation}.FORM.FIELDS.CHECKBOXES.LIVE_MODE.NOTE`)}
								</FormHelperText>
							</FormControl>
						</Grid>
						<Grid item sm={12} md={6}>
							<FormControl fullWidth margin="normal">
								<TextField
									required
									type="text"
									id="accountId"
									name="accountId"
									label={t(`${translation}.FORM.FIELDS.ACCOUNT_ID.LABEL`)}
									placeholder={t(
										`${translation}.FORM.FIELDS.ACCOUNT_ID.PLACEHOLDER`
									)}
									value={values?.accountId}
									onChange={handleChangeInput}
									onBlur={handleBlur}
									error={!!errors?.accountId}
									helperText={errors?.accountId && t(errors.accountId)}
								/>
								<FormHelperText>
									{t(`${translation}.FORM.FIELDS.ACCOUNT_ID.NOTE`)}
								</FormHelperText>
							</FormControl>
						</Grid>
						<Grid item sm={12} md={6}>
							<FormControl fullWidth margin="normal">
								<TextField
									required
									type="number"
									id="defaultPreAuthorizedAmount"
									name="defaultPreAuthorizedAmount"
									label={t(
										`${translation}.FORM.FIELDS.PRE_AUTHORIZED_AMOUNT.LABEL`
									)}
									placeholder={t(
										`${translation}.FORM.FIELDS.PRE_AUTHORIZED_AMOUNT.PLACEHOLDER`
									)}
									value={values?.defaultPreAuthorizedAmount}
									onChange={handleChangeInput}
									onBlur={handleBlur}
									error={!!errors?.defaultPreAuthorizedAmount}
									helperText={
										errors?.defaultPreAuthorizedAmount &&
										t(String(errors.defaultPreAuthorizedAmount))
									}
									InputProps={{ inputProps: { min: 5, max: 150 } }}
								/>
								<FormHelperText>
									{t(`${translation}.FORM.FIELDS.PRE_AUTHORIZED_AMOUNT.NOTE`)}
								</FormHelperText>
							</FormControl>
						</Grid>
						<Grid item xs={12} className={classes.sSubmit}>
							<Button
								variant="outlined"
								type="submit"
								disabled={
									siteCloudConfiguration.paymentSettings.loading ||
									(!!errors && !validateEmptyObj(errors))
								}
								endIcon={
									siteCloudConfiguration.paymentSettings.loading && (
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
export default SiteConfigurationPaymentSettings;
