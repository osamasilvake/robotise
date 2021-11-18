import { Checkbox, FormControlLabel } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import {
	emailsSelector,
	EmailsUpdateState
} from '../../../../../../slices/business/general/emails/Emails.slice';
import { SECStateInterface } from '../../../../../../slices/business/general/emails/Emails.slice.interface';
import { GeneralEmailsDeliveredInterface } from './GeneralEmailsActions.interface';

const GeneralEmailDelivered: FC<GeneralEmailsDeliveredInterface> = (props) => {
	const { delivered } = props;
	const { t } = useTranslation('GENERAL');

	const dispatch = useDispatch();
	const emails = useSelector(emailsSelector);

	/**
	 * toggle delivered
	 */
	const toggleDelivered = () => {
		// dispatch: update state
		const state: SECStateInterface = {
			...emails.content?.state,
			page: 0,
			delivered: !delivered
		};
		dispatch(EmailsUpdateState(state));
	};

	return (
		<FormControlLabel
			control={
				<Checkbox
					color="primary"
					name="delivered"
					checked={delivered}
					onChange={toggleDelivered}
				/>
			}
			label={t<string>('CONTENT.EMAILS.LIST.ACTIONS.FILTERS.DELIVERED')}
		/>
	);
};
export default GeneralEmailDelivered;
