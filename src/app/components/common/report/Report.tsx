import { CloudDownload } from '@mui/icons-material';
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
	Stack,
	TextField,
	Typography
} from '@mui/material';
import { FC, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../../slices';
import { GeneralReportsGenerate } from '../../../slices/business/general/GeneralOperations.slice';
import { useForm } from '../../../utilities/hooks/form/UseForm';
import { dateDaysPriorToToday, dateToday } from '../../../utilities/methods/Date';
import { validateEmptyObj } from '../../../utilities/methods/Object';
import { ReportFormInterface, ReportInterface } from './Report.interface';
import { ReportStyle } from './Report.style';
import { ReportValidation } from './Report.validation';

const Report: FC<ReportInterface> = (props) => {
	const { id, open, setOpen, filterId, filterType, state } = props;
	const { t } = useTranslation(['REPORT', 'DIALOG']);
	const classes = ReportStyle();

	const dispatch = useDispatch<AppDispatch>();

	const [report, setReport] = useState('');

	const { handleChangeInput, handleBlur, handleSubmit, values, errors } =
		useForm<ReportFormInterface>(
			{
				id,
				from: dateDaysPriorToToday(30),
				to: dateToday()
			},
			ReportValidation,
			async () => {
				// dispatch: generate reports
				dispatch(
					GeneralReportsGenerate(filterId, filterType, values, (report) =>
						setReport(report)
					)
				);
			}
		);

	return (
		<Dialog open={open} onClose={() => setOpen(false)}>
			<form onSubmit={handleSubmit}>
				<DialogTitle>{t('TITLE')}</DialogTitle>
				<DialogContent>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6} md={6}>
							<FormControl error fullWidth margin="normal">
								<TextField
									id="from"
									name="from"
									label={t('FORM.FIELDS.FROM.LABEL')}
									type="date"
									value={values.from}
									error={!!errors?.from}
									onChange={handleChangeInput}
									onBlur={handleBlur}
									InputLabelProps={{ shrink: true }}
								/>
								{errors?.from && <FormHelperText>{t(errors.from)}</FormHelperText>}
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={6} md={6}>
							<FormControl fullWidth margin="normal">
								<TextField
									id="to"
									name="to"
									label={t('FORM.FIELDS.TO.LABEL')}
									type="date"
									value={values.to}
									onChange={handleChangeInput}
									onBlur={handleBlur}
									InputLabelProps={{ shrink: true }}
								/>
							</FormControl>
						</Grid>
					</Grid>

					{report && !state.loading && (
						<CSVLink
							data={report}
							separator={';'}
							filename={`${id}_${values.from}_${values.to}`}
							className={classes.sDownloadLink}>
							<Stack spacing={0.5} direction="row" alignItems="center">
								<CloudDownload className={classes.sDownloadIcon} />
								<Typography>{t('FORM.BUTTONS.DOWNLOAD')}</Typography>
							</Stack>
						</CSVLink>
					)}
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" onClick={() => setOpen(false)}>
						{t('DIALOG:BUTTONS.CANCEL')}
					</Button>
					<Button
						variant="outlined"
						type="submit"
						disabled={state.loading || (!!errors && !validateEmptyObj(errors))}
						endIcon={state.loading && <CircularProgress size={20} />}>
						{t('DIALOG:BUTTONS.GENERATE')}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};
export default Report;
