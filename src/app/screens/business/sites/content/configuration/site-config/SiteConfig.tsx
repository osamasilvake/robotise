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
	TextField,
	Typography
} from '@mui/material';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { GeneralFetchOrderModes } from '../../../../../../slices/business/general/GeneralOperations.slice';
import { SiteConfigUpdate } from '../../../../../../slices/business/sites/SiteOperations.slice';
import { SitesFetchList } from '../../../../../../slices/business/sites/Sites.slice';
import { useForm } from '../../../../../../utilities/hooks/form/UseForm';
import { SiteParamsInterface } from '../../../Site.interface';
import { SiteConfigFormInterface, SiteConfigInterface } from './SiteConfig.interface';
import { SiteConfigStyle } from './SiteConfig.style';
import { SiteConfigValidation } from './SiteConfig.validation';

const SiteConfig: FC<SiteConfigInterface> = (props) => {
	const { sites, siteOperations } = props;
	const { t } = useTranslation('SITES');
	const classes = SiteConfigStyle();

	const dispatch = useDispatch();

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;

	const cSiteId = params.siteId;
	const siteSingle = sites.content?.dataById[cSiteId];
	const translation = 'CONTENT.CONFIGURATION.SITE_CONFIG';

	const { handleChangeInput, handleBlur, handleChangeCheckbox, handleSubmit, values, errors } =
		useForm<SiteConfigFormInterface>(
			{
				helpPage: siteSingle?.configs.helpPage || '',
				isHidden: !!siteSingle?.configs.isHidden
			},
			SiteConfigValidation,
			async () => {
				if (siteSingle) {
					// dispatch: update site config
					dispatch(
						SiteConfigUpdate(cSiteId, values, () => {
							// dispatch: fetch sites
							dispatch(SitesFetchList(true));
						})
					);
				}
			}
		);

	useEffect(() => {
		// dispatch: fetch order modes
		dispatch(GeneralFetchOrderModes());
	}, [dispatch]);

	return (
		<Card square elevation={1}>
			<CardContent>
				<Typography variant="h6">{t(`${translation}.TITLE`)}</Typography>
				<Typography variant="body2" color="textSecondary" className={classes.sExcerpt}>
					{t(`${translation}.EXCERPT`)}
				</Typography>

				<form onSubmit={handleSubmit}>
					<Grid container spacing={1}>
						<Grid item xs={12}>
							<FormControl fullWidth margin="normal">
								<TextField
									required
									type="text"
									id="helpPage"
									name="helpPage"
									label={t(`${translation}.FORM.FIELDS.HELP_PAGE.LABEL`)}
									placeholder={t(
										`${translation}.FORM.FIELDS.HELP_PAGE.PLACEHOLDER`
									)}
									value={values?.helpPage}
									onChange={handleChangeInput}
									onBlur={handleBlur}
									error={!!errors?.helpPage}
									helperText={errors?.helpPage && t(errors.helpPage)}
								/>
							</FormControl>
						</Grid>
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
						<Grid item xs={12} className={classes.sSubmit}>
							<Button
								variant="outlined"
								type="submit"
								disabled={siteOperations.siteConfig.loading}
								endIcon={
									siteOperations.siteConfig.loading && (
										<CircularProgress size={20} />
									)
								}>
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
