import React, { FC } from 'react';

import { LayoutPageProperties } from '../routes/Routes.interfaces';

const GlobalLayout: FC<LayoutPageProperties> = ({ Component, route }: LayoutPageProperties) => {
	return (
		<div className="rc-global-layout">
			<div className="rc-content">
				<Component route={route} />
			</div>
		</div>
	);
};
export default GlobalLayout;
