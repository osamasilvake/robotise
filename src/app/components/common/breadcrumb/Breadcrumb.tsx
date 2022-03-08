import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import { FC, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import { AppConfigService } from '../../../services';
import { BreadcrumbInterface } from './Breadcrumb.interface';
import { breadcrumbs } from './Breadcrumb.map';

const BreadcrumbCustom: FC<BreadcrumbInterface> = (props) => {
	const { labels } = props;
	const { t } = useTranslation('META');

	const idx = useRef(-1);

	/**
	 * replace id with label
	 * @param text
	 * @returns
	 */
	const replaceIdWithLabel = (text: string) => {
		const regexInteger = AppConfigService.AppOptions.regex.integer;
		const condition1 = text && text.length > 20;
		const condition2 = regexInteger.test(text);

		if (condition1 || condition2) {
			idx.current = ++idx.current;
		}

		return !text || text.length > 20 ? labels && labels[idx.current] : t(text);
	};

	return (
		<Breadcrumbs maxItems={4} itemsAfterCollapse={3}>
			{breadcrumbs().map((item, index) => {
				idx.current = index === 0 ? -1 : idx.current;
				return item.show ? (
					<Box key={item.text}>
						{!item.isLast && item.link && (
							<Link component={RouterLink} underline="hover" to={item.link}>
								{replaceIdWithLabel(item.text)}
							</Link>
						)}
						{item.isLast && (
							<Typography color="textPrimary">
								{replaceIdWithLabel(item.text)}
							</Typography>
						)}
					</Box>
				) : null;
			})}
		</Breadcrumbs>
	);
};
export default BreadcrumbCustom;
