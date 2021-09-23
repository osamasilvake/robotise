import { Link, Typography } from '@mui/material';
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
					<Link underline="hover" href={AppConfigService.envCompanyUrl} target="_blank">
						{AppConfigService.envCompanyName}
					</Link>
					{' © '}
					{momentCurrentYear()}
					{' • '}
					{AppConfigService.envAppName}
					{' • '}
				</>
			)}
			v{AppConfigService.envAppVersion}
		</Typography>
	);
};
export default Copyright;
