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
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppConfigService } from '../../../../../services';
import {
	DeepLinkCreateEdit,
	DeepLinksFetchList,
	deepLinksSelector
} from '../../../../../slices/settings/deep-links/DeepLinks.slice';
import { useForm } from '../../../../../utilities/hooks/form/UseForm';
import {
	validateEmptyObj,
	validateEmptyObjProperty
} from '../../../../../utilities/methods/Object';
import { DeepLinkCreateEditTypeEnum, DeepLinkResetTypeEnum } from './DeepLinksTable.enum';
import {
	DialogCreateEditDeepLinkFormInterface,
	DialogCreateEditDeepLinkInterface
} from './DeepLinksTable.interface';
import { CreateEditDeepLinkValidation } from './DialogCreateEditDeepLink.validation';

const DialogCreateEditDeepLink: FC<DialogCreateEditDeepLinkInterface> = (props) => {
	const { deepLink, open, setOpen, type } = props;
	const { t } = useTranslation(['DIALOG', 'DEEP_LINKS']);

	const dispatch = useDispatch();
	const deepLinks = useSelector(deepLinksSelector);

	const translation = 'DEEP_LINKS:LIST.ACTIONS.CREATE_EDIT';

	const { handleChangeInput, handleBlur, handleSubmit, values, errors } =
		useForm<DialogCreateEditDeepLinkFormInterface>(
			{
				name: deepLink?.name || '',
				description: deepLink?.description || '',
				key: deepLink?.key || '',
				link: deepLink?.link || ''
			},
			CreateEditDeepLinkValidation,
			async () => {
				// dispatch: create/edit deep link
				dispatch(
					DeepLinkCreateEdit(deepLink?.id, values, type, () => {
						// close dialog
						setOpen(false);

						if (type === DeepLinkCreateEditTypeEnum.CREATE) {
							// dispatch: fetch deep links
							dispatch(
								DeepLinksFetchList({
									page: 0,
									rowsPerPage:
										deepLinks.content?.state?.rowsPerPage ||
										AppConfigService.AppOptions.screens.settings.deepLinks.list
											.defaultPageSize,
									reset: DeepLinkResetTypeEnum.RESET
								})
							);
						}
					})
				);
			}
		);

	return (
		<Dialog open={open} onClose={() => setOpen(false)}>
			<form onSubmit={handleSubmit}>
				<DialogTitle>
					{type === DeepLinkCreateEditTypeEnum.CREATE && t(`${translation}.CREATE.TITLE`)}
					{type === DeepLinkCreateEditTypeEnum.EDIT && t(`${translation}.EDIT.TITLE`)}
				</DialogTitle>
				<DialogContent>
					<Grid container spacing={2}>
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
						</Grid>

						<Grid item xs={12} sm={6} md={6}>
							<FormControl fullWidth margin="normal">
								<TextField
									required
									type="text"
									id="key"
									name="key"
									label={t(`${translation}.FIELDS.KEY.LABEL`)}
									placeholder={t(`${translation}.FIELDS.KEY.PLACEHOLDER`)}
									value={values?.key}
									onChange={handleChangeInput}
									onBlur={handleBlur}
									error={!!errors?.key}
									helperText={errors?.key && t(errors.key)}
								/>
							</FormControl>
						</Grid>

						<Grid item xs={12}>
							<FormControl fullWidth>
								<TextField
									required
									type="text"
									id="link"
									name="link"
									label={t(`${translation}.FIELDS.LINK.LABEL`)}
									placeholder={t(`${translation}.FIELDS.LINK.PLACEHOLDER`)}
									value={values?.link}
									onChange={handleChangeInput}
									onBlur={handleBlur}
									error={!!errors?.link}
									helperText={errors?.link && t(errors.link)}
								/>
							</FormControl>
						</Grid>

						<Grid item xs={12}>
							<FormControl fullWidth margin="dense">
								<TextField
									required
									multiline
									type="text"
									id="description"
									name="description"
									rows={6}
									label={t(`${translation}.FIELDS.DESCRIPTION.LABEL`)}
									placeholder={t(`${translation}.FIELDS.DESCRIPTION.PLACEHOLDER`)}
									value={values?.description}
									onChange={handleChangeInput}
									onBlur={handleBlur}
									error={!!errors?.description}
									helperText={errors?.description && t(errors.description)}
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
							deepLinks.updating ||
							(errors && !validateEmptyObj(errors)) ||
							validateEmptyObjProperty(values)
						}
						endIcon={deepLinks.updating && <CircularProgress size={20} />}>
						{type === DeepLinkCreateEditTypeEnum.CREATE && t('BUTTONS.CREATE')}
						{type === DeepLinkCreateEditTypeEnum.EDIT && t('BUTTONS.UPDATE')}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};
export default DialogCreateEditDeepLink;
