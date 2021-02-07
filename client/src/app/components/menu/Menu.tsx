import { Box } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import React, { FC } from 'react';

interface MenuInterface {
	anchorEl: any;
	close: any;
	menuId?: string;
	menuClass?: string;
}

const SimpleMenu: FC<MenuInterface> = (props) => {
	const { children, anchorEl, close, menuId } = props;

	return (
		<Box>
			<Menu
				id={menuId}
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={close}>
				{children}
			</Menu>
		</Box>
	);
};
export default SimpleMenu;
