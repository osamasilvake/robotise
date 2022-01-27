import { Link, Stack, Typography } from '@mui/material';
import { FC } from 'react';

import { AppConfigService } from '../../../services';
import { dateCurrentYear } from '../../../utilities/methods/Date';
import { CopyrightsInterface } from './Copyrights.interface';
import { CopyrightStyle } from './Copyrights.style';

const Copyright: FC<CopyrightsInterface> = (props) => {
	const { short } = props;
	const classes = CopyrightStyle();

	return (
		<Stack alignItems="center" justifyContent="center" className={classes.sCopyright}>
			{!short && (
				<Stack direction="row" spacing={0.5} justifyContent="center">
					<Link
						variant="body2"
						underline="hover"
						href={AppConfigService.envCompanyUrl}
						target="_blank">
						{AppConfigService.envCompanyName}
					</Link>
					<Typography variant="body2" color="textSecondary">
						{' © '}
						{dateCurrentYear()}
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
		</Stack>
	);
};
export default Copyright;
