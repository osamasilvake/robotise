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
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppDispatch } from '../../../../../../slices';
import {
	coldCallsSelector,
	SiteColdCallsFetchList,
	SiteColdCallsUpdate
} from '../../../../../../slices/business/sites/configuration/cold-calls/ColdCalls.slice';
import { SitesFetchList } from '../../../../../../slices/business/sites/Sites.slice';
import { useForm } from '../../../../../../utilities/hooks/form/UseForm';
import { validateEmptyObj } from '../../../../../../utilities/methods/Object';
import { timeout } from '../../../../../../utilities/methods/Timeout';
import { SiteParamsInterface } from '../../../Site.interface';
import { SiteConfigurationColdCallsFormInterface } from './SiteConfigurationColdCalls.interface';
import { SiteConfigurationColdCallsStyle } from './SiteConfigurationColdCalls.style';
import { SiteConfigurationColdCallsValidation } from './SiteConfigurationColdCalls.validation';
import SiteConfigurationColdCallsCheckbox from './SiteConfigurationColdCallsCheckbox';
import SiteConfigurationColdCallsTimes from './SiteConfigurationColdCallsTimes';

const SiteConfigurationColdCallsContent: FC = () => {
	const { t } = useTranslation('SITES');
	const classes = SiteConfigurationColdCallsStyle();

	const dispatch = useDispatch<AppDispatch>();
	const coldCalls = useSelector(coldCallsSelector);

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;

	const coldCall = coldCalls.content?.data;

	const initial = {
		enabled: !!coldCall?.enabled,
		startTimeLocal: coldCall?.schedule?.startTimeLocal || '',
		endTimeLocal: coldCall?.schedule?.endTimeLocal || '',
		days: coldCall?.schedule?.days || []
	};
	const cSiteId = params.siteId;
	const translation = 'CONTENT.CONFIGURATION.COLD_CALLS';

	const {
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
			console.log(values);
			// dispatch: update cold calls
			cSiteId &&
				dispatch(
					SiteColdCallsUpdate(cSiteId, values, async () => {
						// dispatch: fetch sites
						dispatch(SitesFetchList(true));

						// wait
						await timeout(500);

						// dispatch: fetch cold calls
						dispatch(SiteColdCallsFetchList(cSiteId));
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
						<Box className={classes.sLocations}>---</Box>

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
