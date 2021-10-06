import { Link, Paper, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Error from '../../../components/common/error/Error';
import { ErrorTypeEnum } from '../../../components/common/error/Error.enum';
import { AppConfigService } from '../../../services';
import { Error404Style } from './Error404.style';

const Error404: FC = () => {
	const { t } = useTranslation('ERRORS');
	const classes = Error404Style();

	return (
		<Paper elevation={12} component="section" square>
			<Error error={ErrorTypeEnum.E404}>
				<Typography variant="h1" className={classes.sTitle}>
					{t('E404.TITLE')}
				</Typography>
				<Typography color="textSecondary" className={classes.sDescription}>
					{t('E404.DESCRIPTION')}
				</Typography>
				<Link underline="hover" href={AppConfigService.AppRoutes.HOME}>
					{t('E404.LINK')}
				</Link>
			</Error>
		</Paper>
	);
};
export default Error404;
