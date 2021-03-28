import { Box, Divider } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Breadcrumb from '../../common/breadcrumb/Breadcrumb';
import Meta from '../../common/meta/Meta';
import { PageHeadInterface } from './PageHead.interface';
import { PageHeadStyles } from './PageHead.style';

const PageHead: FC<PageHeadInterface> = (props) => {
	const { title, description, currentLabel, hideDivider } = props;
	const { t } = useTranslation('META');
	const pageHeadClasses = PageHeadStyles();

	return (
		<Box>
			{/* Meta */}
			<Meta
				title={t(title)}
				description={(description && t(description)) || t('GENERAL.DESCRIPTION')}
			/>

			{/* Breadcrumb */}
			<Breadcrumb title={title} currentLabel={currentLabel} />

			{/* Divider */}
			{!hideDivider && (
				<Box className={pageHeadClasses.sDivider}>
					<Divider light />
				</Box>
			)}
		</Box>
	);
};
export default PageHead;
