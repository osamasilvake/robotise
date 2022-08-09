import {
	Autocomplete,
	Button,
	Card,
	CardContent,
	CircularProgress,
	FormControl,
	FormControlLabel,
	FormHelperText,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	Switch,
	TextField,
	Typography
} from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppConfigService } from '../../../../../../services';
import { AppDispatch } from '../../../../../../slices';
import { generalOperationsSelector } from '../../../../../../slices/business/general/GeneralOperations.slice';
import { SiteConfigUpdate } from '../../../../../../slices/business/sites/SiteOperations.slice';
import { SitesFetchList } from '../../../../../../slices/business/sites/Sites.slice';
import { useForm } from '../../../../../../utilities/hooks/form/UseForm';
import { validateEmptyObj } from '../../../../../../utilities/methods/Object';
import { SiteParamsInterface } from '../../../Site.interface';
import { SiteConfigOrderOriginsTypeEnum } from './SiteConfig.enum';
import { SiteConfigFormInterface, SiteConfigInterface } from './SiteConfig.interface';
import { SiteConfigStyle } from './SiteConfig.style';
import { SiteConfigValidation } from './SiteConfig.validation';

const SiteConfig: FC<SiteConfigInterface> = (props) => {
	const { sites, siteOperations } = props;
	const { t } = useTranslation(['SITES', 'GENERAL']);
	const classes = SiteConfigStyle();

	const dispatch = useDispatch<AppDispatch>();
	const generalOperations = useSelector(generalOperationsSelector);

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;

	const cSiteId = params.siteId;
	const siteSingle = sites.content?.dataById[cSiteId];
	const orderModesList = generalOperations.orderModes.content?.data?.map((m) => m.mode);
	const orderOriginsList = siteOperations.orderOrigins.content?.data
		?.filter(
			(o) =>
				o.origin !== SiteConfigOrderOriginsTypeEnum.DEBUG &&
				o.origin !== SiteConfigOrderOriginsTypeEnum.REST &&
				o.origin !== SiteConfigOrderOriginsTypeEnum.API_HOTEL &&
				o.origin !== SiteConfigOrderOriginsTypeEnum.CUSTOMER_APP &&
				o.origin !== SiteConfigOrderOriginsTypeEnum.MANUAL_GUI
		)
		.map((o) => o.origin);
	const customerNotificationTypes = siteOperations.customerNotificationTypes.content?.data?.map(
		(c) => c.type
	);
	const currencies = AppConfigService.AppOptions.common.currencies;
	const timezones = AppConfigService.AppOptions.common.timezones;
	const translation = 'CONTENT.CONFIGURATION.SITE_CONFIG';

	const {
		handleChangeInput,
		handleChangeInputs,
		handleChangeSelect,
		handleChangeCheckbox,
		handleBlur,
		handleSubmit,
		values,
		errors
	} = useForm<SiteConfigFormInterface>(
		{
			title: siteSingle?.title || '',
			timezone: siteSingle?.timezone || AppConfigService.AppOptions.common.timezones[0].id,
			currency: siteSingle?.currency || AppConfigService.AppOptions.common.currencies[0].id,
			availableOrderModes: siteSingle?.configs.availableOrderModes || [],
			orderOriginsEnabled: siteSingle?.configs.orderOriginsEnabled || [],
			customerNotificationTypesEnabled:
				siteSingle?.configs.customerNotificationTypesEnabled || [],
			helpPage: siteSingle?.configs.helpPage || '',
			showEmergencyWorkflow: !!siteSingle?.configs.showEmergencyWorkflow,
			showPerformanceDashboard: !!siteSingle?.configs.showPerformanceDashboard,
			isHidden: !!siteSingle?.configs.isHidden
		},
		SiteConfigValidation,
		async () => {
			const payload = {
				...values,
				defaultOrderMode: values.availableOrderModes[0]
			};

			if (siteSingle) {
				// dispatch: update site config
				dispatch(
					SiteConfigUpdate(cSiteId, payload, () => {
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
							<FormControl fullWidth margin="normal">
								<TextField
									required
									type="string"
									id="title"
									name="title"
									label={t(`${translation}.FORM.FIELDS.TITLE.LABEL`)}
									placeholder={t(`${translation}.FORM.FIELDS.TITLE.PLACEHOLDER`)}
									value={values?.title}
									onChange={handleChangeInput}
									onBlur={handleBlur}
									error={!!errors?.title}
									helperText={errors?.title && t(errors.title)}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={6}>
							<FormControl fullWidth margin="normal">
								<InputLabel id="label-currencyId">
									{t(`${translation}.FORM.FIELDS.CURRENCY.LABEL`)}
								</InputLabel>
								<Select
									labelId="label-currencyId"
									id="currency"
									name="currency"
									label={t(`${translation}.FORM.FIELDS.CURRENCY.LABEL`)}
									value={values.currency}
									onChange={handleChangeSelect}>
									{currencies.map((currency) => (
										<MenuItem key={currency.id} value={currency.id}>
											{currency.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={6}>
							<FormControl fullWidth margin="normal">
								<InputLabel id="label-timezoneId">
									{t(`${translation}.FORM.FIELDS.TIMEZONE.LABEL`)}
								</InputLabel>
								<Select
									labelId="label-timezoneId"
									id="timezone"
									name="timezone"
									label={t(`${translation}.FORM.FIELDS.TIMEZONE.LABEL`)}
									value={values.timezone}
									onChange={handleChangeSelect}>
									{timezones.map((timezone) => (
										<MenuItem key={timezone.id} value={timezone.id}>
											{timezone.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						{orderModesList && (
							<Grid item xs={12}>
								<FormControl fullWidth margin="normal">
									<Autocomplete
										disablePortal
										multiple
										id="availableOrderModes"
										options={orderModesList}
										getOptionLabel={(option) =>
											t(`GENERAL:COMMON.MODE.${option}`)
										}
										value={values.availableOrderModes || []}
										isOptionEqualToValue={(option, value) => option === value}
										onChange={(_, values) =>
											handleChangeInputs('availableOrderModes', values)
										}
										onBlur={handleBlur}
										renderInput={(params) => (
											<TextField
												{...params}
												label={t(
													`${translation}.FORM.FIELDS.ORDER_MODE.LABEL`
												)}
												placeholder={t(
													`${translation}.FORM.FIELDS.ORDER_MODE.PLACEHOLDER`
												)}
												error={!!errors?.availableOrderModes[0]}
												helperText={
													errors?.availableOrderModes[0] &&
													t(errors.availableOrderModes[0])
												}
											/>
										)}
									/>
								</FormControl>

								<FormHelperText>
									{t(`${translation}.FORM.FIELDS.ORDER_MODE.NOTE`)}
									{values.availableOrderModes[0] && (
										<>: ({values.availableOrderModes[0]})</>
									)}
								</FormHelperText>
							</Grid>
						)}
						{orderOriginsList && (
							<Grid item xs={12}>
								<FormControl fullWidth margin="normal">
									<Autocomplete
										disablePortal
										multiple
										id="orderOriginsEnabled"
										options={orderOriginsList}
										getOptionLabel={(option) =>
											t(
												`${translation}.FORM.FIELDS.ORDER_ORIGINS.OPTIONS.${option}`
											)
										}
										value={
											values?.orderOriginsEnabled?.filter(
												(o) =>
													o !== SiteConfigOrderOriginsTypeEnum.DEBUG &&
													o !== SiteConfigOrderOriginsTypeEnum.REST &&
													o !==
														SiteConfigOrderOriginsTypeEnum.API_HOTEL &&
													o !==
														SiteConfigOrderOriginsTypeEnum.CUSTOMER_APP &&
													o !== SiteConfigOrderOriginsTypeEnum.MANUAL_GUI
											) || []
										}
										isOptionEqualToValue={(option, value) => option === value}
										onChange={(_, values) =>
											handleChangeInputs('orderOriginsEnabled', values)
										}
										onBlur={handleBlur}
										renderInput={(params) => (
											<TextField
												{...params}
												label={t(
													`${translation}.FORM.FIELDS.ORDER_ORIGINS.LABEL`
												)}
												placeholder={t(
													`${translation}.FORM.FIELDS.ORDER_ORIGINS.PLACEHOLDER`
												)}
												error={!!errors?.orderOriginsEnabled[0]}
												helperText={
													errors?.orderOriginsEnabled[0] &&
													t(errors.orderOriginsEnabled[0])
												}
											/>
										)}
									/>
								</FormControl>

								<FormHelperText>
									{t(`${translation}.FORM.FIELDS.ORDER_ORIGINS.NOTE`, {
										value: 'DEBUG, REST, API_HOTEL, CUSTOMER_APP, MANUAL_GUI'
									})}
								</FormHelperText>
							</Grid>
						)}
						{customerNotificationTypes && (
							<Grid item xs={12}>
								<FormControl fullWidth margin="normal">
									<Autocomplete
										disablePortal
										multiple
										id="customerNotificationTypesEnabled"
										options={customerNotificationTypes}
										getOptionLabel={(option) =>
											t(
												`${translation}.FORM.FIELDS.CUSTOMER_NOTIFICATION_TYPES.OPTIONS.${option}`
											)
										}
										value={values.customerNotificationTypesEnabled || []}
										isOptionEqualToValue={(option, value) => option === value}
										onChange={(_, values) =>
											handleChangeInputs(
												'customerNotificationTypesEnabled',
												values
											)
										}
										onBlur={handleBlur}
										renderInput={(params) => (
											<TextField
												{...params}
												label={t(
													`${translation}.FORM.FIELDS.CUSTOMER_NOTIFICATION_TYPES.LABEL`
												)}
												placeholder={t(
													`${translation}.FORM.FIELDS.CUSTOMER_NOTIFICATION_TYPES.PLACEHOLDER`
												)}
												error={
													!!errors?.customerNotificationTypesEnabled[0]
												}
												helperText={
													errors?.customerNotificationTypesEnabled[0] &&
													t(errors.customerNotificationTypesEnabled[0])
												}
											/>
										)}
									/>
								</FormControl>
							</Grid>
						)}
						<Grid item xs={12}>
							<FormControl fullWidth margin="normal">
								<TextField
									required
									type="text"
									id="helpPage"
									name="helpPage"
									label={t(`${translation}.FORM.FIELDS.HELP_PAGE.LABEL`)}
									placeholder={t(
										`${translation}.FORM.FIELDS.HELP_PAGE.PLACEHOLDER`
									)}
									value={values?.helpPage}
									onChange={handleChangeInput}
									onBlur={handleBlur}
									error={!!errors?.helpPage}
									helperText={errors?.helpPage && t(errors.helpPage)}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<FormControl>
								<FormControlLabel
									control={
										<Switch
											name="showEmergencyWorkflow"
											checked={values.showEmergencyWorkflow}
											onChange={handleChangeCheckbox}
										/>
									}
									label={t<string>(
										`${translation}.FORM.FIELDS.CHECKBOXES.EMERGENCY.LABEL`
									)}
								/>
								<FormHelperText>
									{t(`${translation}.FORM.FIELDS.CHECKBOXES.EMERGENCY.NOTE`)}
								</FormHelperText>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<FormControl>
								<FormControlLabel
									control={
										<Switch
											name="showPerformanceDashboard"
											checked={values.showPerformanceDashboard}
											onChange={handleChangeCheckbox}
										/>
									}
									label={t<string>(
										`${translation}.FORM.FIELDS.CHECKBOXES.PERFORMANCE.LABEL`
									)}
								/>
								<FormHelperText>
									{t(`${translation}.FORM.FIELDS.CHECKBOXES.PERFORMANCE.NOTE`)}
								</FormHelperText>
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
								<FormHelperText>
									{t(`${translation}.FORM.FIELDS.CHECKBOXES.HIDDEN.NOTE`)}
								</FormHelperText>
							</FormControl>
						</Grid>
						<Grid item xs={12} className={classes.sSubmit}>
							<Button
								variant="outlined"
								type="submit"
								disabled={
									siteOperations.siteConfig.loading ||
									(!!errors && !validateEmptyObj(errors))
								}
								endIcon={
									siteOperations.siteConfig.loading && (
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
export default SiteConfig;
