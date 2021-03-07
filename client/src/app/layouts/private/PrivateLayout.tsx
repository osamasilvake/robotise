import { Box, LinearProgress } from '@material-ui/core';
import clsx from 'clsx';
import React, { FC, Suspense } from 'react';
import { useSelector } from 'react-redux';

import AppBar from '../../frame/app-bar/AppBar';
import Drawer from '../../frame/drawer/Drawer';
import ErrorBoundary from '../../frame/error-boundary/ErrorBoundary';
import { LayoutPageInterface } from '../../routes/Routes.interfaces';
import { generalSelector } from '../../slices/general/General.slice';
import { privateLayoutStyles } from './PrivateLayout.styles';

const PrivateLayout: FC<LayoutPageInterface> = ({ Component, route }: LayoutPageInterface) => {
	const privateLayoutClasses = privateLayoutStyles();
	const { openDrawer } = useSelector(generalSelector);

	return (
		<Box className="rc-private-layout">
			{/* App Bar */}
			<AppBar />

			{/* Drawer */}
			<Drawer />

			{/* Content */}
			<Box
				component="main"
				className={clsx(privateLayoutClasses.privateLayoutContent, {
					[privateLayoutClasses.privateLayoutContentOpen]: openDrawer,
					[privateLayoutClasses.privateLayoutContentClose]: !openDrawer
				})}>
				<ErrorBoundary>
					<Suspense fallback={<LinearProgress />}>
						<Component route={route} />
					</Suspense>
				</ErrorBoundary>
			</Box>
		</Box>
	);
};
export default PrivateLayout;
