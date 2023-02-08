import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select
} from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { AppConfigService } from '../../../../../../../services';
import { AppDispatch } from '../../../../../../../slices';
import {
	phoneConfigsSelector,
	PhoneConfigTestOutboundCall
} from '../../../../../../../slices/business/sites/phone-configs/PhoneConfigs.slice';
import { roomsSelector } from '../../../../../../../slices/business/sites/rooms/Rooms.slice';
import { RoomsTypeEnum } from '../../../../../../../slices/business/sites/rooms/Rooms.slice.enum';
import { useForm } from '../../../../../../../utilities/hooks/form/UseForm';
import { validateEmptyObj } from '../../../../../../../utilities/methods/Object';
import { SiteParamsInterface } from '../../../../Site.interface';
import {
	DialogTestOutboundCallPhoneConfigFormInterface,
	DialogTestOutboundCallPhoneConfigInterface
} from './SitePhoneConfigsEdit.interface';

const DialogTestOutboundCallPhoneConfig: FC<DialogTestOutboundCallPhoneConfigInterface> = (
	props
) => {
	const { open, setOpen } = props;
	const { t } = useTranslation(['SITES', 'DIALOG']);

	const dispatch = useDispatch<AppDispatch>();
	const rooms = useSelector(roomsSelector);
	const phoneConfigs = useSelector(phoneConfigsSelector);

	const navigate = useNavigate();
	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;
	const cSiteId = params.siteId;
	const roomsGroupBy = rooms.content?.groupByType;
	const rLocations = roomsGroupBy?.find((r) => r.key === RoomsTypeEnum.ROOM)?.values || [];
	const phoneConfig = phoneConfigs.content?.data[0];
	const translation = 'CONTENT.PHONE_CONFIGS.DETAIL.ACTIONS.OUTBOUND_CALL';

	const { handleChangeSelect, handleSubmit, values, errors } =
		useForm<DialogTestOutboundCallPhoneConfigFormInterface>(
			{
				prefix: '',
				location: ''
			},
			() => ({ prefix: '', location: '' }),
			async () => {
				// dispatch: test phone config outbound call
				dispatch(
					PhoneConfigTestOutboundCall(cSiteId, values, () => {
						// prepare link
						const link =
							AppConfigService.AppRoutes.SCREENS.BUSINESS.SITES.PHONE_CALLS.replace(
								':siteId',
								cSiteId
							);

						// navigate
						navigate(link);
					})
				);
			}
		);

	return (
		<>
			<Dialog open={open} onClose={() => setOpen(false)} fullWidth>
				<form onSubmit={handleSubmit}>
					<DialogTitle>{t(`${translation}.TITLE`)}</DialogTitle>
					<DialogContent>
						<DialogContentText>{t(`${translation}.EXCERPT`)}</DialogContentText>

						<Grid container spacing={2}>
							<Grid item xs={12} sm={6} md={6}>
								<FormControl fullWidth margin="normal">
									<InputLabel id="label-prefix">
										{t(`${translation}.FORM.FIELDS.PREFIX.LABEL`)}
									</InputLabel>
									<Select
										labelId="label-prefix"
										id="prefix"
										name="prefix"
										label={t(`${translation}.FORM.FIELDS.PREFIX.LABEL`)}
										value={values.prefix}
										onChange={handleChangeSelect}>
										{phoneConfig?.prefixes?.map((prefix) => (
											<MenuItem key={prefix} value={prefix}>
												{prefix}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={12} sm={6} md={6}>
								<FormControl fullWidth margin="normal">
									<InputLabel id="label-location">
										{t(`${translation}.FORM.FIELDS.LOCATION.LABEL`)}
									</InputLabel>
									<Select
										labelId="label-location"
										id="location"
										name="location"
										label={t(`${translation}.FORM.FIELDS.LOCATION.LABEL`)}
										value={values.location}
										onChange={handleChangeSelect}>
										{rLocations.map((location) => (
											<MenuItem key={location.id} value={location.id}>
												{location.name}
											</MenuItem>
										))}
									</Select>
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
								phoneConfigs.updating || (!!errors && !validateEmptyObj(errors))
							}
							endIcon={phoneConfigs.updating && <CircularProgress size={20} />}>
							{t('DIALOG:BUTTONS.TEST')}
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</>
	);
};

export default DialogTestOutboundCallPhoneConfig;
