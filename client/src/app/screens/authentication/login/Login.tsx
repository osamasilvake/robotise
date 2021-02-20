import {
	Avatar,
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	Paper,
	TextField
} from '@material-ui/core';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { AppImageURLs, AppOptions } from '../../../../app.config';
import Copyright from '../../../frame/copyrights/Copyrights';
import { loginStyles } from './Login.styles';

const Login: FC = () => {
	const classes = loginStyles();
	const { t } = useTranslation('GLOBAL');

	return (
		<Grid container component="section" className={classes.root}>
			<Grid item xs={false} sm={6} md={7} className={classes.image} />
			<Grid
				item
				xs={12}
				sm={6}
				md={5}
				component={Paper}
				elevation={6}
				square
				className={classes.content}>
				<div className={classes.paper}>
					<Avatar
						className={classes.large}
						alt={process.env.REACT_APP_AUTHOR}
						src={AppImageURLs.logo.name}
					/>
					<form className={classes.form} noValidate>
						<TextField
							required
							type="text"
							id="email"
							name="email"
							variant="outlined"
							margin="normal"
							label="Email Address"
							autoComplete="email"
							fullWidth
							inputProps={{ className: classes.input }}
						/>
						<TextField
							required
							type="password"
							id="password"
							name="password"
							variant="outlined"
							margin="normal"
							label="Password"
							autoComplete="current-password"
							fullWidth
							inputProps={{ className: classes.input }}
						/>
						<FormControlLabel
							control={<Checkbox value="remember" />}
							label="Remember me"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							className={classes.submit}>
							{t('AUTH.LOGIN.SIGN_IN')}
						</Button>
						<Box mt={5}>
							<Copyright />
						</Box>
					</form>
				</div>
			</Grid>
		</Grid>
	);
};
export default Login;
