import {
	Button,
	Card,
	CardContent,
	CircularProgress,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	Typography
} from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { robotTwinsSummarySelector } from '../../../../../../slices/business/robots/RobotTwinsSummary.slice';
import { SiteRobotConfigUpdate } from '../../../../../../slices/business/sites/Site.slice';
import { useForm } from '../../../../../../utilities/hooks/form/UseForm';
import { CardStyle } from '../../../../../../utilities/styles/Card.style';
import { SiteParamsInterface } from '../../../Site.interface';
import {
	SiteRobotConfigInterface,
	SiteRobotConfigPayloadInterface
} from './SiteRobotConfig.interface';
import { SiteRobotConfigStyle } from './SiteRobotConfig.style';

const SiteRobotConfig: FC<SiteRobotConfigInterface> = (props) => {
	const { site } = props;
	const { t } = useTranslation('SITES');
	const classes = SiteRobotConfigStyle();
	const cardClasses = CardStyle();

	const dispatch = useDispatch();
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);

	const params: SiteParamsInterface = useParams();
	const cSiteId = params.siteId;

	const common = 'CONTENT.CONFIGURATION.SITE_ROBOT_CONFIG';

	const { handleChangeSelect, handleSubmit, values } = useForm<SiteRobotConfigPayloadInterface>(
		{
			robotId: ''
		},
		() => ({ robotId: '' }),
		async () => {
			// dispatch: update site robot config
			dispatch(SiteRobotConfigUpdate(cSiteId, values));
		}
	);

	return (
		<Card square elevation={1}>
			<CardContent className={cardClasses.sCardContent1}>
				<Typography variant="h6">{t(`${common}.TITLE`)}</Typography>
				<Typography variant="body2" color="textSecondary" className={classes.sExcerpt}>
					{t(`${common}.EXCERPT`)}
				</Typography>

				<form onSubmit={handleSubmit} className={classes.sForm}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<FormControl variant="outlined" fullWidth>
								<InputLabel id="notification">
									{t(`${common}.FORM.FIELDS.SITE.LABEL`)}
								</InputLabel>
								<Select
									labelId="robotId"
									id="robotId"
									name="robotId"
									label={t(`${common}.FORM.FIELDS.SITE.LABEL`)}
									value={values.robotId}
									onChange={handleChangeSelect}>
									{robotTwinsSummary.content?.data
										.filter((robot) => robot.siteId === cSiteId)
										.map((robot) => (
											<MenuItem key={robot.robotId} value={robot.robotId}>
												{robot.robotTitle}
											</MenuItem>
										))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<Button
								variant="outlined"
								type="submit"
								disabled={!values.robotId}
								endIcon={
									site.siteRobotConfig.loading && <CircularProgress size={20} />
								}>
								{t(`${common}.FORM.BUTTONS.UPDATE`)}
							</Button>
						</Grid>
					</Grid>
				</form>
			</CardContent>
		</Card>
	);
};
export default SiteRobotConfig;
