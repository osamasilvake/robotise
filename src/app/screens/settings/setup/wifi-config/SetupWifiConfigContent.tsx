import {
	Button,
	Card,
	CardContent,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography
} from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import YAML from 'yaml';

import { useForm } from '../../../../utilities/hooks/form/UseForm';
import {
	SetupWifiConfigAuthenticationTypeEnum,
	SetupWifiConfigRegisteredMacAddressTypeEnum
} from './SetupWifiConfig.enum';
import { SetupWifiConfigFormInterface } from './SetupWifiConfig.interface';
import { authenticationMethods, countriesList, registeredMacAddress } from './SetupWifiConfig.list';
import { SetupWifiConfigStyle } from './SetupWifiConfig.style';
import { WifiConfigValidation } from './SetupWifiConfig.validation';

const SetupWifiConfigContent: FC = () => {
	const { t } = useTranslation('SETUP');
	const classes = SetupWifiConfigStyle();

	const translation = 'CONTENT.WIFI_CONFIG';

	const { handleChangeInput, handleChangeSelect, handleBlur, handleSubmit, values, errors } =
		useForm<SetupWifiConfigFormInterface>(
			{
				site: '',
				ssid: '',
				country: countriesList[0].code,
				authentication: authenticationMethods[0].id,
				pskPassword: '',
				regMacAddress: registeredMacAddress[0].id,
				macAddress: ''
			},
			WifiConfigValidation,
			async () => {
				const payload = {
					[values.site]: {
						ssid: values.ssid,
						country: values.country,
						auth: values.authentication,
						psk:
							values.authentication === SetupWifiConfigAuthenticationTypeEnum.PSK
								? values.pskPassword || undefined
								: undefined,
						mac:
							values.authentication === SetupWifiConfigAuthenticationTypeEnum.OPEN &&
							values.regMacAddress === SetupWifiConfigRegisteredMacAddressTypeEnum.YES
								? values.macAddress || undefined
								: undefined
					}
				};
				console.log(YAML.stringify(payload));
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
									id="site"
									name="site"
									label={t(`${translation}.FORM.FIELDS.SITE.LABEL`)}
									placeholder={t(`${translation}.FORM.FIELDS.SITE.PLACEHOLDER`)}
									value={values?.site}
									onChange={handleChangeInput}
									onBlur={handleBlur}
									error={!!errors?.site}
									helperText={errors?.site && t(errors.site)}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12} md={6}>
							<FormControl fullWidth margin="normal">
								<TextField
									required
									type="text"
									id="ssid"
									name="ssid"
									label={t(`${translation}.FORM.FIELDS.SSID.LABEL`)}
									placeholder={t(`${translation}.FORM.FIELDS.SSID.PLACEHOLDER`)}
									value={values?.ssid}
									onChange={handleChangeInput}
									onBlur={handleBlur}
									error={!!errors?.ssid}
									helperText={errors?.ssid && t(errors.ssid)}
								/>
							</FormControl>
						</Grid>

						<Grid item xs={12}>
							<FormControl fullWidth margin="normal">
								<InputLabel id="label-country">
									{t(`${translation}.FORM.FIELDS.COUNTRY.LABEL`)}
								</InputLabel>
								<Select
									labelId="label-country"
									id="country"
									name="country"
									label={t(`${translation}.FORM.FIELDS.COUNTRY.LABEL`)}
									value={values.country}
									onChange={handleChangeSelect}>
									{countriesList.map((country) => (
										<MenuItem key={country.code} value={country.code}>
											{country.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>

						<Grid item xs={12} md={6}>
							<FormControl fullWidth margin="normal">
								<InputLabel id="label-authentication">
									{t(`${translation}.FORM.FIELDS.AUTHENTICATION.LABEL`)}
								</InputLabel>
								<Select
									labelId="label-authentication"
									id="authentication"
									name="authentication"
									label={t(`${translation}.FORM.FIELDS.AUTHENTICATION.LABEL`)}
									value={values.authentication}
									onChange={handleChangeSelect}>
									{authenticationMethods.map((authentication) => (
										<MenuItem key={authentication.id} value={authentication.id}>
											{authentication.title}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>

						{values?.authentication === SetupWifiConfigAuthenticationTypeEnum.PSK && (
							<Grid item xs={12} md={6}>
								<FormControl fullWidth margin="normal">
									<TextField
										required
										type="text"
										id="pskPassword"
										name="pskPassword"
										label={t(`${translation}.FORM.FIELDS.PSK_PASSWORD.LABEL`)}
										placeholder={t(
											`${translation}.FORM.FIELDS.PSK_PASSWORD.PLACEHOLDER`
										)}
										value={values?.pskPassword}
										onChange={handleChangeInput}
										onBlur={handleBlur}
										error={!!errors?.pskPassword}
										helperText={errors?.pskPassword && t(errors.pskPassword)}
									/>
								</FormControl>
							</Grid>
						)}

						{values?.authentication === SetupWifiConfigAuthenticationTypeEnum.OPEN && (
							<>
								<Grid item xs={12} md={6}>
									<FormControl fullWidth margin="normal">
										<InputLabel id="label-registered-mac-address">
											{t(`${translation}.FORM.FIELDS.REG_MAC_ADDRESS.LABEL`)}
										</InputLabel>
										<Select
											labelId="label-registered-mac-address"
											id="regMacAddress"
											name="regMacAddress"
											label={t(
												`${translation}.FORM.FIELDS.REG_MAC_ADDRESS.LABEL`
											)}
											value={values.regMacAddress}
											onChange={handleChangeSelect}>
											{registeredMacAddress.map((regMacAddress) => (
												<MenuItem
													key={regMacAddress.id}
													value={regMacAddress.id}>
													{regMacAddress.title}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</Grid>

								{values?.regMacAddress ===
									SetupWifiConfigRegisteredMacAddressTypeEnum.YES && (
									<Grid item xs={12} md={6}>
										<FormControl fullWidth margin="normal">
											<TextField
												type="text"
												id="macAddress"
												name="macAddress"
												label={t(
													`${translation}.FORM.FIELDS.MAC_ADDRESS.LABEL`
												)}
												placeholder={t(
													`${translation}.FORM.FIELDS.MAC_ADDRESS.PLACEHOLDER`
												)}
												value={values?.macAddress}
												onChange={handleChangeInput}
												onBlur={handleBlur}
												error={!!errors?.macAddress}
												helperText={
													errors?.macAddress && t(errors.macAddress)
												}
											/>
										</FormControl>
									</Grid>
								)}
							</>
						)}

						<Grid item xs={12} className={classes.sSubmit}>
							<Button variant="outlined" type="submit">
								{t(`${translation}.FORM.BUTTONS.DOWNLOAD`)}
							</Button>
						</Grid>
					</Grid>
				</form>
			</CardContent>
		</Card>
	);
};
export default SetupWifiConfigContent;
