import { Box, Divider, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Breadcrumb from '../../common/breadcrumb/Breadcrumb';
import Meta from '../../common/meta/Meta';
import { PageHeadInterface } from './PageHead.interface';
import { PageHeadStyles } from './PageHead.style';

const PageHead: FC<PageHeadInterface> = (props) => {
	const { title, description, labels } = props;
	const { t } = useTranslation('META');
	const classes = PageHeadStyles();

	return (
		<Box>
			{/* Meta */}
			<Meta
				title={t(title)}
				description={(description && t(description)) || t('GENERAL.DESCRIPTION')}
			/>

			{/* Title */}
			<Typography variant="h1" className={classes.sTitle}>
				{t(title)}
			</Typography>

			{/* Breadcrumb */}
			<Breadcrumb labels={labels || null} />

			{/* Divider */}
			<Box className={classes.sDivider}>
				<Divider light />
			</Box>
		</Box>
	);
};
export default PageHead;
