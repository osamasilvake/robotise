import {
	Button,
	Card,
	CardContent,
	CircularProgress,
	FormControl,
	FormControlLabel,
	FormHelperText,
	Grid,
	Switch,
	Typography
} from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { AppConfigService } from '../../../../../../services';
import { SiteConfigUpdate } from '../../../../../../slices/business/sites/Site.slice';
import { SitesFetchList } from '../../../../../../slices/business/sites/Sites.slice';
import { useForm } from '../../../../../../utilities/hooks/form/UseForm';
import {
	validateEmptyObj,
	validateEmptyObjProperty
} from '../../../../../../utilities/methods/Object';
import { SiteParamsInterface } from '../../../Site.interface';
import { SiteConfigFormInterface, SiteConfigInterface } from './SiteConfig.interface';
import { SiteConfigStyle } from './SiteConfig.style';

const SiteConfig: FC<SiteConfigInterface> = (props) => {
	const { sites, site } = props;
	const { t } = useTranslation('SITES');
	const classes = SiteConfigStyle();

	const dispatch = useDispatch();

	const params = useParams() as SiteParamsInterface;
	const navigate = useNavigate();

	const cSiteId = params.siteId;
	const siteSingle = sites.content?.dataById[cSiteId];
	const translation = 'CONTENT.CONFIGURATION.SITE_CONFIG';

	const { handleChangeCheckbox, handleSubmit, values, errors } = useForm<SiteConfigFormInterface>(
		{
			isHidden: !!siteSingle?.configs.isHidden
		},
		() => ({}),
		async () => {
			if (siteSingle) {
				// dispatch: update site config
				dispatch(
					SiteConfigUpdate(cSiteId, values, () => {
						if (!sites.content?.state?.hidden && values.isHidden) {
							// prepare link
							const link = AppConfigService.AppRoutes.SCREENS.BUSINESS.SITES.MAIN;

							// navigate
							navigate(link);
						} else {
							// dispatch: fetch sites
							dispatch(SitesFetchList(true));
						}
					})
				);
			}
		}
	);

	return (
		<Card square elevation={1}>
			<CardContent>
				<Typography variant="h6">{t(`${translation}.TITLE`)}</Typography>
				<Typography variant="body2" color="textSecondary" className={classes.sExcerpt}>
					{t(`${translation}.EXCERPT`)}
				</Typography>

				<form onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<FormControl>
								<FormControlLabel
									control={
										<Switch
											name="isHidden"
											checked={values.isHidden}
											onChange={handleChangeCheckbox}
										/>
									}
									label={t<string>(
										`${translation}.FORM.FIELDS.CHECKBOXES.HIDDEN.LABEL`
									)}
								/>
								<FormHelperText className={classes.sFormHelperText}>
									{t(`${translation}.FORM.FIELDS.CHECKBOXES.HIDDEN.NOTE`)}
								</FormHelperText>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<Button
								variant="outlined"
								type="submit"
								disabled={
									site.siteConfig.loading ||
									(!!errors && !validateEmptyObj(errors)) ||
									validateEmptyObjProperty(values)
								}
								endIcon={site.siteConfig.loading && <CircularProgress size={20} />}>
								{t(`${translation}.FORM.BUTTONS.UPDATE`)}
							</Button>
						</Grid>
					</Grid>
				</form>
			</CardContent>
		</Card>
	);
};
export default SiteConfig;
