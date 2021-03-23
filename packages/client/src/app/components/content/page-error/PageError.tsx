import { Link, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import { AppConfigService } from '../../../services';
import Error from '../../common/error/Error';
import { ErrorTypeEnum } from '../../common/error/Error.enum';
import { PageErrorInterface } from './PageError.interface';
import { PageErrorStyles } from './PageError.style';

const PageError: FC<PageErrorInterface> = (props) => {
	const { message } = props;

	const { t } = useTranslation('ERRORS');
	const pageErrorClasses = PageErrorStyles();

	return (
		<Error error={ErrorTypeEnum.PAGE_ERROR}>
			<Typography variant="h1" className={pageErrorClasses.sTitle}>
				{t('PAGE_ERROR.TITLE')}
			</Typography>
			<Typography
				variant="body1"
				color="textSecondary"
				className={pageErrorClasses.sDescription}>
				{t(message)}
			</Typography>
			<Link component={RouterLink} to={AppConfigService.AppRoutes.SCREENS.BUSINESS.DASHBOARD}>
				{t('PAGE_ERROR.LINK')}
			</Link>
		</Error>
	);
};
export default PageError;
