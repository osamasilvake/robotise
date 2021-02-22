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

import Copyright from '../../../frame/copyrights/Copyrights';
import { ApiEnv, AppConfig } from '../../../services';
import { loginStyles } from './Login.styles';

const Login: FC = () => {
	const classes = loginStyles();
	const { t } = useTranslation('GLOBAL');

	const onsubmit = () => {
		console.log('hello');
	};

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
				<Box className={classes.paper}>
					<Avatar
						className={classes.large}
						alt={ApiEnv.author}
						src={AppConfig.AppImageURLs.logo.name}
					/>
					<form className={classes.form} onSubmit={onsubmit}>
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
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
						/>
						<Button
							color="primary"
							variant="contained"
							type="submit"
							className={classes.submit}
							fullWidth>
							{t('AUTH.LOGIN.SIGN_IN')}
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
