import { Link, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Error from '../../common/error/Error';
import { ErrorTypeEnum } from '../../common/error/Error.enum';
import { PageErrorInterface } from './PageError.interface';

const PageError: FC<PageErrorInterface> = (props) => {
	const { message } = props;
	const { t } = useTranslation('ERRORS');

	return (
		<Error error={ErrorTypeEnum.PAGE_ERROR}>
			{/* Title */}
			<Typography variant="h2">{t('PAGE_ERROR.TITLE')}</Typography>

			{/* Message */}
			<Typography color="textSecondary">
				{message ? t(message) : t('PAGE_ERROR.DESCRIPTION')}
			</Typography>

			{/* Link */}
			<Link
				component="button"
				variant="body1"
				underline="hover"
				onClick={() => window.location.reload()}>
				{t('PAGE_ERROR.LINK')}
			</Link>
		</Error>
	);
};
export default PageError;
