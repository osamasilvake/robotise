import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
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

	const { handleChangeInputs, handleChangeInputsMultiple, handleBlur, values, errors } =
		useForm<SiteConfigurationMarketingRidesFormInterface>(
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
			<Grid container spacing={0}>
				<Grid item sm={12} md={8} lg={6}>
					<Card square elevation={1}>
						<CardContent>
							{/* Locations */}
							<Box>
								<Typography variant="h6">
									{t(`${translation}.LOCATIONS`)}
								</Typography>
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
								{[...Array(24)].map((h, i) => (
									<Stack key={i} spacing={0} direction="row" alignItems="center">
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
											handleChangeInputsMultiple={handleChangeInputsMultiple}
										/>
									</Stack>
								))}
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Box>
	);
};
export default SiteConfigurationMarketingRides;
