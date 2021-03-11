import { Box, Breadcrumbs, Link, Paper, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import ENV from '../../../../environment';
import Meta from '../../common/meta/Meta';
import { BreadcrumbInterface, PageHeadInterface } from './PageHead.interface';
import { pageHeadStyles } from './PageHead.style';

const PageHead: FC<PageHeadInterface> = (props) => {
	const { title, description } = props;

	const { t } = useTranslation('META');
	const pageHeadClasses = pageHeadStyles();

	/**
	 * create breadcrumbs from the link
	 * @returns
	 */
	const breadcrumbs = (): BreadcrumbInterface[] => {
		const paths = location.href.split('/').slice(3);
		const parts = {
			text: t('DASHBOARD.TITLE'),
			link: ENV().ROUTING.SCREENS.BUSINESS.DASHBOARD,
			isLast: false
		};
		return [
			parts,
			...paths.map((item, index) => {
				const link = '/' + paths.slice(0, index + 1).join('/');
				return {
					text: item.replace(/\b\w/g, (l) => l.toUpperCase()),
					link,
					isLast: index === paths.length - 1
				};
			})
		];
	};

	return (
		<Box>
			{/* Meta */}
			<Meta title={title} description={description} />

			{/* Paper */}
			<Paper square elevation={11} className={pageHeadClasses.pageHead}>
				{/* Title */}
				<Typography variant="h1" className={pageHeadClasses.pageHeadTitle}>
					{t(title)}
				</Typography>

				{/* Breadcrumb */}
				<Breadcrumbs>
					{breadcrumbs() &&
						breadcrumbs().length &&
						breadcrumbs().map((item) => (
							<Box key={item.link}>
								{!item.isLast && <Link href={item.text}>{item.text}</Link>}
								{item.isLast && (
									<Typography color="textPrimary">{item.text}</Typography>
								)}
							</Box>
						))}
				</Breadcrumbs>
			</Paper>
		</Box>
	);
};
export default PageHead;
