import { Box, Paper, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { FloatStyle } from '../../../../../../../utilities/styles/Float.style';
import SiteProductsCreateProduct from './SiteProductsCreateProduct';

const SiteProductsActions: FC = () => {
	const { t } = useTranslation('SITES');
	const floatStyle = FloatStyle();

	return (
		<Paper elevation={2} square className={floatStyle.sFloat1}>
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
