import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormHelperText,
	Grid,
	TextField
} from '@material-ui/core';
import { FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import UploadImage from '../../../../../../../components/common/upload/UploadImage';
import { AppConfigService } from '../../../../../../../services';
import {
	ProductCreateEdit,
	productsSelector
} from '../../../../../../../slices/products/Products.slice';
import { sitesSelector } from '../../../../../../../slices/sites/Sites.slice';
import { useForm } from '../../../../../../../utilities/hooks/form/UseForm';
import {
	validateEmptyObj,
	validateEmptyObjProperty
} from '../../../../../../../utilities/methods/ObjectUtilities';
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
	const sites = useSelector(sitesSelector);
	const products = useSelector(productsSelector);

	const { handleChangeInput, handleBlur, handleSubmit, values, errors } =
		useForm<DialogCreateEditProductPayloadInterface>(
			{
				image: product?.image || '',
				name: product?.name || '',
				price: product?.price || 0,
				length: product?.length || 0,
				weight: product?.weight || 0,
				volume: product?.volume || ''
			},
			CreateEditProductValidation,
			async () => {
				// dispatch: create/edit a product
				params.site &&
					dispatch(
						ProductCreateEdit(
							{
								...values,
								image
							},
							type,
							params.site,
							product?.id,
							() => setOpen(false)
						)
					);
			}
		);
	const [image, setImage] = useState<string>(values?.image);
	const [imageError, setImageError] = useState(0);

	const params: SiteParamsInterface = useParams();
	const commonText = 'SITES:CONTENT.PRODUCTS.LIST.ACTIONS.CREATE_EDIT';
	const defaultCurrency = AppConfigService.AppOptions.common.defaultCurrency;
	const currency = sites.content?.dataById[params.site]?.currency || defaultCurrency;

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
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6} md={6}>
							<UploadImage
								image={image}
								setImage={setImage}
								imageError={imageError}
								setImageError={setImageError}
							/>
						</Grid>

						<Grid item xs={12} sm={6} md={6}>
							<FormControl error fullWidth margin="normal">
								<TextField
									required
									variant="outlined"
									type="string"
									id="name"
									name="name"
									value={values?.name}
									error={!!errors?.name}
									onChange={handleChangeInput}
									onBlur={handleBlur}
									label={t(`${commonText}.FIELDS.NAME.LABEL`)}
									placeholder={t(`${commonText}.FIELDS.NAME.PLACEHOLDER`)}
								/>
								{errors?.name && <FormHelperText>{t(errors.name)}</FormHelperText>}
							</FormControl>
							<FormControl error fullWidth margin="normal">
								<TextField
									required
									variant="outlined"
									type="number"
									id="price"
									name="price"
									value={values?.price}
									error={!!errors?.price}
									onChange={handleChangeInput}
									onBlur={handleBlur}
									label={t(`${commonText}.FIELDS.PRICE.LABEL`, {
										value: currency
									})}
									placeholder={t(`${commonText}.FIELDS.PRICE.PLACEHOLDER`)}
									InputProps={{ inputProps: { min: 0, step: '0.01' } }}
								/>
								{errors && typeof errors.price === 'string' && (
									<FormHelperText>{t(errors.price)}</FormHelperText>
								)}
							</FormControl>
						</Grid>

						<Grid item xs={12} sm={4} md={4}>
							<FormControl error fullWidth>
								<TextField
									variant="outlined"
									type="number"
									id="length"
									name="length"
									value={values?.length}
									onChange={handleChangeInput}
									onBlur={handleBlur}
									label={t(`${commonText}.FIELDS.LENGTH.LABEL`)}
									placeholder={t(`${commonText}.FIELDS.LENGTH.PLACEHOLDER`)}
									InputProps={{ inputProps: { min: 0, step: '0.01' } }}
								/>
							</FormControl>
						</Grid>

						<Grid item xs={12} sm={4} md={4}>
							<FormControl error fullWidth>
								<TextField
									variant="outlined"
									type="number"
									id="weight"
									name="weight"
									value={values?.weight}
									onChange={handleChangeInput}
									onBlur={handleBlur}
									label={t(`${commonText}.FIELDS.WEIGHT.LABEL`)}
									placeholder={t(`${commonText}.FIELDS.WEIGHT.PLACEHOLDER`)}
									InputProps={{ inputProps: { min: 0, step: '0.01' } }}
								/>
							</FormControl>
						</Grid>

						<Grid item xs={12} sm={4} md={4}>
							<FormControl error fullWidth>
								<TextField
									variant="outlined"
									type="string"
									id="volume"
									name="volume"
									value={values?.volume}
									onChange={handleChangeInput}
									onBlur={handleBlur}
									label={t(`${commonText}.FIELDS.SIZE.LABEL`)}
									placeholder={t(`${commonText}.FIELDS.SIZE.PLACEHOLDER`)}
								/>
							</FormControl>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" onClick={closeCreateEditProductDialog}>
						{t('BUTTONS.CANCEL')}
					</Button>
					<Button
						variant="outlined"
						type="submit"
						disabled={
							(errors && !validateEmptyObj(errors)) ||
							validateEmptyObjProperty({
								image,
								name: values.name,
								price: values.price
							}) ||
							products.updating
						}
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
