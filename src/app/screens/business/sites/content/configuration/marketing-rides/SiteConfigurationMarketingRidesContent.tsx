import {
	Box,
	Button,
	Card,
	CardContent,
	CircularProgress,
	FormControl,
	FormControlLabel,
	Grid,
	Stack,
	Switch,
	Typography
} from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppDispatch } from '../../../../../../slices';
import {
	marketingRidesSelector,
	SiteMarketingRidesFetchList,
	SiteMarketingRidesUpdate
} from '../../../../../../slices/business/sites/configuration/marketing-rides/MarketingRides.slice';
import { useForm } from '../../../../../../utilities/hooks/form/UseForm';
import { SiteParamsInterface } from '../../../Site.interface';
import {
	SiteConfigurationMarketingRidesContentInterface,
	SiteConfigurationMarketingRidesFormInterface,
	SiteConfigurationMarketingRidesTimesByIdInterface
} from './SiteConfigurationMarketingRides.interface';
import { SiteConfigurationMarketingRidesStyle } from './SiteConfigurationMarketingRides.style';
import { SiteConfigurationMarketingRidesValidation } from './SiteConfigurationMarketingRides.validation';
import SiteConfigurationMarketingRidesAutocomplete from './SiteConfigurationMarketingRidesAutocomplete';
import SiteConfigurationMarketingRidesCheckbox from './SiteConfigurationMarketingRidesCheckbox';
import SiteConfigurationMarketingRidesInput from './SiteConfigurationMarketingRidesInput';

const SiteConfigurationMarketingRidesContent: FC<
	SiteConfigurationMarketingRidesContentInterface
> = (props) => {
	const { setFormDirty } = props;
	const { t } = useTranslation('SITES');
	const classes = SiteConfigurationMarketingRidesStyle();

	const dispatch = useDispatch<AppDispatch>();
	const marketingRides = useSelector(marketingRidesSelector);

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;

	const cSiteId = params.siteId;
	const marketingRide = marketingRides?.content?.data[0];
	const times = marketingRide?.times || [];

	const mapTimes: SiteConfigurationMarketingRidesTimesByIdInterface = times?.reduce(
		(acc, t) =>
			t?.hour === undefined
				? acc
				: { ...acc, [t.hour]: { ...t, minutes: t.minutes?.join(',') } },
		{}
	);
	const initial = {
		active: !!marketingRide?.active,
		locations: marketingRide?.locations || [],
		weekdays: marketingRide?.weekdays || [],
		times:
			[...Array(24)].map((_, m) => ({
				hour: m,
				minutes: mapTimes[m] ? mapTimes[m]?.minutes : ''
			})) || []
	};
	const translation = 'CONTENT.CONFIGURATION.MARKETING_RIDES';

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
			// dispatch: update marketing rides
			marketingRide?.id &&
				dispatch(
					SiteMarketingRidesUpdate(marketingRide?.id, values, () => {
						// set form dirty
						setFormDirty(false);

						// dispatch: fetch marketing rides
						dispatch(SiteMarketingRidesFetchList(cSiteId, true));
					})
				);
		},
		(state) => {
			const updated = { ...state, times: values.times?.filter((v) => v && v.minutes) };
			const a = JSON.stringify(initial);
			const b = JSON.stringify(updated);
			const result = a.localeCompare(b);

			// set form dirty
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
							<FormControl>
								<FormControlLabel
									control={
										<Switch
											name="active"
											checked={values.active}
											onChange={handleChangeCheckbox}
										/>
									}
									label={t<string>(`${translation}.FORM.FIELDS.ACTIVATE.LABEL`)}
									labelPlacement="start"
								/>
							</FormControl>
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

						{/* Weekdays */}
						<Typography variant="h6">{t(`${translation}.WEEKDAYS`)}</Typography>
						<Box>
							<SiteConfigurationMarketingRidesCheckbox
								weekdays={values.weekdays}
								handleChangeInputs={handleChangeInputs}
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
														? errors.times[i]?.minutes
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
							<Box className={classes.sUpdate}>
								<Grid item sm={12} textAlign="right">
									<Button
										variant="outlined"
										type="submit"
										disabled={
											marketingRides.updating ||
											(values?.locations?.length || 0) === 0 ||
											!!(
												errors &&
												errors?.times?.filter((e) => e.minutes).length
											)
										}
										endIcon={
											marketingRides.updating && (
												<CircularProgress size={20} />
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
export default SiteConfigurationMarketingRidesContent;
