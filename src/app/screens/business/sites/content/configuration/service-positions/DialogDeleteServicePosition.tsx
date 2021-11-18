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

import {
	ServicePositionsFetchList,
	servicePositionsSelector,
	SiteServicePositionDelete
} from '../../../../../../slices/business/sites/configuration/ServicePositions.slice';
import { SiteParamsInterface } from '../../../Site.interface';
import { DialogDeleteServicePositionInterface } from './SiteServicePositions.interface';

const DialogDeleteServicePosition: FC<DialogDeleteServicePositionInterface> = (props) => {
	const { servicePosition, open, setOpen } = props;
	const { t } = useTranslation(['DIALOG', 'SITES']);

	const dispatch = useDispatch();
	const servicePositions = useSelector(servicePositionsSelector);

	const params = useParams() as SiteParamsInterface;
	const cSiteId = params.siteId;
	const translation = 'SITES:CONTENT.CONFIGURATION.SERVICE_POSITIONS.DELETE';

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
					// dispatch: fetch site service positions
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
					{t('BUTTONS.CANCEL')}
				</Button>
				<Button
					color="error"
					variant="outlined"
					onClick={deleteServicePosition(true)}
					disabled={servicePositions.updating}
					endIcon={servicePositions.updating && <CircularProgress size={20} />}>
					{t('BUTTONS.CONFIRM')}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
export default DialogDeleteServicePosition;
