import {
	Avatar,
	Box,
	Button,
	Chip,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormHelperText,
	Grid,
	TextField,
	Typography
} from '@material-ui/core';
import clsx from 'clsx';
import { ChangeEvent, FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppConfigService } from '../../../../../../../services';
import {
	ProductCreateEdit,
	productsSelector
} from '../../../../../../../slices/products/Products.slice';
import { useForm } from '../../../../../../../utilities/hooks/form/UseForm';
import { imageFromInput } from '../../../../../../../utilities/methods/Image';
import { validateEmptyObjProperty } from '../../../../../../../utilities/methods/ObjectUtilities';
import { SiteParamsInterface } from '../../../../Site.interface';
import { CreateEditProductValidation } from './DialogCreateEditProduct.validation';
import { SiteProductCreateEditTypeEnum } from './SiteProductsTable.enum';
import {
	DialogCreateEditProductImageChangeInterface,
	DialogCreateEditProductInterface,
	DialogCreateEditProductPayloadInterface
} from './SiteProductsTable.interface';
import { SiteProductsTableStyles } from './SiteProductsTable.style';

const DialogCreateEditProduct: FC<DialogCreateEditProductInterface> = (props) => {
	const { product, open, setOpen, type } = props;
	const { t } = useTranslation(['DIALOG', 'SITES']);
	const classes = SiteProductsTableStyles();

	const dispatch = useDispatch();
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
				// dispatch: create a product
				params.site &&
					Promise.all([
						dispatch(
							ProductCreateEdit(
								{
									...values,
									image
								},
								type,
								params.site,
								product?.id
							)
						)
					]).then(() => {
						// set open
						setOpen(false);
					});
			}
		);
	const [image, setImage] = useState<string>(values?.image);
	const [imageError, setImageError] = useState(0);

	const params: SiteParamsInterface = useParams();
	const commonText = 'SITES:CONTENT.PRODUCTS.LIST.ACTIONS.PRODUCT_CREATE_EDIT';
	const maxSize = AppConfigService.AppOptions.components.uploadImage.maxSize;
	const maxHeight = AppConfigService.AppOptions.components.uploadImage.maxHeight;
	const maxWidth = AppConfigService.AppOptions.components.uploadImage.maxWidth;

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

	/**
	 * handle image change
	 * @param event
	 */
	const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const image = (await imageFromInput(event)) as DialogCreateEditProductImageChangeInterface;
		if (image.validate) {
			setImageError(0);
			setImage(image.value);
		} else {
			setImageError(image.type);
		}
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
							<Box>
								<Avatar
									variant="square"
									src={image || AppConfigService.AppImageURLs.logo.iconOff}
									alt={AppConfigService.AppImageURLs.logo.name}
								/>

								<label htmlFor="button-file">
									<Box display="none">
										<input
											accept="image/png"
											className="hidden"
											id="button-file"
											type="file"
											onChange={handleImageChange}
										/>
									</Box>
									<Chip
										size="small"
										label={t(`${commonText}.FIELDS.IMAGE.LABEL`)}
										color="primary"
										variant="outlined"
										clickable
										className={classes.sImageUpload}
									/>
								</label>
							</Box>
							<Box className={classes.sImageInfo}>
								<Typography variant="body2">
									{t(`${commonText}.FIELDS.IMAGE.RULES.RULE_1`)}
								</Typography>
								<Typography
									variant="body2"
									className={clsx({
										[classes.sImageInvalid]: imageError === 1
									})}>
									{t(`${commonText}.FIELDS.IMAGE.RULES.RULE_2`, {
										value: maxSize
									})}
								</Typography>
								<Typography
									variant="body2"
									className={clsx({
										[classes.sImageInvalid]: imageError === 2
									})}>
									{t(`${commonText}.FIELDS.IMAGE.RULES.RULE_3`, {
										value: `${maxWidth}x${maxHeight}`
									})}
								</Typography>
							</Box>
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
									label={t(`${commonText}.FIELDS.PRICE.LABEL`)}
									placeholder={t(`${commonText}.FIELDS.PRICE.PLACEHOLDER`)}
									InputProps={{ inputProps: { min: 0 } }}
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
									InputProps={{ inputProps: { min: 0 } }}
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
									InputProps={{ inputProps: { min: 0 } }}
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
									label={t(`${commonText}.FIELDS.VOLUME.LABEL`)}
									placeholder={t(`${commonText}.FIELDS.VOLUME.PLACEHOLDER`)}
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
							validateEmptyObjProperty({
								image,
								name: values.name,
								price: values.price
							}) || products.updating
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
