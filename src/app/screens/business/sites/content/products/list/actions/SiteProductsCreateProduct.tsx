import { Box, Button } from '@material-ui/core';
import { FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import DialogCreateEditProduct from '../table/DialogCreateEditProduct';
import { SiteProductCreateEditTypeEnum } from '../table/SiteProductsTable.enum';
import { SiteProductsActionsStyle } from './SiteProductsActions.style';

const SiteProductsCreateProduct: FC = () => {
	const { t } = useTranslation('SITES');
	const classes = SiteProductsActionsStyle();

	const [open, setOpen] = useState(false);

	/**
	 * open create product dialog
	 * @param event
	 */
	const openCreateProductDialog = (event: MouseEvent<HTMLButtonElement>) => {
		// stop propagation
		event.stopPropagation();

		// show dialog
		setOpen(true);
	};

	return (
		<>
			{/* Action */}
			<Box className={classes.sCreateProduct}>
				<Button variant="outlined" onClick={openCreateProductDialog}>
					{t('CONTENT.PRODUCTS.LIST.ACTIONS.CREATE_EDIT.CREATE.TITLE')}
				</Button>
			</Box>

			{/* Dialog */}
			<DialogCreateEditProduct
				type={SiteProductCreateEditTypeEnum.CREATE}
				open={open}
				setOpen={setOpen}
			/>
		</>
	);
};
export default SiteProductsCreateProduct;
