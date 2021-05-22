import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormHelperText,
	TextField,
	Typography
} from '@material-ui/core';
import { FC, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
	ProductCreateEdit,
	productsSelector
} from '../../../../../../../slices/products/Products.slice';
import { useForm } from '../../../../../../../utilities/hooks/form/UseForm';
import { validateEmptyObjProperty } from '../../../../../../../utilities/methods/ObjectUtilities';
import { SiteParamsInterface } from '../../../../Site.interface';
import { CreateEditProductValidation } from './DialogCreateEditProduct.validation';
import { SiteProductCreateEditTypeEnum } from './SiteProductsTable.enum';
import {
	DialogCreateEditProductInterface,
	DialogCreateEditProductPayloadInterface
} from './SiteProductsTable.interface';

const DialogCreateEditProduct: FC<DialogCreateEditProductInterface> = (props) => {
	const { product, open, setOpen, type } = props;
	const { t } = useTranslation(['DIALOG', 'SITES']);

	const dispatch = useDispatch();
	const products = useSelector(productsSelector);

	const params: SiteParamsInterface = useParams();
	const commonText = 'SITES:CONTENT.PRODUCTS.LIST.ACTIONS.PRODUCT_CREATE_EDIT';

	const { handleChangeInput, handleBlur, handleSubmit, values, errors } =
		useForm<DialogCreateEditProductPayloadInterface>(
			{
				image: '',
				name: '',
				price: 0,
				length: 0,
				weight: 0,
				volume: ''
			},
			CreateEditProductValidation,
			async () => {
				console.log('kk');
				// dispatch: create a product
				params.site &&
					Promise.all([
						dispatch(ProductCreateEdit(values, params.site, type, product?.id))
					]).then(() => {
						// set open
						setOpen(false);
					});
			}
		);

	/**
	 * close create/edit dialog
	 * @param status
	 * @returns
	 */
	const closeCreateEditProductDialog = (event: MouseEvent<HTMLButtonElement>) => {
		// stop propagation
		event.stopPropagation();

		// close dialog
		setOpen(false);
	};

	return (
		<Dialog open={open} onClose={closeCreateEditProductDialog}>
			<form onSubmit={handleSubmit}>
				<DialogTitle>
					{type === SiteProductCreateEditTypeEnum.CREATE &&
						t(`${commonText}.CREATE.TITLE`)}
					{type === SiteProductCreateEditTypeEnum.EDIT && t(`${commonText}.EDIT.TITLE`)}
				</DialogTitle>
				<DialogContent>
					<Typography variant="body1" color="textSecondary">
						{type === SiteProductCreateEditTypeEnum.CREATE &&
							t(`${commonText}.CREATE.TEXT`)}
						{type === SiteProductCreateEditTypeEnum.EDIT &&
							t(`${commonText}.EDIT.TEXT`)}
					</Typography>

					<FormControl error fullWidth margin="normal">
						<TextField
							required
							variant="outlined"
							type="string"
							id="name"
							name="name"
							value={product?.name}
							error={!!errors.name}
							onChange={handleChangeInput}
							onBlur={handleBlur}
							label={t(`${commonText}.FIELDS.NAME.LABEL`)}
							placeholder={t(`${commonText}.FIELDS.NAME.PLACEHOLDER`)}
						/>
						<FormHelperText>{t(errors.name)}</FormHelperText>
					</FormControl>

					<FormControl error fullWidth margin="normal">
						<TextField
							required
							variant="outlined"
							type="string"
							id="price"
							name="price"
							value={product?.price}
							error={!!errors.price}
							onChange={handleChangeInput}
							onBlur={handleBlur}
							label={t(`${commonText}.FIELDS.PRICE.LABEL`)}
							placeholder={t(`${commonText}.FIELDS.PRICE.PLACEHOLDER`)}
						/>
						{errors.price > 0 && (
							<FormHelperText>{t(String(errors.price))}</FormHelperText>
						)}
					</FormControl>

					<FormControl error fullWidth margin="normal">
						<TextField
							required
							variant="outlined"
							type="string"
							id="length"
							name="length"
							value={product?.length}
							error={!!errors.length}
							onChange={handleChangeInput}
							onBlur={handleBlur}
							label={t(`${commonText}.FIELDS.LENGTH.LABEL`)}
							placeholder={t(`${commonText}.FIELDS.LENGTH.PLACEHOLDER`)}
						/>
						{errors.length > 0 && (
							<FormHelperText>{t(String(errors.price))}</FormHelperText>
						)}
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" onClick={closeCreateEditProductDialog}>
						{t('BUTTONS.CANCEL')}
					</Button>
					<Button
						variant="outlined"
						type="submit"
						disabled={validateEmptyObjProperty(values) || products.updating}
						endIcon={products.updating && <CircularProgress size={20} />}>
						{type === SiteProductCreateEditTypeEnum.CREATE && t('BUTTONS.CREATE')}
						{type === SiteProductCreateEditTypeEnum.EDIT && t('BUTTONS.UPDATE')}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};
export default DialogCreateEditProduct;
