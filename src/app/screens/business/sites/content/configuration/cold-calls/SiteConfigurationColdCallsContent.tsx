import {
	Box,
	Button,
	Card,
	CardContent,
	CircularProgress,
	FormControl,
	FormControlLabel,
	Switch,
	Typography
} from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppDispatch } from '../../../../../../slices';
import {
	coldCallsSelector,
	SiteColdCallsLocationsFetchList,
	SiteColdCallsLocationsUpdate,
	SiteColdCallsUpdate
} from '../../../../../../slices/business/sites/configuration/cold-calls/ColdCalls.slice';
import { SitesFetchList, sitesSelector } from '../../../../../../slices/business/sites/Sites.slice';
import { useForm } from '../../../../../../utilities/hooks/form/UseForm';
import { validateEmptyObj } from '../../../../../../utilities/methods/Object';
import { timeout } from '../../../../../../utilities/methods/Timeout';
import { SiteParamsInterface } from '../../../Site.interface';
import { SiteConfigurationColdCallsFormInterface } from './SiteConfigurationColdCalls.interface';
import { SiteConfigurationColdCallsStyle } from './SiteConfigurationColdCalls.style';
import { SiteConfigurationColdCallsValidation } from './SiteConfigurationColdCalls.validation';
import SiteConfigurationColdCallsAutocomplete from './SiteConfigurationColdCallsAutocomplete';
import SiteConfigurationColdCallsCheckbox from './SiteConfigurationColdCallsCheckbox';
import SiteConfigurationColdCallsTimes from './SiteConfigurationColdCallsTimes';

const SiteConfigurationColdCallsContent: FC = () => {
	const { t } = useTranslation('SITES');
	const classes = SiteConfigurationColdCallsStyle();

	const dispatch = useDispatch<AppDispatch>();
	const sites = useSelector(sitesSelector);
	const coldCalls = useSelector(coldCallsSelector);

	const locations = coldCalls.content?.data[0]?.locations || [];
	const [updateLocations, setUpdateLocations] = useState(locations?.map((l) => l.location));

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;

	const cSiteId = params.siteId;
	const siteSingle = sites.content?.dataById[cSiteId];
	const coldCall = siteSingle?.coldCallsConfigs;
	const coldCallId = coldCalls.content?.data[0]?.id || '';
	const initial = {
		enabled: !!coldCall?.enabled,
		startTimeLocal: coldCall?.schedule?.startTimeLocal || '',
		endTimeLocal: coldCall?.schedule?.endTimeLocal || '',
		days: coldCall?.schedule?.days || []
	};
	const translation = 'CONTENT.CONFIGURATION.COLD_CALLS';

	const {
		handleBlur,
		handleChangeInput,
		handleChangeInputs,
		handleChangeCheckbox,
		handleSubmit,
		values,
		errors
	} = useForm<SiteConfigurationColdCallsFormInterface>(
		initial,
		SiteConfigurationColdCallsValidation,
		async () => {
			// dispatch: update cold calls locations
			cSiteId && dispatch(SiteColdCallsLocationsUpdate(cSiteId, coldCallId, updateLocations));

			// dispatch: update cold calls
			cSiteId &&
				dispatch(
					SiteColdCallsUpdate(cSiteId, values, async () => {
						// dispatch: fetch sites
						dispatch(SitesFetchList(true));

						// wait
						await timeout(500);

						// dispatch: fetch cold calls locations
						dispatch(SiteColdCallsLocationsFetchList(cSiteId, true));
					})
				);
		}
	);

	return (
		<Box className={classes.sBox}>
			<Card square elevation={1}>
				<CardContent>
					<form onSubmit={handleSubmit}>
						{/* Enabled */}
						<Box className={classes.sEnabled}>
							<FormControl>
								<FormControlLabel
									control={
										<Switch
											name="enabled"
											checked={values.enabled}
											onChange={handleChangeCheckbox}
										/>
									}
									label={t<string>(`${translation}.FORM.FIELDS.ENABLED.LABEL`)}
									labelPlacement="start"
								/>
							</FormControl>
						</Box>

						{/* Locations */}
						<Typography variant="h6">{t(`${translation}.LOCATIONS`)}</Typography>
						<Box className={classes.sLocations}>
							<SiteConfigurationColdCallsAutocomplete
								updateLocations={updateLocations}
								setUpdateLocations={setUpdateLocations}
								handleBlur={handleBlur}
							/>
						</Box>

						{/* Weekdays */}
						<Typography variant="h6">{t(`${translation}.WEEKDAYS`)}</Typography>
						<Box>
							<SiteConfigurationColdCallsCheckbox
								weekdays={values.days}
								handleChangeInputs={handleChangeInputs}
							/>
						</Box>

						{/* Times */}
						<Typography variant="h6" className={classes.sTimes}>
							{t(`${translation}.TIMES`)}
						</Typography>
						<Box>
							<SiteConfigurationColdCallsTimes
								handleChangeInput={handleChangeInput}
								handleBlur={handleBlur}
								startTimeLocal={values.startTimeLocal}
								endTimeLocal={values.endTimeLocal}
								errors={errors}
							/>
						</Box>

						{/* Update */}
						<Box textAlign="right">
							<Button
								variant="outlined"
								type="submit"
								disabled={
									coldCalls.updating ||
									!values.startTimeLocal ||
									!values.endTimeLocal ||
									(errors &&
										!validateEmptyObj({
											startTimeLocal: errors.startTimeLocal,
											endTimeLocal: errors.endTimeLocal
										}))
								}
								endIcon={coldCalls.updating && <CircularProgress size={20} />}>
								{t(`${translation}.FORM.BUTTONS.UPDATE`)}
							</Button>
						</Box>
					</form>
				</CardContent>
			</Card>
		</Box>
	);
};
export default SiteConfigurationColdCallsContent;
