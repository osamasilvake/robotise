import { Box } from '@material-ui/core';
import clsx from 'clsx';
import { FC, Suspense } from 'react';
import { useSelector } from 'react-redux';

import Loader from '../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../components/common/loader/Loader.enum';
import AppBar from '../../components/frame/app-bar/AppBar';
import Drawer from '../../components/frame/drawer/Drawer';
import { LayoutPageInterface } from '../../routes/Routes.interfaces';
import { generalSelector } from '../../slices/general/General.slice';
import { PrivateLayoutStyles } from './PrivateLayout.style';

const PrivateLayout: FC<LayoutPageInterface> = ({ Component, route }: LayoutPageInterface) => {
	const classes = PrivateLayoutStyles();

	const general = useSelector(generalSelector);

	return (
		<Box>
			{/* App Bar */}
			<AppBar />

			{/* Drawer */}
			<Drawer />

			{/* Content */}
			<Box
				component="main"
				className={clsx(classes.sContent, {
					[classes.sContentOpen]: general.openDrawer,
					[classes.sContentClose]: !general.openDrawer
				})}>
				<Suspense fallback={<Loader loader={LoaderTypeEnum.FALLBACK_LOADER} />}>
					<Component route={route} />
				</Suspense>
			</Box>
		</Box>
	);
};
export default PrivateLayout;
