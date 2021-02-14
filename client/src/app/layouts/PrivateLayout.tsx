import React, { FC } from 'react';

import Header from '../frame/header/Header';
import Sidebar from '../frame/sidebar/Sidebar';
import { LayoutPageProperties } from '../routes/Routes.interfaces';

const PrivateLayout: FC<LayoutPageProperties> = ({ Component, route }: LayoutPageProperties) => {
	return (
		<div className="rc-public-layout">
			<Sidebar />
			<Header />
			<div className="rc-content">
				<Component route={route} />
			</div>
		</div>
	);
};
export default PrivateLayout;
