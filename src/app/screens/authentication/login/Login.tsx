import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
	Avatar,
	Box,
	Button,
	Checkbox,
	CircularProgress,
	FormControl,
	FormControlLabel,
	Grid,
	IconButton,
	InputAdornment,
	Link,
	Paper,
	TextField
} from '@mui/material';
import { FC, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Copyright from '../../../components/frame/copyrights/Copyrights';
import { AppConfigService } from '../../../services';
import { AppDispatch } from '../../../slices';
import { AuthLogin, authSelector } from '../../../slices/authentication/Auth.slice';
import { useForm } from '../../../utilities/hooks/form/UseForm';
import { validateEmptyObj } from '../../../utilities/methods/Object';
import { AuthLoginFormInterface } from '../Auth.interface';
import { LoginStyle } from './Login.style';
import { LoginValidation } from './Login.validation';

const Login: FC = () => {
	const { t } = useTranslation('AUTH');
	const classes = LoginStyle();

	const dispatch = useDispatch<AppDispatch>();
	const auth = useSelector(authSelector);

	const focus = useRef(false);
	const [showPassword, setShowPassword] = useState(false);
	const { handleChangeInput, handleChangeCheckbox, handleBlur, handleSubmit, values, errors } =
		useForm<AuthLoginFormInterface>(
			{
				email: '',
				password: '',
				rememberMe: true
			},
			LoginValidation,
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
				<Box className={classes.sBox}>
					<Avatar
						variant="square"
						className={classes.sAvatar}
						src={AppConfigService.AppImageURLs.logo.name}
						alt={AppConfigService.envCompanyName}
					/>
					<form className={classes.sForm} onSubmit={handleSubmit}>
						<FormControl fullWidth>
							<TextField
								required
								type="email"
								id="email"
								name="email"
								label={t('LOGIN.FORM.FIELDS.EMAIL.LABEL')}
								placeholder={t('LOGIN.FORM.FIELDS.EMAIL.PLACEHOLDER')}
								onChange={handleChangeInput}
								onBlur={handleBlur}
								onFocus={() => (focus.current = true)}
								error={!!errors?.email}
								helperText={errors?.email && t(errors.email)}
								InputLabelProps={{ shrink: true }}
							/>
						</FormControl>

						<FormControl fullWidth margin="normal">
							<TextField
								required
								type={showPassword ? 'text' : 'password'}
								id="password"
								name="password"
								label={t('LOGIN.FORM.FIELDS.PASSWORD.LABEL')}
								placeholder={t('LOGIN.FORM.FIELDS.PASSWORD.PLACEHOLDER')}
								onChange={handleChangeInput}
								onBlur={handleBlur}
								onFocus={() => (focus.current = true)}
								error={!!errors?.password}
								helperText={errors?.password && t(errors.password)}
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
							label={t<string>('LOGIN.FORM.FIELDS.REMEMBER_ME.LABEL')}
						/>

						<Button
							fullWidth
							variant="contained"
							type="submit"
							className={classes.sSubmit}
							disabled={
								focus.current &&
								(auth.loading || (errors && !validateEmptyObj(errors)))
							}
							endIcon={auth.loading && <CircularProgress size={20} />}
							onClick={() => (focus.current = true)}>
							{t('LOGIN.FORM.BUTTONS.SIGN_IN.LABEL')}
						</Button>

						<Box className={classes.sForgetPassword}>
							<Link
								variant="body2"
								href={AppConfigService.envResetPasswordUrl.replace(
									':realm',
									AppConfigService.envRealm
								)}
								target="_blank">
								{t('LOGIN.FORGET_PASSWORD')}
							</Link>
						</Box>

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
