import { Box, Link, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { CenterStyle } from '../../../utilities/styles/Center.style';
import { PageEmptyInterface } from './PageEmpty.interface';
import { PageEmptyStyle } from './PageEmpty.style';

const PageEmpty: FC<PageEmptyInterface> = (props) => {
	const { message, paddingTop } = props;
	const { t } = useTranslation('COMMON');
	const classes = PageEmptyStyle();
	const centerClasses = CenterStyle();

	return (
		<Box
			className={clsx(centerClasses.sHFlex, {
				[classes.sBox]: paddingTop
			})}>
			{/* Title */}
			<Typography variant="h2" className={classes.sTitle}>
				{t('EMPTY.TITLE')}
			</Typography>

			{/* Message */}
			{message && (
				<Typography variant="body1" color="textSecondary" className={classes.sDescription}>
					{t(message)}
				</Typography>
			)}

			{/* Link */}
			<Link onClick={() => window.location.reload()} className={classes.sLink}>
				{t('EMPTY.LINK')}
			</Link>
		</Box>
	);
};
export default PageEmpty;
