import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	TextField
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppDispatch } from '../../../../../../../slices';
import {
	siteCloudConfigurationSelector,
	SiteTestOrdersClean
} from '../../../../../../../slices/business/sites/configuration/cloud/SiteCloudConfiguration.slice';
import { useForm } from '../../../../../../../utilities/hooks/form/UseForm';
import { dateDayJs, dateFormat3, dateToday } from '../../../../../../../utilities/methods/Date';
import { SiteParamsInterface } from '../../../../Site.interface';
import {
	DialogCleanTestOrdersFormInterface,
	DialogCleanTestOrdersInterface
} from './SiteConfigurationCleanTestOrders.interface';

const DialogCleanTestOrders: FC<DialogCleanTestOrdersInterface> = (props) => {
	const { open, setOpen } = props;
	const { t } = useTranslation(['SITES', 'DIALOG']);

	const dispatch = useDispatch<AppDispatch>();
	const siteCloudConfiguration = useSelector(siteCloudConfigurationSelector);

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;
	const cSiteId = params.siteId;
	const translation = 'CONTENT.CONFIGURATION.CLEAN_TEST_ORDERS';

	const { handleChangeInput, handleBlur, handleSubmit, values, errors } =
		useForm<DialogCleanTestOrdersFormInterface>(
			{
				dateTo: dateToday(),
				timeTo: dateDayJs().format('YYYY-MM-DD hh:mm:ss')
			},
			() => ({ dateTo: '', timeTo: '' }),
			async () => {
				const payload = { ...values, timeTo: dateFormat3(new Date(values.timeTo)) };

				// dispatch: clean test orders
				dispatch(
					SiteTestOrdersClean(cSiteId, payload, () => {
						// close dialog
						setOpen(false);
					})
				);
			}
		);

	return (
		<Dialog open={open} onClose={() => setOpen(false)}>
			<form onSubmit={handleSubmit}>
				<DialogTitle>{t(`${translation}.TITLE`)}</DialogTitle>
				<DialogContent>
					<DialogContentText>{t(`${translation}.TEXT`)}</DialogContentText>
					<FormControl fullWidth margin="normal">
						<TextField
							type="date"
							id="dateTo"
							name="dateTo"
							label={t(`${translation}.FORM.FIELDS.DATE_TO.LABEL`)}
							value={values.dateTo}
							onChange={handleChangeInput}
							onBlur={handleBlur}
							error={!!errors?.dateTo}
							InputLabelProps={{ shrink: true }}
						/>
					</FormControl>
					<FormControl fullWidth margin="normal">
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<TimePicker
								ampm={false}
								label={t(`${translation}.FORM.FIELDS.TIME_TO.LABEL`)}
								value={dateDayJs(values.timeTo)}
								onChange={(e) => {
									handleChangeInput({
										target: {
											name: 'timeTo',
											value: String(e)
										}
									});
								}}
							/>
						</LocalizationProvider>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button
						variant="outlined"
						onClick={() => setOpen(false)}
						disabled={siteCloudConfiguration.cleanTestOrders.loading}>
						{t('DIALOG:BUTTONS.CANCEL')}
					</Button>
					<Button
						color="error"
						type="submit"
						variant="outlined"
						disabled={siteCloudConfiguration.cleanTestOrders.loading}
						endIcon={
							siteCloudConfiguration.cleanTestOrders.loading && (
								<CircularProgress size={20} />
							)
						}>
						{t('DIALOG:BUTTONS.SUBMIT')}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};
export default DialogCleanTestOrders;
