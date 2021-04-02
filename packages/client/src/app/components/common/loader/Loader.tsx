import { Avatar, Box, CircularProgress, LinearProgress, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { AppConfigService } from '../../../services';
import { CenterStyles } from '../../../utilities/styles/Center.style';
import { LoaderInterface } from './Loader.interface';
import { LoaderStyles } from './Loader.style';

const Loader: FC<LoaderInterface> = (props) => {
	const { spinner, spinnerSmall, spinnerText } = props;
	const { t } = useTranslation('COMMON');
	const centerClasses = CenterStyles();
	const classes = LoaderStyles();

	// spinner
	if (spinner) {
		return (
			<Box
				textAlign="center"
				className={clsx({
					[classes.sLinear]: spinnerSmall
				})}>
				{spinnerText && (
					<Typography
						variant="body2"
						color="textSecondary"
						className={classes.sLinearText}>
						{t(spinnerText)}
					</Typography>
				)}
				<LinearProgress />
			</Box>
		);
	}

	return (
		<Box className={centerClasses.sVHFlex} textAlign="center">
			<Box className={classes.sCircularAvatar}>
				<Avatar
					className={classes.sAvatar}
					src={AppConfigService.AppImageURLs.logo.icon}
					alt={AppConfigService.envAuthor}
				/>
			</Box>
			<Box className={classes.sCircularLoader}>
				<CircularProgress color="inherit" />
			</Box>
		</Box>
	);
};
export default Loader;
