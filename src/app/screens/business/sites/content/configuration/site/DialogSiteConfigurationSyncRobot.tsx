import {
	Autocomplete,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	ListItem,
	TextField
} from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../../../../../slices';
import {
	SiteConfigurationFetch,
	siteConfigurationSelector,
	SiteConfigurationUpdate
} from '../../../../../../slices/business/sites/configuration/site/SiteConfiguration.slice';
import { DialogSiteConfigurationSyncRobotInterface } from './SiteConfigurationSite.interface';
import { SiteConfigurationSiteStyle } from './SiteConfigurationSite.style';

const DialogSiteConfigurationSyncRobot: FC<DialogSiteConfigurationSyncRobotInterface> = (props) => {
	const { open, setOpen, section, robotsList, cSiteId } = props;
	const { t } = useTranslation(['SITES', 'DIALOG']);
	const classes = SiteConfigurationSiteStyle();

	const dispatch = useDispatch<AppDispatch>();
	const siteConfiguration = useSelector(siteConfigurationSelector);

	const [selectedRobots, setSelectedRobots] = useState<{ id: string; label: string }[]>([]);

	const translation = 'CONTENT.CONFIGURATION.SITE_CONFIGURATION.SYNC_ROBOT';
	const label = t(`${translation}.ROBOTS.LABEL`);
	const placeholder = t(`${translation}.ROBOTS.PLACEHOLDER`);

	/**
	 * sync configuration
	 * @returns
	 */
	const syncConfiguration = () => {
		// return
		if (!open) return;

		// dispatch: update site configuration
		dispatch(
			SiteConfigurationUpdate(
				cSiteId,
				section?.id,
				{
					request: {
						name: section.name,
						configType: section.configType,
						sectionName: section.sectionName,
						preset: section.preset,
						elements: { ...section?.elements, value: open },
						siteRobotsToSync: selectedRobots?.map((r) => r.id) || []
					}
				},
				() => {
					// close dialog
					setOpen(null);

					// dispatch: fetch site configuration
					dispatch(SiteConfigurationFetch(cSiteId, true));
				}
			)
		);
	};

	return (
		<Dialog
			open={!!open}
			onClose={() => setOpen(null)}
			classes={{ paper: classes.sDialogContent }}>
			<DialogTitle>{t(`${translation}.TITLE`)}</DialogTitle>
			<DialogContent className={classes.sDialogContent}>
				<DialogContentText>{t(`${translation}.TEXT`)}</DialogContentText>
				<FormControl fullWidth margin="normal">
					<Autocomplete
						disablePortal
						multiple
						size="small"
						id="locations"
						options={robotsList?.map((r) => ({ id: r?.robotId, label: r?.robotTitle }))}
						isOptionEqualToValue={(option, value) => option.id === value.id}
						onChange={(_, values) => setSelectedRobots(values)}
						renderOption={(props, option) => (
							<ListItem {...props} key={option.id}>
								{option.label}
							</ListItem>
						)}
						renderInput={(params) => (
							<TextField {...params} label={label} placeholder={placeholder} />
						)}
					/>
				</FormControl>
			</DialogContent>
			<DialogActions>
				<Button variant="outlined" onClick={() => setOpen(null)}>
					{t('DIALOG:BUTTONS.CANCEL')}
				</Button>
				<Button
					variant="outlined"
					onClick={() => syncConfiguration()}
					disabled={siteConfiguration.updating}
					endIcon={siteConfiguration.updating && <CircularProgress size={20} />}>
					{t('DIALOG:BUTTONS.SYNC')}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
export default DialogSiteConfigurationSyncRobot;
