import { CloudDownload } from '@mui/icons-material';
import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	Grid,
	Stack,
	TextField,
	Typography
} from '@mui/material';
import { FC, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { useForm } from '../../../utilities/hooks/form/UseForm';
import { momentDaysPriorToToday, momentToday } from '../../../utilities/methods/Moment';
import { validateEmptyObj } from '../../../utilities/methods/Object';
import { ReportFormInterface, ReportInterface } from './Report.interface';
import { ReportStyle } from './Report.style';
import { ReportValidation } from './Report.validation';

const Report: FC<ReportInterface> = (props) => {
	const { id, open, setOpen, filterId, state, GenerateReports } = props;
	const { t } = useTranslation(['DIALOG', 'REPORT']);
	const classes = ReportStyle();

	const dispatch = useDispatch();

	const [report, setReport] = useState('');
	const { handleChangeInput, handleBlur, handleSubmit, values, errors } =
		useForm<ReportFormInterface>(
			{
				from: momentDaysPriorToToday(30),
				to: momentToday()
			},
			ReportValidation,
			async () => {
				// dispatch: generate reports
				dispatch(GenerateReports(filterId, values, (report) => setReport(report)));
			}
		);

	return (
		<Dialog open={open} onClose={() => setOpen(false)}>
			<form onSubmit={handleSubmit}>
				<DialogTitle>{t('REPORT:TITLE')}</DialogTitle>
				<DialogContent>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6} md={6}>
							<FormControl fullWidth margin="normal">
								<TextField
									type="date"
									id="from"
									name="from"
									label={t('REPORT:FIELDS.FROM.LABEL')}
									value={values.from}
									onChange={handleChangeInput}
									onBlur={handleBlur}
									error={!!errors?.from}
									helperText={errors?.from && t(`REPORT:FIELDS.${errors.from}`)}
									InputLabelProps={{ shrink: true }}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={6} md={6}>
							<FormControl fullWidth margin="normal">
								<TextField
									type="date"
									id="to"
									name="to"
									label={t('REPORT:FIELDS.TO.LABEL')}
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
								<Typography>{t('REPORT:DOWNLOAD')}</Typography>
							</Stack>
						</CSVLink>
					)}
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" onClick={() => setOpen(false)}>
						{t('BUTTONS.CANCEL')}
					</Button>
					<Button
						variant="outlined"
						type="submit"
						disabled={(!!errors && !validateEmptyObj(errors)) || state.loading}
						endIcon={state.loading && <CircularProgress size={20} />}>
						{t('BUTTONS.GENERATE')}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};
export default Report;
