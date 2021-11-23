import { Autocomplete, TextField } from '@mui/material';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

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
import { GeneralEmailsActionsStyle } from './GeneralEmailsActions.style';

const GeneralEmailsSite: FC<GeneralEmailsSiteInterface> = (props) => {
	const { siteId } = props;
	const { t } = useTranslation('GENERAL');
	const classes = GeneralEmailsActionsStyle();

	const dispatch = useDispatch();
	const sites = useSelector(sitesSelector);
	const emails = useSelector(emailsSelector);

	const [sitesList, setSitesList] = useState<GeneralEmailsSiteComboBoxInterface[]>([]);

	const translation = 'CONTENT.EMAILS.LIST.ACTIONS.FILTERS';

	useEffect(() => {
		sites.content &&
			setSitesList([
				{ id: '', label: t(`${translation}.SITE.ALL_SITES`) },
				...sites.content?.data
					.filter((s) => !s.configs.isHidden)
					.map((site) => ({
						id: site.id,
						label: site.title
					}))
			]);
	}, [sites.content, sites.content?.data, t]);

	/**
	 * handle site
	 * @param event
	 * @param option
	 */
	const handleSite = (
		_event: SyntheticEvent<Element, Event>,
		option: { id: string; label: string } | null
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
			className={classes.sSite}
		/>
	) : null;
};
export default GeneralEmailsSite;
