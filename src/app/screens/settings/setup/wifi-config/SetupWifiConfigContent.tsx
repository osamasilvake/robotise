import { Visibility } from '@mui/icons-material';
import {
	Autocomplete,
	Button,
	Card,
	CardContent,
	Checkbox,
	FormControl,
	FormControlLabel,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Tooltip,
	Typography
} from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import YAML from 'yaml';

import { useForm } from '../../../../utilities/hooks/form/UseForm';
import { removeEmptyObjProperties } from '../../../../utilities/methods/Object';
import {
	SetupWifiConfigAuthenticationTypeEnum,
	SetupWifiConfigIpConfigTypeEnum,
	SetupWifiConfigRegisteredMacAddressTypeEnum
} from './SetupWifiConfig.enum';
import { SetupWifiConfigFormInterface } from './SetupWifiConfig.interface';
import {
	authenticationMethods,
	countriesList,
	ipConfigs,
	registeredMacAddress
} from './SetupWifiConfig.list';
import { SetupWifiConfigStyle } from './SetupWifiConfig.style';
import { WifiConfigValidation } from './SetupWifiConfig.validation';

const SetupWifiConfigContent: FC = () => {
	const { t } = useTranslation('SETUP');
	const classes = SetupWifiConfigStyle();

	const translation = 'CONTENT.WIFI_CONFIG';

	const {
		handleChangeInput,
		handleChangeSelect,
		handleChangeAutoComplete,
		handleChangeCheckbox,
		handleBlur,
		handleSubmit,
		values,
		errors
	} = useForm<SetupWifiConfigFormInterface>(
		{
			site: '',
			ssid: '',
			country: countriesList[80],
			authentication: authenticationMethods[0].id,
			pskPassword: '',
			regMacAddress: registeredMacAddress[0].id,
			macAddress: '',
			hiddenNetwork: false,
			ipConfig: ipConfigs[0].id,
			address: '',
			netmask: '',
			gateway: '',
			dnsServer: ''
		},
		WifiConfigValidation,
		async () => {
			// generate YAML
			const payload = generateYAML();

			// download YAML file
			downloadYAML(payload);
		}
	);

	const generateYAML = () => {
		// ip config
		const ipConfiguration = values.ipConfig === SetupWifiConfigIpConfigTypeEnum.STATIC && {
			static_ip_config: true,
			address:
				values.address && values.netmask
					? `${values.address}/${netmaskToCidr(values.netmask)}`
					: undefined,
			gateway: values.gateway,
			dns_server: values.dnsServer
		};

		// psk
		const psk = values.authentication === SetupWifiConfigAuthenticationTypeEnum.PSK &&
			values.pskPassword && {
				psk: values.pskPassword
			};

		// mac
		const mac = values.authentication === SetupWifiConfigAuthenticationTypeEnum.OPEN &&
			values.regMacAddress === SetupWifiConfigRegisteredMacAddressTypeEnum.YES &&
			values.macAddress && {
				mac: values.macAddress
			};

		// payload
		const payload = {
			[values.site || 'Site']: removeEmptyObjProperties({
				ssid: values.ssid,
				country: values.country?.id,
				auth: values.authentication,
				...psk,
				...mac,
				hidden: +!!values.hiddenNetwork,
				...ipConfiguration
			})
		};
		return YAML.stringify(payload);
	};

	/**
	 * netmask to cidr
	 * @param n
	 * @returns
	 */
	const netmaskToCidr = (n: string) =>
		n.split('.').reduce((c: number, o: string) => c - Math.log2(256 - +o), 32);

	/**
	 * download YAML file
	 * @param text
	 */
	const downloadYAML = (text: string) => {
		const a = window.document.createElement('a');
		a.href = window.URL.createObjectURL(new Blob([text]));
		a.download = 'wifi-configuration.yaml';

		// append anchor to body.
		document.body.appendChild(a);
		a.click();

		// remove anchor from body
		document.body.removeChild(a);
	};

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
								<Autocomplete
									disablePortal
									disableClearable
									id="country"
									options={countriesList}
									getOptionLabel={(option) => option.title}
									value={values.country}
									onChange={handleChangeAutoComplete}
									renderInput={(params) => (
										<TextField
											{...params}
											label={t(`${translation}.FORM.FIELDS.COUNTRY.LABEL`)}
										/>
									)}
									sx={{ minWidth: 250 }}
								/>
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

						<Grid item xs={12}>
							<FormControlLabel
								control={
									<Checkbox
										color="primary"
										name="hiddenNetwork"
										checked={values.hiddenNetwork}
										onChange={handleChangeCheckbox}
									/>
								}
								label={t<string>(`${translation}.FORM.FIELDS.HIDDEN_NETWORK.LABEL`)}
							/>
						</Grid>

						<Grid item xs={12}>
							<FormControl fullWidth margin="normal">
								<InputLabel id="label-ip-config">
									{t(`${translation}.FORM.FIELDS.IP_CONFIG.LABEL`)}
								</InputLabel>
								<Select
									labelId="label-ip-config"
									id="ipConfig"
									name="ipConfig"
									label={t(`${translation}.FORM.FIELDS.IP_CONFIG.LABEL`)}
									value={values.ipConfig}
									onChange={handleChangeSelect}>
									{ipConfigs.map((config) => (
										<MenuItem key={config.id} value={config.id}>
											{config.title}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>

						{values?.ipConfig === SetupWifiConfigIpConfigTypeEnum.STATIC && (
							<>
								<Grid item xs={12} md={6}>
									<FormControl fullWidth margin="normal">
										<TextField
											required
											type="text"
											id="address"
											name="address"
											label={t(`${translation}.FORM.FIELDS.ADDRESS.LABEL`)}
											placeholder={t(
												`${translation}.FORM.FIELDS.ADDRESS.PLACEHOLDER`
											)}
											value={values?.address}
											onChange={handleChangeInput}
											onBlur={handleBlur}
											error={!!errors?.address}
											helperText={errors?.address && t(errors.address)}
										/>
									</FormControl>
								</Grid>

								<Grid item xs={12} md={6}>
									<FormControl fullWidth margin="normal">
										<TextField
											required
											type="text"
											id="netmask"
											name="netmask"
											label={t(`${translation}.FORM.FIELDS.NETMASK.LABEL`)}
											placeholder={t(
												`${translation}.FORM.FIELDS.NETMASK.PLACEHOLDER`
											)}
											value={values?.netmask}
											onChange={handleChangeInput}
											onBlur={handleBlur}
											error={!!errors?.netmask}
											helperText={errors?.netmask && t(errors.netmask)}
										/>
									</FormControl>
								</Grid>

								<Grid item xs={12} md={6}>
									<FormControl fullWidth margin="normal">
										<TextField
											required
											type="text"
											id="gateway"
											name="gateway"
											label={t(`${translation}.FORM.FIELDS.GATEWAY.LABEL`)}
											placeholder={t(
												`${translation}.FORM.FIELDS.GATEWAY.PLACEHOLDER`
											)}
											value={values?.gateway}
											onChange={handleChangeInput}
											onBlur={handleBlur}
											error={!!errors?.gateway}
											helperText={errors?.gateway && t(errors.gateway)}
										/>
									</FormControl>
								</Grid>

								<Grid item xs={12} md={6}>
									<FormControl fullWidth margin="normal">
										<TextField
											required
											type="text"
											id="dnsServer"
											name="dnsServer"
											label={t(`${translation}.FORM.FIELDS.DNS_SERVER.LABEL`)}
											placeholder={t(
												`${translation}.FORM.FIELDS.DNS_SERVER.PLACEHOLDER`
											)}
											value={values?.dnsServer}
											onChange={handleChangeInput}
											onBlur={handleBlur}
											error={!!errors?.dnsServer}
											helperText={errors?.dnsServer && t(errors.dnsServer)}
										/>
									</FormControl>
								</Grid>
							</>
						)}

						<Grid item xs={12} className={classes.sSubmit}>
							<Button variant="outlined" type="submit">
								{t(`${translation}.FORM.BUTTONS.DOWNLOAD`)}
							</Button>

							<Tooltip
								title={
									<Typography variant="body2" className={classes.sPreview}>
										{generateYAML()}
									</Typography>
								}
								placement="top">
								<Button
									variant="text"
									type="button"
									className={classes.sPreviewButton}
									endIcon={<Visibility />}>
									{t(`${translation}.FORM.BUTTONS.PREVIEW`)}
								</Button>
							</Tooltip>
						</Grid>
					</Grid>
				</form>
			</CardContent>
		</Card>
	);
};
export default SetupWifiConfigContent;
