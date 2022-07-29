import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from '@mui/material';
import { FC, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppDispatch } from '../../../../../../slices';
import {
	ServicePositionsFetchList,
	servicePositionsSelector,
	SiteServicePositionDelete
} from '../../../../../../slices/business/sites/configuration/ServicePositions.slice';
import { SiteParamsInterface } from '../../../Site.interface';
import { DialogDeleteServicePositionInterface } from './SiteConfigurationServicePositions.interface';

const DialogDeleteServicePosition: FC<DialogDeleteServicePositionInterface> = (props) => {
	const { servicePosition, open, setOpen } = props;
	const { t } = useTranslation(['SITES', 'DIALOG']);

	const dispatch = useDispatch<AppDispatch>();
	const servicePositions = useSelector(servicePositionsSelector);

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;
	const cSiteId = params.siteId;
	const translation = 'CONTENT.CONFIGURATION.SERVICE_POSITIONS.DELETE';

	/**
	 * delete service position
	 * @param status
	 * @returns
	 */
	const deleteServicePosition = (status: boolean) => (event: MouseEvent<HTMLButtonElement>) => {
		// stop propagation
		event.stopPropagation();

		// close dialog
		!status && setOpen(false);

		// dispatch: delete service position
		status &&
			dispatch(
				SiteServicePositionDelete(servicePosition, () => {
					// dispatch: fetch service positions
					dispatch(ServicePositionsFetchList(cSiteId, true));

					// close dialog
					setOpen(false);
				})
			);
	};

	return (
		<Dialog open={open} onClose={deleteServicePosition(false)}>
			<DialogTitle>{t(`${translation}.TITLE`)}</DialogTitle>
			<DialogContent>
				<DialogContentText>{t(`${translation}.TEXT`)}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button
					variant="outlined"
					onClick={deleteServicePosition(false)}
					disabled={servicePositions.updating}>
					{t('DIALOG:BUTTONS.CANCEL')}
				</Button>
				<Button
					color="error"
					variant="outlined"
					onClick={deleteServicePosition(true)}
					disabled={servicePositions.updating}
					endIcon={servicePositions.updating && <CircularProgress size={20} />}>
					{t('DIALOG:BUTTONS.CONFIRM')}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
export default DialogDeleteServicePosition;
