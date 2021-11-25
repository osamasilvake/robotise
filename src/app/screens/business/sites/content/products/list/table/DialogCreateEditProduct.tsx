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
} from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Upload from '../../../../../../../components/common/upload/Upload';
import { AppConfigService } from '../../../../../../../services';
import {
	ProductCreateEdit,
	ProductsFetchList,
	productsSelector
} from '../../../../../../../slices/business/sites/products/Products.slice';
import { sitesSelector } from '../../../../../../../slices/business/sites/Sites.slice';
import { useForm } from '../../../../../../../utilities/hooks/form/UseForm';
import {
	validateEmptyObj,
	validateEmptyObjProperty
} from '../../../../../../../utilities/methods/Object';
import { timeout } from '../../../../../../../utilities/methods/Timeout';
import { SiteParamsInterface } from '../../../../Site.interface';
import { CreateEditProductValidation } from './DialogCreateEditProduct.validation';
import { SiteProductCreateEditTypeEnum } from './SiteProductsTable.enum';
import {
	DialogCreateEditProductFormInterface,
	DialogCreateEditProductInterface
} from './SiteProductsTable.interface';

const DialogCreateEditProduct: FC<DialogCreateEditProductInterface> = (props) => {
	const { product, open, setOpen, type } = props;
	const { t } = useTranslation(['DIALOG', 'SITES']);

	const dispatch = useDispatch();
	const sites = useSelector(sitesSelector);
	const products = useSelector(productsSelector);

	const [image, setImage] = useState<string>(product?.image || '');
	const [imageError, setImageError] = useState(0);

	const params = useParams() as SiteParamsInterface;
	const cSiteId = params.siteId;
	const defaultCurrency = AppConfigService.AppOptions.common.defaultCurrency;
	const currency = sites.content?.dataById[cSiteId]?.currency || defaultCurrency;
	const translation = 'SITES:CONTENT.PRODUCTS.LIST.ACTIONS.CREATE_EDIT';

	const { handleChangeInput, handleBlur, handleSubmit, values, errors } =
		useForm<DialogCreateEditProductFormInterface>(
			{
				image: product?.image || '',
				name: product?.name || '',
				price: product?.price || '',
				length: product?.length || '',
				weight: product?.weight || '',
				volume: product?.volume || ''
			},
			CreateEditProductValidation,
			async () => {
				// dispatch: create/edit product
				cSiteId &&
					dispatch(
						ProductCreateEdit(
							cSiteId,
							product?.id,
							{
								...values,
								length: values.length || null,
								weight: values.weight || null,
								image
							},
							type,
							async () => {
								// dispatch: fetch site products
								dispatch(ProductsFetchList(cSiteId, true));

								// wait
								await timeout(2000);

								// close dialog
								setOpen(false);
							}
						)
					);
			}
		);

	return (
		<Dialog open={open} onClose={() => setOpen(false)}>
			<form onSubmit={handleSubmit}>
				<DialogTitle>
					{type === SiteProductCreateEditTypeEnum.CREATE &&
						t(`${translation}.CREATE.TITLE`)}
					{type === SiteProductCreateEditTypeEnum.EDIT && t(`${translation}.EDIT.TITLE`)}
				</DialogTitle>
				<DialogContent>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6} md={6}>
							<Upload
								image={image}
								setImage={setImage}
								imageError={imageError}
								setImageError={setImageError}
								background={product?.price === 1}
							/>
						</Grid>

						<Grid item xs={12} sm={6} md={6}>
							<FormControl error fullWidth margin="normal">
								<TextField
									required
									type="text"
									id="name"
									name="name"
									value={values?.name}
									error={!!errors?.name}
									onChange={handleChangeInput}
									onBlur={handleBlur}
									label={t(`${translation}.FIELDS.NAME.LABEL`)}
									placeholder={t(`${translation}.FIELDS.NAME.PLACEHOLDER`)}
								/>
								{errors?.name && <FormHelperText>{t(errors.name)}</FormHelperText>}
							</FormControl>
							<FormControl error fullWidth margin="normal">
								<TextField
									required
									type="number"
									id="price"
									name="price"
									value={values?.price}
									error={!!errors?.price}
									onChange={handleChangeInput}
									onBlur={handleBlur}
									label={t(`${translation}.FIELDS.PRICE.LABEL`, {
										value: currency
									})}
									placeholder={t(`${translation}.FIELDS.PRICE.PLACEHOLDER`)}
									InputProps={{ inputProps: { min: 0, step: 0.01 } }}
								/>
								{errors && typeof errors.price === 'string' && (
									<FormHelperText>{t(errors.price)}</FormHelperText>
								)}
							</FormControl>
						</Grid>

						<Grid item xs={12} sm={4} md={4}>
							<FormControl error fullWidth>
								<TextField
									type="number"
									id="length"
									name="length"
									value={values?.length}
									error={!!errors?.length}
									onChange={handleChangeInput}
									onBlur={handleBlur}
									label={t(`${translation}.FIELDS.LENGTH.LABEL`)}
									placeholder={t(`${translation}.FIELDS.LENGTH.PLACEHOLDER`)}
									InputProps={{ inputProps: { min: 0, step: 0.01 } }}
								/>
								{errors && typeof errors.length === 'string' && (
									<FormHelperText>{t(errors.length)}</FormHelperText>
								)}
							</FormControl>
						</Grid>

						<Grid item xs={12} sm={4} md={4}>
							<FormControl error fullWidth>
								<TextField
									type="number"
									id="weight"
									name="weight"
									value={values?.weight}
									error={!!errors?.weight}
									onChange={handleChangeInput}
									onBlur={handleBlur}
									label={t(`${translation}.FIELDS.WEIGHT.LABEL`)}
									placeholder={t(`${translation}.FIELDS.WEIGHT.PLACEHOLDER`)}
									InputProps={{ inputProps: { min: 0, step: 0.01 } }}
								/>
								{errors && typeof errors.weight === 'string' && (
									<FormHelperText>{t(errors.weight)}</FormHelperText>
								)}
							</FormControl>
						</Grid>

						<Grid item xs={12} sm={4} md={4}>
							<FormControl fullWidth>
								<TextField
									type="text"
									id="volume"
									name="volume"
									value={values?.volume}
									onChange={handleChangeInput}
									onBlur={handleBlur}
									label={t(`${translation}.FIELDS.SIZE.LABEL`)}
									placeholder={t(`${translation}.FIELDS.SIZE.PLACEHOLDER`)}
								/>
							</FormControl>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" onClick={() => setOpen(false)}>
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
