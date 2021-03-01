import { AppBar, Divider, IconButton, Toolbar } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import { generalOpenDrawer } from '../../slices/general/General.slice';
import { HeaderInterface } from './Header.interface';
import { headerStyles } from './Header.styles';

const Header: FC<HeaderInterface> = (props) => {
	const headerClasses = headerStyles();
	const { open, setOpen } = props;

	const dispatch = useDispatch();

	/**
	 * handle drawer state
	 * @param value
	 */
	const handleDrawerState = (value: boolean) => {
		// set open drawer state
		setOpen(value);

		// dispatch: set open drawer state
		dispatch(generalOpenDrawer(value));
	};

	return (
		<AppBar
			position="fixed"
			elevation={0}
			className={clsx(headerClasses.appBar, {
				[headerClasses.appBarShift]: open
			})}>
			<Toolbar className={headerClasses.appBarToolbar}>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					onClick={() => handleDrawerState(true)}
					edge="start"
					className={clsx(open && headerClasses.appBarIconHide)}>
					<MenuIcon />
				</IconButton>
				<IconButton
					color="inherit"
					aria-label="close drawer"
					onClick={() => handleDrawerState(false)}
					edge="start"
					className={clsx(!open && headerClasses.appBarIconHide)}>
					<ArrowBackIcon />
				</IconButton>
			</Toolbar>
			<Divider />
		</AppBar>
	);
};
export default Header;
