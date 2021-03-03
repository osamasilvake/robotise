import { Box } from '@material-ui/core';
import clsx from 'clsx';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AppBar from '../../frame/header/Header';
import Drawer from '../../frame/sidebar/Sidebar';
import { LayoutPageInterface } from '../../routes/Routes.interfaces';
import { generalOpenDrawer, generalSelector } from '../../slices/general/General.slice';
import { privateLayoutStyles } from './PrivateLayout.styles';

const PrivateLayout: FC<LayoutPageInterface> = ({ Component, route }: LayoutPageInterface) => {
	const privateLayoutClasses = privateLayoutStyles();

	const dispatch = useDispatch();
	const { openDrawer } = useSelector(generalSelector);
	const [open, setOpen] = useState(openDrawer);

	useEffect(() => {
		if (openDrawer !== open) {
			// dispatch: set open drawer state
			dispatch(generalOpenDrawer(open));
		}
	}, [dispatch, open, openDrawer, setOpen]);

	return (
		<Box className={clsx('rc-private-layout', privateLayoutClasses.privateLayoutRoot)}>
			{/* app-bar */}
			<AppBar open={open} setOpen={setOpen} />

			{/* drawer */}
			<Drawer open={open} setOpen={setOpen} />

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
