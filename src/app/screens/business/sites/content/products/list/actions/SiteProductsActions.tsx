import { Box, Paper, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { FloatStyle } from '../../../../../../../utilities/styles/Float.style';
import { SiteProductsActionsInterface } from './SiteProductsActions.interface';
import { SiteProductsActionsStyle } from './SiteProductsActions.style';
import SiteProductsCreateProduct from './SiteProductsCreateProduct';

const SiteProductsActions: FC<SiteProductsActionsInterface> = (props) => {
	const { topSpace } = props;
	const { t } = useTranslation('SITES');
	const classes = SiteProductsActionsStyle();
	const floatStyle = FloatStyle();

	return (
		<Paper
			elevation={2}
			square
			className={clsx(floatStyle.sFloat1, {
				[classes.sFloatBoxTopSpace]: topSpace
			})}>
			<Box>
				{/* Heading */}
				<Typography variant="h6" color="textSecondary">
					{t('CONTENT.PRODUCTS.LIST.ACTIONS.HEADINGS.ACTIONS')}
				</Typography>

				{/* Create Product */}
				<SiteProductsCreateProduct />
			</Box>
		</Paper>
	);
};
export default SiteProductsActions;
