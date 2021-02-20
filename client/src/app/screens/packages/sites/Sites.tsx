import { Box } from '@material-ui/core';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import ENV from '../../../../environment';
import Meta from '../../../frame/meta/Meta';

const Sites: FC = () => {
	return (
		<>
			<Meta title="Sites" description="Sites Description" />
			<Box component="section" className="rc-sites">
				<h1>Sites</h1>
				<Link to={ENV().ROUTING.PACKAGES.DASHBOARD}>Go To Dashboard</Link>
			</Box>
		</>
	);
};
export default Sites;
