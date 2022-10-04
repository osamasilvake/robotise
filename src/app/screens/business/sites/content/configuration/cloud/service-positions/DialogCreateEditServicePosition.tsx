import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	TextField
} from '@mui/material';
import { FC, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppDispatch } from '../../../../../../../slices';
import {
	ServicePositionCreateEdit,
	ServicePositionsFetchList,
	servicePositionsSelector
} from '../../../../../../../slices/business/sites/configuration/ServicePositions.slice';
import { useForm } from '../../../../../../../utilities/hooks/form/UseForm';
import { SiteParamsInterface } from '../../../../Site.interface';
import { DialogCreateEditServicePositionValidation } from './DialogCreateEditServicePosition.validation';
import { SiteConfigurationServicePositionsCreateEditTypeEnum } from './SiteConfigurationServicePositions.enum';
import {
	DialogCreateEditServicePositionFormInterface,
	DialogCreateEditServicePositionInterface
} from './SiteConfigurationServicePositions.interface';

const DialogCreateEditServicePosition: FC<DialogCreateEditServicePositionInterface> = (props) => {
	const { type, open, setOpen, index } = props;
	const { t } = useTranslation(['SITES', 'DIALOG']);

	const dispatch = useDispatch<AppDispatch>();
	const servicePositions = useSelector(servicePositionsSelector);

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;
	const cSiteId = params.siteId;

	const servicePosition = index !== undefined ? servicePositions.content?.data[index] : null;
	const translation = 'CONTENT.CONFIGURATION.SERVICE_POSITIONS.CREATE_EDIT';

	const { handleChangeInput, handleBlur, handleSubmit, values, errors } =
		useForm<DialogCreateEditServicePositionFormInterface>(
			{
				name: servicePosition?.name || '',
				location: servicePosition?.location || ''
			},
			DialogCreateEditServicePositionValidation,
			async () => {
				// dispatch: create/edit service position
				dispatch(
					ServicePositionCreateEdit(
						cSiteId,
						{
							...values,
							id: servicePosition?.id
						},
						index !== undefined
							? SiteConfigurationServicePositionsCreateEditTypeEnum.EDIT
							: SiteConfigurationServicePositionsCreateEditTypeEnum.CREATE,
						() => {
							// dispatch: fetch service positions
							dispatch(ServicePositionsFetchList(cSiteId, true));

							// close dialog
							setOpen(false);
						}
					)
				);
			}
		);

	/**
	 * close dialog
	 * @param event
	 */
	const closeDialog = (event: MouseEvent<HTMLButtonElement>) => {
		// stop propagation
		event.stopPropagation();

		// close dialog
		setOpen(false);
	};

	return (
		<Dialog open={open} onClose={closeDialog} fullWidth>
			<form onSubmit={handleSubmit}>
				<DialogTitle>
					{type === SiteConfigurationServicePositionsCreateEditTypeEnum.CREATE &&
						t(`${translation}.CREATE.TITLE`)}
					{type === SiteConfigurationServicePositionsCreateEditTypeEnum.EDIT &&
						t(`${translation}.EDIT.TITLE`)}
				</DialogTitle>

				<DialogContent>
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
							type="text"
							id="location"
							name="location"
							label={t(`${translation}.FIELDS.LOCATION.LABEL`)}
							placeholder={t(`${translation}.FIELDS.LOCATION.PLACEHOLDER`)}
							value={values?.location}
							onChange={handleChangeInput}
							onBlur={handleBlur}
							error={!!errors?.location}
							helperText={errors?.location && t(errors.location)}
						/>
					</FormControl>
				</DialogContent>

				<DialogActions>
					<Button
						variant="outlined"
						disabled={servicePositions.updating}
						onClick={closeDialog}>
						{t('DIALOG:BUTTONS.CANCEL')}
					</Button>
					<Button
						variant="outlined"
						type="submit"
						disabled={servicePositions.updating}
						endIcon={servicePositions.updating && <CircularProgress size={20} />}>
						{type === SiteConfigurationServicePositionsCreateEditTypeEnum.CREATE &&
							t('DIALOG:BUTTONS.CREATE')}
						{type === SiteConfigurationServicePositionsCreateEditTypeEnum.EDIT &&
							t('DIALOG:BUTTONS.UPDATE')}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};
export default DialogCreateEditServicePosition;
