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
import { validateEmptyObjProperty } from '../../../utilities/methods/ObjectUtilities';
import { AuthLoginInterface } from '../Auth.interface';
import { LoginStyles } from './Login.style';
import { LoginFormValidation } from './Login.validation';

const Login: FC = () => {
	const { t } = useTranslation('AUTH');
	const classes = LoginStyles();

	const dispatch = useDispatch();
	const auth = useSelector(authSelector);

	const [showPassword, setShowPassword] = useState(false);
	const { handleChange, handleBlur, handleSubmit, values, errors } = useForm<AuthLoginInterface>(
		{
			email: '',
			password: '',
			rememberMe: false
		},
		LoginFormValidation,
		async () => {
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
						alt={AppConfigService.envAuthor}
					/>
					<form className={classes.sForm} onSubmit={handleSubmit}>
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
								label={t('LOGIN.FIELDS.EMAIL.LABEL')}
								placeholder={t('LOGIN.FIELDS.EMAIL.PLACEHOLDER')}
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
								label={t('LOGIN.FIELDS.PASSWORD.LABEL')}
								placeholder={t('LOGIN.FIELDS.PASSWORD.PLACEHOLDER')}
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
							<FormHelperText>{t(errors.password)}</FormHelperText>
						</FormControl>

						<FormControlLabel
							className={classes.sFormCheckbox}
							control={
								<Checkbox
									name="rememberMe"
									onChange={handleChange}
									color="primary"
								/>
							}
							label={t('LOGIN.FIELDS.REMEMBER_ME.LABEL')}
						/>

						<Button
							variant="contained"
							type="submit"
							className={classes.sSubmit}
							disabled={validateEmptyObjProperty(values) || auth.loading}
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
