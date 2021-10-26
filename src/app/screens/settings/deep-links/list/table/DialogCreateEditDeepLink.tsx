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
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { SDLStateInterface } from '../../../../../slices/settings/deep-links/DeepLinks.interface';
import {
	DeepLinkCreateEdit,
	deepLinksSelector,
	DeepLinksUpdateState
} from '../../../../../slices/settings/deep-links/DeepLinks.slice';
import { useForm } from '../../../../../utilities/hooks/form/UseForm';
import {
	validateEmptyObj,
	validateEmptyObjProperty
} from '../../../../../utilities/methods/Object';
import { DeepLinkCreateEditTypeEnum } from './DeepLinksTable.enum';
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
				console.log('called', values);
				// dispatch: create/edit deep link
				dispatch(
					DeepLinkCreateEdit(deepLink?.id, values, type, async () => {
						// close dialog
						setOpen(false);

						// dispatch: update state
						const state: SDLStateInterface = {
							...deepLinks.content?.state,
							page: 0
						};
						dispatch(DeepLinksUpdateState(state));
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
						</Grid>

						<Grid item xs={12} sm={6} md={6}>
							<FormControl error fullWidth margin="normal">
								<TextField
									required
									type="text"
									id="key"
									name="key"
									value={values?.key}
									error={!!errors?.key}
									onChange={handleChangeInput}
									onBlur={handleBlur}
									label={t(`${translation}.FIELDS.KEY.LABEL`)}
									placeholder={t(`${translation}.FIELDS.KEY.PLACEHOLDER`)}
								/>
								{errors?.key && <FormHelperText>{t(errors.key)}</FormHelperText>}
							</FormControl>
						</Grid>

						<Grid item xs={12}>
							<FormControl error fullWidth>
								<TextField
									required
									type="text"
									id="link"
									name="link"
									value={values?.link}
									error={!!errors?.link}
									onChange={handleChangeInput}
									onBlur={handleBlur}
									label={t(`${translation}.FIELDS.LINK.LABEL`)}
									placeholder={t(`${translation}.FIELDS.LINK.PLACEHOLDER`)}
								/>
								{errors?.link && <FormHelperText>{t(errors.link)}</FormHelperText>}
							</FormControl>
						</Grid>

						<Grid item xs={12}>
							<FormControl error fullWidth margin="dense">
								<TextField
									required
									multiline
									type="text"
									id="description"
									name="description"
									rows={6}
									value={values?.description}
									error={!!errors?.description}
									onChange={handleChangeInput}
									onBlur={handleBlur}
									label={t(`${translation}.FIELDS.DESCRIPTION.LABEL`)}
									placeholder={t(`${translation}.FIELDS.DESCRIPTION.PLACEHOLDER`)}
								/>
								{errors?.description && (
									<FormHelperText>{t(errors.description)}</FormHelperText>
								)}
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
							validateEmptyObjProperty(values) ||
							deepLinks.updating
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
