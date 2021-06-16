import { Link, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Error from '../../common/error/Error';
import { ErrorTypeEnum } from '../../common/error/Error.enum';
import { PageErrorInterface } from './PageError.interface';
import { PageErrorStyle } from './PageError.style';

const PageError: FC<PageErrorInterface> = (props) => {
	const { message } = props;
	const { t } = useTranslation('ERRORS');
	const classes = PageErrorStyle();

	return (
		<Error error={ErrorTypeEnum.PAGE_ERROR}>
			<Typography variant="h2" className={classes.sTitle}>
				{t('PAGE_ERROR.TITLE')}
			</Typography>
			{message && (
				<Typography variant="body1" color="textSecondary" className={classes.sDescription}>
					{t(message)}
				</Typography>
			)}
			<Link onClick={() => window.location.reload()} className={classes.sLink}>
				{t('PAGE_ERROR.LINK')}
			</Link>
		</Error>
	);
};
export default PageError;
