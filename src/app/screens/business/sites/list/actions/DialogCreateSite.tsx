import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography
} from '@mui/material';
import { FC, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppConfigService } from '../../../../../services';
import {
	SiteCreate,
	SitesFetchList,
	sitesSelector
} from '../../../../../slices/business/sites/Sites.slice';
import { useForm } from '../../../../../utilities/hooks/form/UseForm';
import { validateEmptyObjProperty } from '../../../../../utilities/methods/Object';
import { CreateSiteValidation } from './DialogCreateSite.validation';
import { DialogCreateSiteFormInterface, DialogCreateSiteInterface } from './SitesActions.interface';

const DialogCreateSite: FC<DialogCreateSiteInterface> = (props) => {
	const { open, setOpen } = props;
	const { t } = useTranslation(['DIALOG', 'SITES']);

	const dispatch = useDispatch();
	const sites = useSelector(sitesSelector);

	const currencies = AppConfigService.AppOptions.common.currencies;
	const timezones = AppConfigService.AppOptions.common.timezones;
	const translation = 'SITES:LIST.ACTIONS.CREATE';

	const { handleChangeInput, handleBlur, handleChangeSelect, handleSubmit, values, errors } =
		useForm<DialogCreateSiteFormInterface>(
			{
				title: '',
				timezone: AppConfigService.AppOptions.common.timezones[0].id,
				currency: AppConfigService.AppOptions.common.currencies[0].id
			},
			CreateSiteValidation,
			async () => {
				// dispatch: create a site
				dispatch(
					SiteCreate(values, () => {
						// dispatch: fetch sites
						dispatch(SitesFetchList(true));

						// close dialog
						setOpen(false);
					})
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
		<Dialog open={open} onClose={closeDialog}>
			<form onSubmit={handleSubmit}>
				<DialogTitle>{t(`${translation}.TITLE`)}</DialogTitle>
				<DialogContent>
					<Typography color="textSecondary">{t(`${translation}.TEXT`)}</Typography>
					<FormControl fullWidth margin="normal">
						<TextField
							required
							type="string"
							id="title"
							name="title"
							label={t(`${translation}.FIELDS.TITLE.LABEL`)}
							placeholder={t(`${translation}.FIELDS.TITLE.PLACEHOLDER`)}
							value={values?.title}
							onChange={handleChangeInput}
							onBlur={handleBlur}
							error={!!errors?.title}
							helperText={errors?.title && t(errors.title)}
						/>
					</FormControl>
					<FormControl fullWidth margin="normal">
						<InputLabel id="label-currencyId">
							{t(`${translation}.FIELDS.CURRENCY.LABEL`)}
						</InputLabel>
						<Select
							labelId="label-currencyId"
							id="currency"
							name="currency"
							label={t(`${translation}.FIELDS.CURRENCY.LABEL`)}
							value={values.currency}
							onChange={handleChangeSelect}>
							{currencies.map((currency) => (
								<MenuItem key={currency.id} value={currency.id}>
									{currency.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<FormControl fullWidth margin="normal">
						<InputLabel id="label-timezoneId">
							{t(`${translation}.FIELDS.TIMEZONE.LABEL`)}
						</InputLabel>
						<Select
							labelId="label-timezoneId"
							id="timezone"
							name="timezone"
							label={t(`${translation}.FIELDS.TIMEZONE.LABEL`)}
							value={values.timezone}
							onChange={handleChangeSelect}>
							{timezones.map((timezone) => (
								<MenuItem key={timezone.id} value={timezone.id}>
									{timezone.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<Typography color="textSecondary" variant="body2" noWrap>
						{t(`${translation}.NOTE`)}
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" onClick={closeDialog}>
						{t('BUTTONS.CANCEL')}
					</Button>
					<Button
						variant="outlined"
						type="submit"
						disabled={sites.updating || validateEmptyObjProperty(values)}
						endIcon={sites.updating && <CircularProgress size={20} />}>
						{t('BUTTONS.CREATE')}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};
export default DialogCreateSite;
