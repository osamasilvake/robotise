import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
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
import {
	SiteProductCreateEditLengthValidationTypeEnum,
	SiteProductCreateEditTypeEnum
} from './SiteProductsTable.enum';
import {
	DialogCreateEditProductFormInterface,
	DialogCreateEditProductInterface
} from './SiteProductsTable.interface';

const DialogCreateEditProduct: FC<DialogCreateEditProductInterface> = (props) => {
	const { product, open, setOpen, type } = props;
	const { t } = useTranslation(['SITES', 'DIALOG']);

	const dispatch = useDispatch();
	const sites = useSelector(sitesSelector);
	const products = useSelector(productsSelector);

	const [image, setImage] = useState<string>(product?.image || '');
	const [imageError, setImageError] = useState(0);

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;
	const cSiteId = params.siteId;
	const defaultCurrency = AppConfigService.AppOptions.common.currencies[0].id;
	const currency = sites.content?.dataById[cSiteId]?.currency || defaultCurrency;
	const translation = 'CONTENT.PRODUCTS.LIST.ACTIONS.CREATE_EDIT';
	const lengthEnum = SiteProductCreateEditLengthValidationTypeEnum;

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
								name: values.name.trim(),
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
							<FormControl fullWidth margin="normal">
								<TextField
									required
									type="text"
									id="name"
									name="name"
									label={t(`${translation}.FIELDS.NAME.LABEL`)}
									placeholder={t(`${translation}.FIELDS.NAME.PLACEHOLDER`)}
									value={values?.name}
									onChange={handleChangeInput}
									onBlur={handleBlur}
									error={!!errors?.name}
									helperText={errors?.name && t(errors.name)}
								/>
							</FormControl>
							<FormControl fullWidth margin="normal">
								<TextField
									required
									type="number"
									id="price"
									name="price"
									label={t(`${translation}.FIELDS.PRICE.LABEL`, {
										value: currency
									})}
									placeholder={t(`${translation}.FIELDS.PRICE.PLACEHOLDER`)}
									value={values?.price}
									onChange={handleChangeInput}
									onBlur={handleBlur}
									error={!!errors?.price}
									helperText={
										errors &&
										typeof errors.price === 'string' &&
										t(errors.price)
									}
									InputProps={{ inputProps: { min: 0, step: 0.01 } }}
								/>
							</FormControl>
						</Grid>

						<Grid item xs={12} sm={4} md={4}>
							<FormControl fullWidth>
								<TextField
									type="number"
									id="length"
									name="length"
									label={t(`${translation}.FIELDS.LENGTH.LABEL`)}
									placeholder={t(`${translation}.FIELDS.LENGTH.PLACEHOLDER`)}
									value={values?.length}
									onChange={handleChangeInput}
									onBlur={handleBlur}
									error={!!errors?.length}
									helperText={
										errors &&
										typeof errors.length === 'string' &&
										t(errors.length, {
											min: lengthEnum.MIN,
											max: lengthEnum.MAX
										})
									}
									InputProps={{
										inputProps: {
											min: lengthEnum.MIN,
											max: lengthEnum.MAX,
											step: 0.01
										}
									}}
								/>
							</FormControl>
						</Grid>

						<Grid item xs={12} sm={4} md={4}>
							<FormControl fullWidth>
								<TextField
									type="number"
									id="weight"
									name="weight"
									label={t(`${translation}.FIELDS.WEIGHT.LABEL`)}
									placeholder={t(`${translation}.FIELDS.WEIGHT.PLACEHOLDER`)}
									value={values?.weight}
									onChange={handleChangeInput}
									onBlur={handleBlur}
									error={!!errors?.weight}
									helperText={
										errors &&
										typeof errors.weight === 'string' &&
										t(errors.weight)
									}
									InputProps={{ inputProps: { min: 0, step: 0.01 } }}
								/>
							</FormControl>
						</Grid>

						<Grid item xs={12} sm={4} md={4}>
							<FormControl fullWidth>
								<TextField
									type="text"
									id="volume"
									name="volume"
									label={t(`${translation}.FIELDS.SIZE.LABEL`)}
									placeholder={t(`${translation}.FIELDS.SIZE.PLACEHOLDER`)}
									value={values?.volume}
									onChange={handleChangeInput}
									onBlur={handleBlur}
								/>
							</FormControl>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" onClick={() => setOpen(false)}>
						{t('DIALOG:BUTTONS.CANCEL')}
					</Button>
					<Button
						variant="outlined"
						type="submit"
						disabled={
							products.updating ||
							(errors && !validateEmptyObj(errors)) ||
							validateEmptyObjProperty({
								image,
								name: values.name,
								price: values.price
							})
						}
						endIcon={products.updating && <CircularProgress size={20} />}>
						{type === SiteProductCreateEditTypeEnum.CREATE &&
							t('DIALOG:BUTTONS.CREATE')}
						{type === SiteProductCreateEditTypeEnum.EDIT && t('DIALOG:BUTTONS.UPDATE')}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};
export default DialogCreateEditProduct;
