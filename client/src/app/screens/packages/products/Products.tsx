import { Box, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Meta from '../../../frame/meta/Meta';

const Products: FC = () => {
	const { t } = useTranslation('META');

	return (
		<>
			<Meta title={t('PRODUCTS.TITLE')} description={t('PRODUCTS.DESCRIPTION')} />
			<Box component="section" className="rc-products">
				<Typography component="h1" variant="h4">
					Products
				</Typography>
			</Box>
		</>
	);
};
export default Products;
