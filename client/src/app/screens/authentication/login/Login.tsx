import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { FC } from 'react';

import { AppImageURLs, AppOptions } from '../../../../app.config';
import Copyright from '../../../frame/copyrights/Copyrights';
import { loginStyles } from './Login.styles';

const Login: FC = () => {
	const classes = loginStyles();

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
						alt={AppOptions.company.name}
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
							Sign In
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
