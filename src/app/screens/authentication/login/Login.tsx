import {
	Avatar,
	Box,
	Button,
	Checkbox,
	CircularProgress,
	FormControl,
	FormControlLabel,
	FormHelperText,
	Grid,
	IconButton,
	InputAdornment,
	Paper,
	TextField
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Copyright from '../../../components/frame/copyrights/Copyrights';
import { AppConfigService } from '../../../services';
import { AuthLogin, authSelector } from '../../../slices/auth/Auth.slice';
import { useForm } from '../../../utilities/hooks/form/UseForm';
import {
	validateEmptyObj,
	validateEmptyObjProperty
} from '../../../utilities/methods/ObjectUtilities';
import { AuthLoginPayloadInterface } from '../Auth.interface';
import { LoginStyle } from './Login.style';
import { LoginFormValidation } from './Login.validation';

const Login: FC = () => {
	const { t } = useTranslation('AUTH');
	const classes = LoginStyle();

	const dispatch = useDispatch();
	const auth = useSelector(authSelector);

	const [showPassword, setShowPassword] = useState(false);
	const { handleChangeInput, handleChangeCheckbox, handleBlur, handleSubmit, values, errors } =
		useForm<AuthLoginPayloadInterface>(
			{
				email: '',
				password: '',
				rememberMe: true
			},
			LoginFormValidation,
			async () => {
				// dispatch: login
				dispatch(AuthLogin(values));
			}
		);

	/**
	 * handle set password
	 * @param value
	 * @returns
	 */
	const handleSetPassword = (value: boolean) => () => {
		setShowPassword(value);
	};

	return (
		<Grid container component="section" className={classes.sRoot}>
			<Grid item xs={false} sm={6} md={8} className={classes.sImage} />
			<Grid item xs={12} sm={6} md={4} component={Paper} elevation={2} square>
				<Box className={classes.sPaper}>
					<Avatar
						variant="square"
						className={classes.sAvatar}
						src={AppConfigService.AppImageURLs.logo.name}
						alt={AppConfigService.envCompanyName}
					/>
					<form className={classes.sForm} onSubmit={handleSubmit}>
						<FormControl error fullWidth margin="normal">
							<TextField
								required
								variant="outlined"
								type="email"
								id="email"
								name="email"
								error={!!errors?.email}
								onChange={handleChangeInput}
								onBlur={handleBlur}
								label={t('LOGIN.FIELDS.EMAIL.LABEL')}
								placeholder={t('LOGIN.FIELDS.EMAIL.PLACEHOLDER')}
								InputLabelProps={{ shrink: true }}
							/>
							{errors?.email && <FormHelperText>{t(errors.email)}</FormHelperText>}
						</FormControl>

						<FormControl error fullWidth margin="normal">
							<TextField
								required
								variant="outlined"
								type={showPassword ? 'text' : 'password'}
								id="password"
								name="password"
								error={!!errors?.password}
								onChange={handleChangeInput}
								onBlur={handleBlur}
								label={t('LOGIN.FIELDS.PASSWORD.LABEL')}
								placeholder={t('LOGIN.FIELDS.PASSWORD.PLACEHOLDER')}
								InputLabelProps={{ shrink: true }}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												edge="end"
												onClick={handleSetPassword(!showPassword)}>
												{showPassword ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										</InputAdornment>
									)
								}}
							/>
							{errors?.password && (
								<FormHelperText>{t(errors.password)}</FormHelperText>
							)}
						</FormControl>

						<FormControlLabel
							className={classes.sFormCheckbox}
							control={
								<Checkbox
									color="primary"
									name="rememberMe"
									checked={values.rememberMe}
									onChange={handleChangeCheckbox}
								/>
							}
							label={t('LOGIN.FIELDS.REMEMBER_ME.LABEL')}
						/>

						<Button
							variant="contained"
							type="submit"
							className={classes.sSubmit}
							disabled={
								(!!errors && !validateEmptyObj(errors)) ||
								validateEmptyObjProperty(values) ||
								auth.loading
							}
							fullWidth
							endIcon={auth.loading && <CircularProgress size={20} />}>
							{t('LOGIN.BUTTONS.SIGN_IN.LABEL')}
						</Button>

						<Box mt={5}>
							<Copyright />
						</Box>
					</form>
				</Box>
			</Grid>
		</Grid>
	);
};
export default Login;
