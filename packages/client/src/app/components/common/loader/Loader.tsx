import { Avatar, Box, CircularProgress } from '@material-ui/core';
import { FC } from 'react';

import { AppConfigService } from '../../../services';
import { centerStyles } from '../../../utilities/styles/Center.style';
import { loaderStyles } from './Loader.styles';

const Loader: FC = () => {
	const centerClasses = centerStyles();
	const loaderClasses = loaderStyles();

	return (
		<Box className={centerClasses.centerVH} textAlign="center">
			<Box className="logo" marginBottom="15px">
				<Avatar
					className={loaderClasses.loaderAvatar}
					src={AppConfigService.AppImageURLs.logo.icon}
					alt={AppConfigService.envAuthor}
				/>
			</Box>
			<Box className={loaderClasses.loaderSpinner}>
				<CircularProgress color="inherit" />
			</Box>
		</Box>
	);
};
export default Loader;
