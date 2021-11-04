import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useParams } from 'react-router-dom';

import { BreadcrumbInterface, BreadcrumbParamsInterface } from './Breadcrumb.interface';
import { breadcrumbs } from './Breadcrumb.map';

const BreadcrumbCustom: FC<BreadcrumbInterface> = (props) => {
	const { labels } = props;
	const { t } = useTranslation('META');

	const params: BreadcrumbParamsInterface = useParams();

	return (
		<Breadcrumbs maxItems={4} itemsAfterCollapse={3}>
			{breadcrumbs(params, labels).map((item) => (
				<Box key={item.text}>
					{!item.isLast && item.link && (
						<Link component={RouterLink} underline="hover" to={item.link}>
							{t(item.text)}
						</Link>
					)}
					{item.isLast && <Typography color="textPrimary">{item.text}</Typography>}
				</Box>
			))}
		</Breadcrumbs>
	);
};
export default BreadcrumbCustom;
