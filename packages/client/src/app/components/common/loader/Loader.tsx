import { Avatar, Box, CircularProgress, LinearProgress, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { AppConfigService } from '../../../services';
import { centerStyles } from '../../../utilities/styles/Center.style';
import { LoaderInterface } from './Loader.interface';
import { loaderStyles } from './Loader.styles';

const Loader: FC<LoaderInterface> = (props) => {
	const { spinner, spinnerSmall, spinnerText } = props;

	const { t } = useTranslation('COMMON');
	const centerClasses = centerStyles();
	const loaderClasses = loaderStyles();

	// spinner
	if (spinner) {
		return (
			<Box
				textAlign="center"
				className={clsx({
					[loaderClasses.sLinear]: spinnerSmall
				})}>
				{spinnerText && (
					<Typography
						variant="body2"
						color="textSecondary"
						className={loaderClasses.sLinearText}>
						{t(spinnerText)}
					</Typography>
				)}
				<LinearProgress />
			</Box>
		);
	}

	return (
		<Box className={centerClasses.sVHFlex} textAlign="center">
			<Box className={loaderClasses.sCircularAvatar}>
				<Avatar
					className={loaderClasses.sAvatar}
					src={AppConfigService.AppImageURLs.logo.icon}
					alt={AppConfigService.envAuthor}
				/>
			</Box>
			<Box className={loaderClasses.sCircularLoader}>
				<CircularProgress color="inherit" />
			</Box>
		</Box>
	);
};
export default Loader;
