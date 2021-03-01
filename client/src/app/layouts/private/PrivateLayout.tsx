import { Box, Divider } from '@material-ui/core';
import clsx from 'clsx';
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';

import AppBar from '../../frame/header/Header';
import Drawer from '../../frame/sidebar/Sidebar';
import { LayoutPageInterface } from '../../routes/Routes.interfaces';
import { generalSelector } from '../../slices/general/General.slice';
import { privateLayoutStyles } from './PrivateLayout.styles';

const PrivateLayout: FC<LayoutPageInterface> = ({ Component, route }: LayoutPageInterface) => {
	const privateLayoutClasses = privateLayoutStyles();

	const { openDrawer } = useSelector(generalSelector);
	const [open, setOpen] = useState(openDrawer);

	return (
		<Box className={clsx('rc-private-layout', privateLayoutClasses.privateLayoutRoot)}>
			{/* app-bar */}
			<AppBar open={open} setOpen={setOpen} />

			<Divider />

			{/* drawer */}
			<Drawer open={open} />

			{/* content */}
			<Box
				component="main"
				className={clsx(privateLayoutClasses.privateLayoutContent, {
					[privateLayoutClasses.privateLayoutContentShift]: open
				})}>
				{/* space from top */}
				<Box className={privateLayoutClasses.privateLayoutToolbar} />

				{/* component */}
				<Component route={route} />
			</Box>
		</Box>
	);
};
export default PrivateLayout;
