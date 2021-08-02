import {
	Box,
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
} from '@material-ui/core';
import { FC, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import {
	SiteGenerateReports,
	siteSelector
} from '../../../../../../../slices/business/sites/Site.slice';
import { useForm } from '../../../../../../../utilities/hooks/form/UseForm';
import { moment30DaysFromToday, momentToday } from '../../../../../../../utilities/methods/Moment';
import { validateEmptyObj } from '../../../../../../../utilities/methods/ObjectUtilities';
import { ProductsReportValidation } from './DialogProductsReport.validation';
import {
	DialogProductsReportInterface,
	DialogProductsReportPayloadInterface
} from './SiteProductsActions.interface';

const DialogProductsReport: FC<DialogProductsReportInterface> = (props) => {
	const { open, setOpen } = props;
	const { t } = useTranslation(['DIALOG', 'SITES']);

	const dispatch = useDispatch();
	const site = useSelector(siteSelector);

	const [report, setReport] = useState('');
	const { handleChangeInput, handleBlur, handleSubmit, values, errors } =
		useForm<DialogProductsReportPayloadInterface>(
			{
				from: moment30DaysFromToday(),
				to: momentToday()
			},
			ProductsReportValidation,
			async () => {
				// dispatch: generate reports
				dispatch(SiteGenerateReports(values, (report) => setReport(report)));
			}
		);

	const common = 'SITES:CONTENT.PRODUCTS.LIST.ACTIONS.PRODUCTS_REPORT';

	return (
		<Dialog open={open} onClose={() => setOpen(false)}>
			<form onSubmit={handleSubmit}>
				<DialogTitle>{t(`${common}.REPORT.TITLE`)}</DialogTitle>
				<DialogContent>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6} md={6}>
							<FormControl error fullWidth margin="normal">
								<TextField
									variant="outlined"
									id="from"
									name="from"
									label={t(`${common}.FIELDS.FROM.LABEL`)}
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
									variant="outlined"
									id="to"
									name="to"
									label={t(`${common}.FIELDS.TO.LABEL`)}
									type="date"
									value={values.to}
									onChange={handleChangeInput}
									onBlur={handleBlur}
									InputLabelProps={{ shrink: true }}
								/>
							</FormControl>
						</Grid>
					</Grid>

					<Box>
						{report && !site.reports.loading && (
							<CSVLink
								data={report}
								separator={';'}
								filename={t(`${common}.REPORT.TITLE`)}>
								{t(`${common}.REPORT.DOWNLOAD`)}
							</CSVLink>
						)}
					</Box>
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" onClick={() => setOpen(false)}>
						{t('BUTTONS.CANCEL')}
					</Button>
					<Button
						variant="outlined"
						type="submit"
						disabled={(!!errors && !validateEmptyObj(errors)) || site.reports.loading}
						endIcon={site.reports.loading && <CircularProgress size={20} />}>
						{t('BUTTONS.GENERATE')}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};
export default DialogProductsReport;
