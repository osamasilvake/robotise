import { Autocomplete, TextField } from '@mui/material';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../../../../../slices';
import {
	emailsSelector,
	EmailsUpdateState
} from '../../../../../../slices/business/general/emails/Emails.slice';
import { SECStateInterface } from '../../../../../../slices/business/general/emails/Emails.slice.interface';
import { sitesSelector } from '../../../../../../slices/business/sites/Sites.slice';
import {
	GeneralEmailsSiteComboBoxInterface,
	GeneralEmailsSiteInterface
} from './GeneralEmailsActions.interface';

const GeneralEmailsSite: FC<GeneralEmailsSiteInterface> = (props) => {
	const { siteId } = props;
	const { t } = useTranslation('GENERAL');

	const dispatch = useDispatch<AppDispatch>();
	const sites = useSelector(sitesSelector);
	const emails = useSelector(emailsSelector);

	const [sitesList, setSitesList] = useState<GeneralEmailsSiteComboBoxInterface[]>([]);

	const translation = 'CONTENT.EMAILS.LIST.ACTIONS.FILTERS';
	const showHidden = !!sites.content?.state?.showHidden;

	useEffect(() => {
		sites.content &&
			setSitesList([
				{ id: '', label: t(`${translation}.SITE.ALL_SITES`) },
				...sites.content.data
					.filter((r) => !showHidden || (showHidden && !r.configs.isHidden))
					.map((site) => ({
						id: site.id,
						label: site.title
					}))
			]);
	}, [sites.content, t, showHidden]);

	/**
	 * handle site
	 * @param _event
	 * @param option
	 */
	const handleSite = (
		_event: SyntheticEvent,
		option: GeneralEmailsSiteComboBoxInterface | null
	) => {
		// dispatch: update state
		const state: SECStateInterface = {
			...emails.content?.state,
			page: 0,
			siteId: option?.id
		};
		dispatch(EmailsUpdateState(state));
	};

	return sitesList.length ? (
		<Autocomplete
			disablePortal
			size="small"
			id="sites"
			options={sitesList}
			value={sitesList.find((site) => site.id === siteId) || sitesList[0]}
			onChange={handleSite}
			renderInput={(params) => (
				<TextField {...params} label={t(`${translation}.SITE.LABEL`)} />
			)}
			sx={{ minWidth: 180 }}
		/>
	) : null;
};
export default GeneralEmailsSite;
