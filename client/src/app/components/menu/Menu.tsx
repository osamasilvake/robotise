import { Fade, Menu } from '@material-ui/core';
import React, { FC, ReactEventHandler } from 'react';

interface MenuInterface {
	anchorEl: HTMLElement;
	close: ReactEventHandler;
	menuId?: string;
	menuClass?: string;
}

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
