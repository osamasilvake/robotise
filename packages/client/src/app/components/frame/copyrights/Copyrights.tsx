import { Link, Typography } from '@material-ui/core';
import { FC } from 'react';

import { momentCurrentYear } from '../../../utilities/methods/Moment';
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
					{momentCurrentYear()}
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
