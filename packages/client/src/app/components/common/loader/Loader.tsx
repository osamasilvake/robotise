import { Avatar, Box, CircularProgress, LinearProgress, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { AppConfigService } from '../../../services';
import { CenterStyles } from '../../../utilities/styles/Center.style';
import { LoaderTypeEnum } from './Loader.enum';
import { LoaderInterface } from './Loader.interface';
import { LoaderStyles } from './Loader.style';

const Loader: FC<LoaderInterface> = (props) => {
	const { loader, spinnerText } = props;
	const { t } = useTranslation('COMMON');
	const centerClasses = CenterStyles();
	const classes = LoaderStyles();

	switch (loader) {
		case LoaderTypeEnum.FALLBACK_LOADER:
			return <LinearProgress />;
		case LoaderTypeEnum.PAGE_LOADER:
			return (
				<Box textAlign="center" className={classes.sLinear}>
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
		case LoaderTypeEnum.APP_LOADER:
		default:
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
	}
};
export default Loader;
