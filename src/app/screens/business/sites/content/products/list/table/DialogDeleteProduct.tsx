import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from '@mui/material';
import { FC, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
	ProductDelete,
	ProductsFetchList,
	productsSelector
} from '../../../../../../../slices/business/sites/products/Products.slice';
import { timeout } from '../../../../../../../utilities/methods/Timeout';
import { SiteParamsInterface } from '../../../../Site.interface';
import { DialogDeleteProductInterface } from './SiteProductsTable.interface';

const DialogDeleteProduct: FC<DialogDeleteProductInterface> = (props) => {
	const { product, open, setOpen } = props;
	const { t } = useTranslation(['DIALOG', 'SITES']);

	const dispatch = useDispatch();
	const products = useSelector(productsSelector);

	const params: SiteParamsInterface = useParams();
	const cSiteId = params.siteId;
	const translation = 'SITES:CONTENT.PRODUCTS.LIST.ACTIONS.DELETE';

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
		status &&
			dispatch(
				ProductDelete(product, async () => {
					// dispatch: fetch products
					dispatch(ProductsFetchList(cSiteId, true));

					// wait
					await timeout(2000);

					// close dialog
					setOpen(false);
				})
			);
	};

	return (
		<Dialog open={open} onClose={deleteProduct(false)}>
			<DialogTitle>{t(`${translation}.TITLE`)}</DialogTitle>
			<DialogContent>
				<DialogContentText>{t(`${translation}.TEXT`)}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button
					variant="outlined"
					disabled={products.updating}
					onClick={deleteProduct(false)}>
					{t('BUTTONS.CANCEL')}
				</Button>
				<Button
					color="error"
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
