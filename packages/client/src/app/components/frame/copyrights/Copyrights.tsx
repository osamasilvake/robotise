import { Link, Typography } from '@material-ui/core';
import { FC } from 'react';

import { AppConfigService } from '../../../services';
import { momentCurrentYear } from '../../../utilities/methods/Moment';
import { CopyrightsInterface } from './Copyrights.interface';

const Copyright: FC<CopyrightsInterface> = (props) => {
	const { short } = props;

	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{!short && (
				<>
					<Link href={AppConfigService.envWebsite} target="_blank">
						{AppConfigService.envAuthor}
					</Link>
					{' © '}
					{momentCurrentYear()}
					{' • '}
					{AppConfigService.envAppName.toUpperCase()}
					{': '}
				</>
			)}
			v{AppConfigService.envApiVersion}
		</Typography>
	);
};
export default Copyright;
