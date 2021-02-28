import { Fade, Menu } from '@material-ui/core';
import React, { FC } from 'react';

import { MenuInterface } from './Menu.interface';

const SimpleMenu: FC<MenuInterface> = (props) => {
	const { children, anchorEl, close, menuId, menuClass } = props;

	return (
		<Menu
			id={menuId}
			className={menuClass}
			anchorEl={anchorEl}
			keepMounted
			open={Boolean(anchorEl)}
			onClose={close}
			TransitionComponent={Fade}>
			{children}
		</Menu>
	);
};
export default SimpleMenu;
