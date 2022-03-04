import AdapterDayJS from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
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
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
	siteOperationsSelector,
	SiteTestOrdersClean
} from '../../../../../../slices/business/sites/SiteOperations.slice';
import { useForm } from '../../../../../../utilities/hooks/form/UseForm';
import {
	dateFormat4,
	dateToday,
	dateTodayWithTime
} from '../../../../../../utilities/methods/Date';
import { SiteParamsInterface } from '../../../Site.interface';
import {
	DialogCleanTestOrdersFormInterface,
	DialogCleanTestOrdersInterface
} from './SiteCleanTestOrders.interface';

const DialogCleanTestOrders: FC<DialogCleanTestOrdersInterface> = (props) => {
	const { open, setOpen } = props;
	const { t } = useTranslation(['DIALOG', 'SITES']);

	const dispatch = useDispatch();
	const siteOperations = useSelector(siteOperationsSelector);

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;
	const cSiteId = params.siteId;
	const translation = 'SITES:CONTENT.CONFIGURATION.CLEAN_TEST_ORDERS';

	const { handleChangeInput, handleBlur, handleSubmit, values, errors } =
		useForm<DialogCleanTestOrdersFormInterface>(
			{
				dateTo: dateToday(),
				timeTo: dateTodayWithTime()
			},
			() => ({ dateTo: '', timeTo: '' }),
			async () => {
				const payload = { ...values, timeTo: dateFormat4(new Date(values.timeTo)) };

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
						<LocalizationProvider dateAdapter={AdapterDayJS}>
							<TimePicker
								label="Time To"
								value={values.timeTo}
								onChange={(e) => {
									handleChangeInput({
										target: {
											name: 'timeTo',
											value: String(e)
										}
									});
								}}
								renderInput={(params) => <TextField {...params} />}
							/>
						</LocalizationProvider>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button
						variant="outlined"
						onClick={() => setOpen(false)}
						disabled={siteOperations.cleanTestOrders.loading}>
						{t('BUTTONS.CANCEL')}
					</Button>
					<Button
						color="error"
						type="submit"
						variant="outlined"
						disabled={siteOperations.cleanTestOrders.loading}
						endIcon={
							siteOperations.cleanTestOrders.loading && <CircularProgress size={20} />
						}>
						{t('BUTTONS.SUBMIT')}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};
export default DialogCleanTestOrders;
