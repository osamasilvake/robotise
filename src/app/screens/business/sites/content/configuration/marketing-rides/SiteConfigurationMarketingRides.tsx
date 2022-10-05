import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { FC } from 'react';

import { useForm } from '../../../../../../utilities/hooks/form/UseForm';
import { SiteConfigurationMarketingRidesFormInterface } from './SiteConfigurationMarketingRides.interface';
import { SiteConfigurationMarketingRidesStyle } from './SiteConfigurationMarketingRides.style';
import { SiteConfigurationMarketingRidesValidation } from './SiteConfigurationMarketingRides.validation';
import SiteConfigurationMarketingRidesInput from './SiteConfigurationMarketingRidesInput';

const SiteConfigurationMarketingRides: FC = () => {
	const classes = SiteConfigurationMarketingRidesStyle();

	const { handleChangeInputsMultiple, handleBlur, values, errors } =
		useForm<SiteConfigurationMarketingRidesFormInterface>(
			{
				times: []
			},
			SiteConfigurationMarketingRidesValidation,
			async () => {
				console.log('cool');
			}
		);

	return (
		<Box className={classes.sBox}>
			<Grid container spacing={0}>
				<Grid item sm={12} md={8} lg={7}>
					<Card square elevation={1}>
						<CardContent>
							<Box>
								<Typography variant="h6">Select Room/Location</Typography>
								autocomplete
							</Box>

							<Box className={classes.sTimes}>
								<Typography variant="h6">Times</Typography>
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
