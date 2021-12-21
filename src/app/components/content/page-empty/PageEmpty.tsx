import { Link, Stack, Typography } from '@mui/material';
import clsx from 'clsx';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { PageEmptyInterface } from './PageEmpty.interface';
import { PageEmptyStyle } from './PageEmpty.style';

const PageEmpty: FC<PageEmptyInterface> = (props) => {
	const { message, paddingTop } = props;
	const { t } = useTranslation('COMMON');
	const classes = PageEmptyStyle();

	return (
		<Stack
			spacing={0.5}
			alignItems="center"
			className={clsx(classes.sStack, {
				[classes.sStackPadding]: paddingTop
			})}>
			{/* Title */}
			<Typography variant="h2">{t('EMPTY.TITLE')}</Typography>

			{/* Message */}
			{message && <Typography color="textSecondary">{t(message)}</Typography>}

			{/* Link */}
			<Link
				component="button"
				variant="body1"
				underline="hover"
				onClick={() => window.location.reload()}>
				{t('EMPTY.LINK')}
			</Link>
		</Stack>
	);
};
export default PageEmpty;
