import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from '@material-ui/core';
import { FC, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import {
	ProductDelete,
	productsSelector
} from '../../../../../../../slices/products/Products.slice';
import { DialogDeleteProductInterface } from './SiteProductsTable.interface';

const DialogDeleteProduct: FC<DialogDeleteProductInterface> = (props) => {
	const { product, open, setOpen } = props;
	const { t } = useTranslation(['DIALOG', 'SITES']);

	const dispatch = useDispatch();
	const products = useSelector(productsSelector);

	const common = 'SITES:CONTENT.PRODUCTS.LIST.ACTIONS.DELETE';

	/**
	 * delete product
	 * @param status
	 * @returns
	 */
	const deleteProduct = (status: boolean) => (event: MouseEvent<HTMLButtonElement>) => {
		// stop propagation
		event.stopPropagation();

		// close dialog
		!status && setOpen(false);

		// dispatch: delete product
		status && dispatch(ProductDelete(product));
	};

	return (
		<Dialog open={open} onClose={deleteProduct(false)}>
			<DialogTitle>{t(`${common}.TITLE`)}</DialogTitle>
			<DialogContent>
				<DialogContentText>{t(`${common}.TEXT`)}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button
					variant="outlined"
					disabled={products.updating}
					onClick={deleteProduct(false)}>
					{t('BUTTONS.CANCEL')}
				</Button>
				<Button
					variant="outlined"
					onClick={deleteProduct(true)}
					disabled={products.updating || !product.site}
					endIcon={products.updating && <CircularProgress size={20} />}>
					{t('BUTTONS.CONFIRM')}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
export default DialogDeleteProduct;
