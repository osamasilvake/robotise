import {
	Box,
	Button,
	Card,
	CardContent,
	Checkbox,
	FormControlLabel,
	Grid,
	Stack,
	Typography
} from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useForm } from '../../../../../../utilities/hooks/form/UseForm';
import {
	SiteConfigurationMarketingRidesFormInterface,
	SiteConfigurationMarketingRidesInterface
} from './SiteConfigurationMarketingRides.interface';
import { SiteConfigurationMarketingRidesStyle } from './SiteConfigurationMarketingRides.style';
import { SiteConfigurationMarketingRidesValidation } from './SiteConfigurationMarketingRides.validation';
import SiteConfigurationMarketingRidesAutocomplete from './SiteConfigurationMarketingRidesAutocomplete';
import SiteConfigurationMarketingRidesInput from './SiteConfigurationMarketingRidesInput';

const SiteConfigurationMarketingRides: FC<SiteConfigurationMarketingRidesInterface> = (props) => {
	const { setFormDirty } = props;
	const { t } = useTranslation('SITES');
	const classes = SiteConfigurationMarketingRidesStyle();

	const translation = 'CONTENT.CONFIGURATION.MARKETING_RIDES';
	const initial = {
		activate: false,
		locations: [],
		times: []
	};

	const {
		handleChangeInputs,
		handleChangeInputsMultiple,
		handleChangeCheckbox,
		handleBlur,
		handleSubmit,
		values,
		errors
	} = useForm<SiteConfigurationMarketingRidesFormInterface>(
		initial,
		SiteConfigurationMarketingRidesValidation,
		async () => {
			const result = {
				...values,
				times: values?.times
					?.filter((v) => v)
					?.map((v) => ({
						...v,
						value: v.value?.split(',')?.sort()?.join(',')
					}))
			};
		},
		(state) => {
			const updated = { ...state, times: values.times?.filter((v) => v && v.value) };
			const a = JSON.stringify(initial);
			const b = JSON.stringify(updated);
			const result = a.localeCompare(b);
			setFormDirty(result !== 0);
		}
	);

	return (
		<Box className={classes.sBox}>
			<Card square elevation={1}>
				<CardContent>
					<form onSubmit={handleSubmit}>
						{/* Activate */}
						<Box className={classes.sActivate}>
							<FormControlLabel
								control={
									<Checkbox
										color="primary"
										name="activate"
										onChange={handleChangeCheckbox}
									/>
								}
								label={t<string>(`${translation}.FORM.FIELDS.ACTIVATE.LABEL`)}
								labelPlacement="start"
							/>
						</Box>

						{/* Locations */}
						<Typography variant="h6">{t(`${translation}.LOCATIONS`)}</Typography>
						<Box className={classes.sLocations}>
							<SiteConfigurationMarketingRidesAutocomplete
								locations={values.locations}
								handleChangeInputs={handleChangeInputs}
								handleBlur={handleBlur}
								errors={errors?.locations || []}
							/>
						</Box>

						{/* Times */}
						<Box className={classes.sTimes}>
							<Typography variant="h6">{t(`${translation}.TIMES`)}</Typography>
							<Box className={classes.sTimesList}>
								{[...Array(24)].map((_, i) => (
									<Box key={i} className={classes.sTimesListItem}>
										<Stack spacing={0} direction="row" alignItems="center">
											<Typography className={classes.sTimeLabel}>
												{i < 10 ? `0${i}` : i}:00
											</Typography>

											{/* Marketing Rides */}
											<SiteConfigurationMarketingRidesInput
												index={i}
												id={`minute-${i}`}
												times={values.times}
												error={
													errors && errors?.times
														? errors.times[i]?.value
														: null
												}
												handleBlur={handleBlur}
												handleChangeInputsMultiple={
													handleChangeInputsMultiple
												}
											/>
										</Stack>
									</Box>
								))}
							</Box>
							<Box>
								<Grid item sm={12} textAlign="right">
									<Button
										variant="outlined"
										type="submit"
										disabled={
											(values?.locations?.length || 0) === 0 ||
											!!(
												errors &&
												errors?.times?.filter((e) => e.value).length
											)
										}>
										{t(`${translation}.FORM.BUTTONS.UPDATE`)}
									</Button>
								</Grid>
							</Box>
						</Box>
					</form>
				</CardContent>
			</Card>
		</Box>
	);
};
export default SiteConfigurationMarketingRides;
