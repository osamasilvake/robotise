import { Box, Divider, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Breadcrumb from '../../common/breadcrumb/Breadcrumb';
import Meta from '../../common/meta/Meta';
import { PageHeadInterface } from './PageHead.interface';
import { PageHeadStyle } from './PageHead.style';

const PageHead: FC<PageHeadInterface> = (props) => {
	const { title, description, onlyMeta, labels } = props;
	const { t } = useTranslation('META');
	const classes = PageHeadStyle();

	return (
		<Box>
			{/* Meta */}
			<Meta
				title={t(title)}
				description={(description && t(description)) || t('GENERAL.DESCRIPTION')}
			/>

			{!onlyMeta && (
				<>
					{/* Title */}
					<Typography variant="h1" className={classes.sTitle}>
						{t(title)}
					</Typography>

					{/* Breadcrumb */}
					<Breadcrumb labels={labels} />

					{/* Divider */}
					<Box className={classes.sDivider}>
						<Divider light />
					</Box>
				</>
			)}
		</Box>
	);
};
export default PageHead;
