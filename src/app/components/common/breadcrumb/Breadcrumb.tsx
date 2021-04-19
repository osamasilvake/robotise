import { Box, Breadcrumbs, Link, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useParams } from 'react-router-dom';

import { RobotParamsInterface } from '../../../screens/business/robots/Robot.interface';
import { AppConfigService } from '../../../services';
import {
	strCapitalizeEachLetter,
	strRemoveSymbols
} from '../../../utilities/methods/StringUtilities';
import { BreadcrumbInterface, BreadcrumbLinksInterface } from './Breadcrumb.interface';
import { BreadcrumbStyles } from './Breadcrumb.style';

const BreadcrumbCustom: FC<BreadcrumbInterface> = (props) => {
	const { title, labels } = props;
	const { t } = useTranslation('META');
	const classes = BreadcrumbStyles();

	const params: RobotParamsInterface = useParams();

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

				/**
				 * params:
				 * 1. robot
				 * 2. order
				 */
				if (path === params.robot) {
					return {
						text: labels?.robotName || '...',
						link,
						isLast: index === paths.length - 1
					};
				} else if (path === params.order) {
					return {
						text: labels?.orderRoom || '...',
						link,
						isLast: index === paths.length - 1
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
