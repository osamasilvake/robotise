import { Box } from '@material-ui/core';
import clsx from 'clsx';
import { FC, Suspense } from 'react';
import { useSelector } from 'react-redux';

import Loader from '../../components/common/loader/Loader';
import AppBar from '../../components/frame/app-bar/AppBar';
import Drawer from '../../components/frame/drawer/Drawer';
import { LayoutPageInterface } from '../../routes/Routes.interfaces';
import { generalSelector } from '../../slices/general/General.slice';
import { privateLayoutStyles } from './PrivateLayout.styles';

const PrivateLayout: FC<LayoutPageInterface> = ({ Component, route }: LayoutPageInterface) => {
	const privateLayoutClasses = privateLayoutStyles();

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
				className={clsx(privateLayoutClasses.sContent, {
					[privateLayoutClasses.sContentOpen]: general.openDrawer,
					[privateLayoutClasses.sContentClose]: !general.openDrawer
				})}>
				<Suspense fallback={<Loader spinner />}>
					<Component route={route} />
				</Suspense>
			</Box>
		</Box>
	);
};
export default PrivateLayout;
