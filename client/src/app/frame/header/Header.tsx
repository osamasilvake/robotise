import {
	AppBar,
	Avatar,
	Box,
	Divider,
	IconButton,
	Menu,
	MenuItem,
	Toolbar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React, { FC } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Badge from '../../components/badge/Badge';
import { ConfigService } from '../../services';
import { AuthLogout } from '../../slices/auth/Auth.slice';
import { HeaderInterface } from './Header.interface';
import { headerStyles } from './Header.styles';

const Header: FC<HeaderInterface> = (props) => {
	const { open, setOpen } = props;
	const headerClasses = headerStyles();

	const dispatch = useDispatch();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	/**
	 * handle menu close
	 */
	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	/**
	 * handle logout user
	 */
	const handleLogout = () => {
		// dispatch: logout
		dispatch(AuthLogout());
	};

	return (
		<AppBar
			position="fixed"
			elevation={0}
			color="inherit"
			className={clsx(headerClasses.appBar, {
				[headerClasses.appBarShift]: open
			})}>
			<Toolbar className={headerClasses.appBarToolbar}>
				<Box>
					{!open && (
						<IconButton onClick={() => setOpen(true)} edge="start">
							<MenuIcon />
						</IconButton>
					)}
				</Box>

				{/* Menu */}
				<IconButton onClick={($event) => setAnchorEl($event.currentTarget)}>
					<Badge>
						<Avatar
							src={ConfigService.AppImageURLs.avatar.path}
							alt={ConfigService.AppImageURLs.avatar.name}
						/>
					</Badge>
				</IconButton>
				<Menu
					id="rc-account-menu"
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={handleMenuClose}>
					<MenuItem>Profile</MenuItem>
					<MenuItem>My account</MenuItem>
					<Divider />
					<MenuItem onClick={handleLogout}>Logout</MenuItem>
				</Menu>
			</Toolbar>
		</AppBar>
	);
};
export default Header;
