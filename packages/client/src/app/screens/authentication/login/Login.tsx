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
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import Copyright from '../../../components/frame/copyrights/Copyrights';
import { AppConfigService } from '../../../services';
import { AuthLogin } from '../../../slices/auth/Auth.slice';
import { useForm } from '../../../utilities/hooks/form/UseForm';
import { somePropertiesEmpty } from '../../../utilities/methods/ObjectUtilities';
import { AuthLoginInterface } from '../Auth.interface';
import { loginStyles } from './Login.styles';
import { LoginFormValidation } from './Login.validation';

const Login: FC = () => {
	const { t } = useTranslation('GLOBAL');

	const loginClasses = loginStyles();
	const dispatch = useDispatch();

	const [showPassword, setShowPassword] = useState(false);
	const {
		handleChange,
		handleBlur,
		handleSubmit,
		values,
		errors,
		loader
	} = useForm<AuthLoginInterface>(
		{
			email: '',
			password: '',
			rememberMe: false
		},
		LoginFormValidation,
		() => formSubmit()
	);

	/**
	 * handle submit event
	 */
	const formSubmit = async () => {
		// dispatch: login
		dispatch(AuthLogin(values));
	};

	return (
		<Grid container component="section" className={loginClasses.loginRoot}>
			<Grid item xs={false} sm={6} md={8} className={loginClasses.loginImage} />
			<Grid item xs={12} sm={6} md={4} component={Paper} elevation={2} square>
				<Box className={loginClasses.loginPaper}>
					<Avatar
						variant="square"
						className={loginClasses.loginAvatar}
						src={AppConfigService.AppImageURLs.logo.name}
						alt={AppConfigService.envAuthor}
					/>
					<form className={loginClasses.loginForm} onSubmit={handleSubmit}>
						<FormControl error fullWidth margin="normal">
							<TextField
								required
								variant="outlined"
								type="text"
								id="email"
								name="email"
								error={!!errors.email}
								onChange={handleChange}
								onBlur={handleBlur}
								label={t('AUTH.LOGIN.FIELDS.EMAIL.LABEL')}
								placeholder={t('AUTH.LOGIN.FIELDS.EMAIL.PLACEHOLDER')}
								inputProps={{
									form: {
										autocomplete: 'off'
									}
								}}
							/>
							<FormHelperText>{t(errors.email)}</FormHelperText>
						</FormControl>

						<FormControl error fullWidth margin="normal">
							<TextField
								required
								variant="outlined"
								type={showPassword ? 'text' : 'password'}
								id="password"
								name="password"
								error={!!errors.password}
								onChange={handleChange}
								onBlur={handleBlur}
								label={t('AUTH.LOGIN.FIELDS.PASSWORD.LABEL')}
								placeholder={t('AUTH.LOGIN.FIELDS.PASSWORD.PLACEHOLDER')}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												edge="end"
												onClick={() => setShowPassword(!showPassword)}>
												{showPassword ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										</InputAdornment>
									)
								}}
							/>
							<FormHelperText>{t(errors.password)}</FormHelperText>
						</FormControl>

						<FormControlLabel
							control={
								<Checkbox
									name="rememberMe"
									onChange={handleChange}
									color="primary"
								/>
							}
							label={t('AUTH.LOGIN.FIELDS.REMEMBER_ME.LABEL')}
						/>

						<Button
							variant="contained"
							type="submit"
							className={loginClasses.loginSubmit}
							disabled={somePropertiesEmpty(values) || loader}
							fullWidth
							endIcon={loader && <CircularProgress size={20} />}>
							{t('AUTH.LOGIN.BUTTONS.SIGN_IN.LABEL')}
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
