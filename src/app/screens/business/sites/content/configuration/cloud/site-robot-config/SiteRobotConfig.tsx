import {
	Autocomplete,
	Button,
	Card,
	CardContent,
	CircularProgress,
	FormControl,
	Grid,
	ListItem,
	TextField,
	Typography
} from '@mui/material';
import { FC, SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppDispatch } from '../../../../../../../slices';
import { SiteRobotConfigUpdate } from '../../../../../../../slices/business/sites/SiteOperations.slice';
import { useForm } from '../../../../../../../utilities/hooks/form/UseForm';
import { SiteParamsInterface } from '../../../../Site.interface';
import {
	SiteRobotConfigFormInterface,
	SiteRobotConfigInterface
} from './SiteRobotConfig.interface';
import { SiteRobotConfigStyle } from './SiteRobotConfig.style';

const SiteRobotConfig: FC<SiteRobotConfigInterface> = (props) => {
	const { sites, siteOperations, robotTwinsSummary } = props;
	const { t } = useTranslation('SITES');
	const classes = SiteRobotConfigStyle();

	const dispatch = useDispatch<AppDispatch>();

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;
	const cSiteId = params.siteId;
	const cSiteRobotId = sites.content?.dataById[cSiteId].robots[0]?.id || '';
	const cRobot = robotTwinsSummary.content?.dataById[cSiteRobotId] || null;
	const noRobot = { siteId: '-', robotId: '-', robotTitle: 'No Robot' };
	const robotList = [noRobot].concat(
		robotTwinsSummary.content?.data.map((r) => ({
			siteId: r.siteId,
			robotId: r.robotId,
			robotTitle: r.robotTitle
		})) || []
	);
	const isRobot = !!robotList?.filter(
		(r) => r.siteId === cSiteId && r.robotId === cRobot?.robotId
	);
	const translation = 'CONTENT.CONFIGURATION.SITE_ROBOT_CONFIG';

	const { handleChangeAutoComplete, handleSubmit, values } =
		useForm<SiteRobotConfigFormInterface>(
			{ robot: isRobot ? cRobot : null },
			() => ({ robot: null }),
			async () => {
				// dispatch: update site robot config
				dispatch(SiteRobotConfigUpdate(cSiteId, values));
			}
		);

	/**
	 * un-assigned robot (autocomplete)
	 */
	const unAssignedRobot = () => {
		const value = { target: { id: `robot-option-${0}`, name: 'robot', value: noRobot } };
		handleChangeAutoComplete(value, noRobot);
	};

	return robotList?.length ? (
		<Card square elevation={1} sx={{ overflow: 'visible' }}>
			<CardContent>
				<Typography variant="h6">{t(`${translation}.TITLE`)}</Typography>
				<Typography variant="body2" color="textSecondary" className={classes.sExcerpt}>
					{t(`${translation}.EXCERPT`)}
				</Typography>

				<form onSubmit={handleSubmit} className={classes.sForm}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<FormControl error fullWidth>
								<Autocomplete
									disablePortal
									id="robot"
									options={robotList}
									getOptionLabel={(option) => option.robotTitle}
									isOptionEqualToValue={(option, value) =>
										option.robotId === value.robotId
									}
									value={values?.robot || robotList[0]}
									onChange={handleChangeAutoComplete}
									renderOption={(props, option) => (
										<ListItem {...props} key={option.robotId}>
											{option.robotTitle}
										</ListItem>
									)}
									renderInput={(params) => (
										<TextField
											{...params}
											label={t(`${translation}.FORM.FIELDS.SITE.LABEL`)}
										/>
									)}
									sx={{ minWidth: 180 }}
								/>
							</FormControl>
						</Grid>

						<Grid item xs={12}>
							<Button
								variant="outlined"
								type="submit"
								disabled={
									siteOperations.siteRobotConfig.loading || !values.robot?.robotId
								}
								endIcon={
									siteOperations.siteRobotConfig.loading && (
										<CircularProgress size={20} />
									)
								}>
								{t(`${translation}.FORM.BUTTONS.UPDATE`)}
							</Button>
							<Button
								variant="outlined"
								type="button"
								disabled={values.robot === null}
								onClick={unAssignedRobot}
								sx={{ marginLeft: 1 }}>
								{t(`${translation}.FORM.BUTTONS.UNASSIGNED`)}
							</Button>
						</Grid>
					</Grid>
				</form>
			</CardContent>
		</Card>
	) : null;
};
export default SiteRobotConfig;
