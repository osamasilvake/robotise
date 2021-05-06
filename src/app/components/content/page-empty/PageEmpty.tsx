import { Box, Link, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { CenterStyles } from '../../../utilities/styles/Center.style';
import { PageEmptyInterface } from './PageEmpty.interface';
import { PageEmptyStyles } from './PageEmpty.style';

const PageEmpty: FC<PageEmptyInterface> = (props) => {
	const { message } = props;
	const { t } = useTranslation('COMMON');
	const classes = PageEmptyStyles();
	const centerClasses = CenterStyles();

	return (
		<Box className={centerClasses.sHFlex}>
			<Typography variant="h2" className={classes.sTitle}>
				{t('EMPTY.TITLE')}
			</Typography>
			{message && (
				<Typography variant="body1" color="textSecondary" className={classes.sDescription}>
					{t(message)}
				</Typography>
			)}
			<Link onClick={() => window.location.reload()} className={classes.sLink}>
				{t('EMPTY.LINK')}
			</Link>
		</Box>
	);
};
export default PageEmpty;
