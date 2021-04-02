import { Box, Breadcrumbs, Link, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import { AppConfigService } from '../../../services';
import {
	strCapitalizeEachLetter,
	strRemoveSymbols
} from '../../../utilities/methods/StringUtilities';
import { BreadcrumbInterface, BreadcrumbLinksInterface } from './Breadcrumb.interface';
import { BreadcrumbStyles } from './Breadcrumb.style';

const BreadcrumbCustom: FC<BreadcrumbInterface> = (props) => {
	const { title, currentLabel } = props;
	const { t } = useTranslation('META');
	const classes = BreadcrumbStyles();

	/**
	 * create breadcrumbs from the link
	 * @returns
	 */
	const breadcrumbs = (): BreadcrumbLinksInterface[] => {
		const paths = window.location.href.split('/').slice(3);
		return [
			{
				text: t('DASHBOARD.TITLE'),
				link: AppConfigService.AppRoutes.SCREENS.BUSINESS.DASHBOARD,
				isLast: false
			},
			...paths.map((path, index) => {
				const link = '/' + paths.slice(0, index + 1).join('/');

				// validate digits in pathname
				const digits = /^(?=.*\d+)[0-9A-Za-z-]+$/;
				if (digits.test(path)) {
					return {
						text: currentLabel || '',
						isLast: true
					};
				}

				return {
					text: strCapitalizeEachLetter(strRemoveSymbols(path)),
					link,
					isLast: index === paths.length - 1
				};
			})
		];
	};

	return (
		<Box>
			{/* Title */}
			<Typography variant="h1" className={classes.sTitle}>
				{t(title)}
			</Typography>

			{/* Breadcrumb */}
			<Breadcrumbs>
				{breadcrumbs().map((item) => (
					<Box key={item.text}>
						{!item.isLast && item.link && (
							<Link component={RouterLink} to={item.link}>
								{item.text}
							</Link>
						)}
						{item.isLast && <Typography color="textPrimary">{item.text}</Typography>}
					</Box>
				))}
			</Breadcrumbs>
		</Box>
	);
};
export default BreadcrumbCustom;
