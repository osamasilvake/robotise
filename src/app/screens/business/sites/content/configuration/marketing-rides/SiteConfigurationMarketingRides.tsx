import { Box, Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useForm } from '../../../../../../utilities/hooks/form/UseForm';
import { SiteConfigurationMarketingRidesFormInterface } from './SiteConfigurationMarketingRides.interface';
import { SiteConfigurationMarketingRidesStyle } from './SiteConfigurationMarketingRides.style';
import { SiteConfigurationMarketingRidesValidation } from './SiteConfigurationMarketingRides.validation';
import SiteConfigurationMarketingRidesAutocomplete from './SiteConfigurationMarketingRidesAutocomplete';
import SiteConfigurationMarketingRidesInput from './SiteConfigurationMarketingRidesInput';

const SiteConfigurationMarketingRides: FC = () => {
	const { t } = useTranslation('SITES');
	const classes = SiteConfigurationMarketingRidesStyle();

	const translation = 'CONTENT.CONFIGURATION.MARKETING_RIDES';

	const {
		handleChangeInputs,
		handleChangeInputsMultiple,
		handleBlur,
		handleSubmit,
		values,
		errors
	} = useForm<SiteConfigurationMarketingRidesFormInterface>(
		{
			locations: [],
			times: []
		},
		SiteConfigurationMarketingRidesValidation,
		async () => {
			console.log(values);
		}
	);

	return (
		<Box className={classes.sBox}>
			<Card square elevation={1}>
				<CardContent>
					<form onSubmit={handleSubmit}>
						{/* Locations */}
						<Grid container spacing={2}>
							<Grid item sm={12} md={6} lg={4}>
								<Typography variant="h6">
									{t(`${translation}.LOCATIONS`)}
								</Typography>
								<SiteConfigurationMarketingRidesAutocomplete
									locations={values.locations}
									handleChangeInputs={handleChangeInputs}
									handleBlur={handleBlur}
									errors={errors?.locations || []}
								/>
							</Grid>
						</Grid>

						{/* Times */}
						<Box className={classes.sTimes}>
							<Typography variant="h6">{t(`${translation}.TIMES`)}</Typography>
							<Grid container spacing={2}>
								{[...Array(24)].map((h, i) => (
									<Grid key={i} item sm={12} md={6} lg={4}>
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
									</Grid>
								))}
								<>
									{JSON.stringify(values?.times)}
									{values?.times?.length}
								</>
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
							</Grid>
						</Box>
					</form>
				</CardContent>
			</Card>
		</Box>
	);
};
export default SiteConfigurationMarketingRides;
