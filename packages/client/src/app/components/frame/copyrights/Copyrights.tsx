import { Link, Typography } from '@material-ui/core';
import moment from 'moment';
import React, { FC } from 'react';

import { CopyrightsInterface } from './Copyrights.interface';

const Copyright: FC<CopyrightsInterface> = (props) => {
	const { short } = props;

	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{!short && (
				<>
					<Link href={process.env.REACT_APP_URL} target="_blank">
						{process.env.REACT_APP_AUTHOR}
					</Link>
					{' © '}
					{moment().year()}
					{' • '}
					{process.env.REACT_APP_NAME?.toUpperCase()}
					{': '}
				</>
			)}
			v{process.env.REACT_APP_VERSION}
		</Typography>
	);
};
export default Copyright;
