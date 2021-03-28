import { Link, Paper, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import Error from '../../../components/common/error/Error';
import { ErrorTypeEnum } from '../../../components/common/error/Error.enum';
import { AppConfigService } from '../../../services';
import { Error404Styles } from './Error404.style';

const Error404: FC = () => {
	const { t } = useTranslation('ERRORS');
	const error404Classes = Error404Styles();

	return (
		<Paper elevation={12} component="section">
			<Error error={ErrorTypeEnum.E404}>
				<Typography variant="h1" className={error404Classes.sTitle}>
					{t('E404.TITLE')}
				</Typography>
				<Typography
					variant="body1"
					color="textSecondary"
					className={error404Classes.sDescription}>
					{t('E404.DESCRIPTION')}
				</Typography>
				<Link
					component={RouterLink}
					to={AppConfigService.AppRoutes.SCREENS.BUSINESS.DASHBOARD}
					className={error404Classes.sLink}>
					{t('E404.LINK')}
				</Link>
			</Error>
		</Paper>
	);
};
export default Error404;
