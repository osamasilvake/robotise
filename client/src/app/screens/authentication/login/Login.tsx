import { InputAdornment } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
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
	Paper,
	TextField
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import Copyright from '../../../frame/copyrights/Copyrights';
import { ConfigService } from '../../../services';
import { AuthLogin } from '../../../slices/auth/Auth.slice';
import { useForm } from '../../../utilities/hooks/UseForm';
import { allPropertiesEmpty } from '../../../utilities/methods/validateObjProperties';
import { AuthLoginInterface } from '../Auth.interface';
import { loginStyles } from './Login.styles';
import { LoginFormValidation } from './Login.validation';

const Login: FC = () => {
	const { t } = useTranslation('GLOBAL');

	const loginClasses = loginStyles();
	const dispatch = useDispatch();

	const [showPassword, setShowPassword] = useState(false);
	const { handleChange, handleSubmit, values, errors, loader } = useForm<AuthLoginInterface>(
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
		// dummy
		await new Promise((resolve) => setTimeout(resolve, 4000));

		// dispatch
		dispatch(AuthLogin(values));
	};

	return (
		<Grid container component="section" className={loginClasses.root}>
			<Grid item xs={false} sm={6} md={7} className={loginClasses.image} />
			<Grid
				item
				xs={12}
				sm={6}
				md={5}
				component={Paper}
				elevation={6}
				square
				className={loginClasses.content}>
				<Box className={loginClasses.paper}>
					<Avatar
						className={loginClasses.large}
						alt={ConfigService.envAuthor}
						src={ConfigService.AppImageURLs.logo.name}
					/>
					<form className={loginClasses.form} onSubmit={handleSubmit}>
						<FormControl error fullWidth margin="normal">
							<TextField
								required
								variant="outlined"
								type="text"
								id="email"
								name="email"
								error={!!errors.email}
								onChange={handleChange}
								label={t('AUTH.LOGIN.EMAIL.LABEL')}
								placeholder={t('AUTH.LOGIN.EMAIL.PLACEHOLDER')}
								inputProps={{
									className: loginClasses.input,
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
								label={t('AUTH.LOGIN.PASSWORD.LABEL')}
								placeholder={t('AUTH.LOGIN.PASSWORD.PLACEHOLDER')}
								InputProps={{
									classes: {
										input: loginClasses.input
									},
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
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
							label={t('AUTH.LOGIN.REMEMBER_ME.LABEL')}
						/>

						<Button
							color="primary"
							variant="contained"
							type="submit"
							className={loginClasses.submit}
							disabled={loader || !allPropertiesEmpty(errors)}
							fullWidth
							endIcon={loader && <CircularProgress size={20} />}>
							{t('AUTH.LOGIN.SIGN_IN.LABEL')}
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
