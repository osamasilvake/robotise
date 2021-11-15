import { Link, Stack, Typography } from '@mui/material';
import { FC } from 'react';

import { AppConfigService } from '../../../services';
import { momentCurrentYear } from '../../../utilities/methods/Moment';
import { CopyrightsInterface } from './Copyrights.interface';

const Copyright: FC<CopyrightsInterface> = (props) => {
	const { short } = props;

	return (
		<>
			{!short && (
				<Stack direction="row" spacing={0.5}>
					<Link
						variant="body2"
						underline="hover"
						href={AppConfigService.envCompanyUrl}
						target="_blank">
						{AppConfigService.envCompanyName}
					</Link>
					<Typography variant="body2" color="textSecondary">
						{' © '}
						{momentCurrentYear()}
						{' • '}
						{AppConfigService.envAppName}
						{' • '}v{AppConfigService.envAppVersion}
					</Typography>
				</Stack>
			)}
			{short && (
				<Typography variant="body2" color="textSecondary">
					v{AppConfigService.envAppVersion}
				</Typography>
			)}
		</>
	);
};
export default Copyright;
