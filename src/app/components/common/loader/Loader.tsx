import { Avatar, Box, CircularProgress, LinearProgress, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { AppConfigService } from '../../../services';
import { LoaderTypeEnum } from './Loader.enum';
import { LoaderInterface } from './Loader.interface';
import { LoaderStyle } from './Loader.style';

const Loader: FC<LoaderInterface> = (props) => {
	const { loader, spinnerText } = props;
	const { t } = useTranslation('COMMON');
	const classes = LoaderStyle();

	switch (loader) {
		case LoaderTypeEnum.FALLBACK_LOADER:
			return <LinearProgress />;
		case LoaderTypeEnum.PAGE_LOADER:
			return (
				<Box className={classes.sLinear}>
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
				<Stack spacing={0.5} alignItems="center" justifyContent="center" height="100vh">
					<Box className={classes.sCircularAvatar}>
						<Avatar
							className={classes.sAvatar}
							src={AppConfigService.AppImageURLs.logo.icon}
							alt={AppConfigService.envCompanyName}
						/>
					</Box>
					<Box>
						<CircularProgress color="primary" />
					</Box>
				</Stack>
			);
	}
};
export default Loader;
