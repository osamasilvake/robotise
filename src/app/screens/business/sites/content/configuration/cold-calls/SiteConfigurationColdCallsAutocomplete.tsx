import { Autocomplete, FormControl, TextField } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { sitesSelector } from '../../../../../../slices/business/sites/Sites.slice';
import { SiteParamsInterface } from '../../../Site.interface';
import { SiteConfigurationColdCallsAutocompleteInterface } from './SiteConfigurationColdCalls.interface';
import { SiteConfigurationColdCallsStyle } from './SiteConfigurationColdCalls.style';

const SiteConfigurationColdCallsAutocomplete: FC<
	SiteConfigurationColdCallsAutocompleteInterface
> = (props) => {
	const { updateLocations, setUpdateLocations, handleBlur } = props;
	const { t } = useTranslation('SITES');
	const classes = SiteConfigurationColdCallsStyle();

	const sites = useSelector(sitesSelector);
	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;

	const cSiteId = params.siteId;
	const siteSingle = sites.content?.dataById[cSiteId];
	const whitelist = siteSingle?.rooms?.whitelist || [];

	const translation = 'CONTENT.CONFIGURATION.COLD_CALLS';
	const label = t(`${translation}.FORM.FIELDS.LOCATIONS.LABEL`);
	const placeholder = t(`${translation}.FORM.FIELDS.LOCATIONS.PLACEHOLDER`);

	return (
		<FormControl fullWidth className={classes.sFormControl}>
			<Autocomplete
				disablePortal
				multiple
				size="small"
				id="locations"
				value={updateLocations}
				options={whitelist}
				getOptionLabel={(option) => option}
				isOptionEqualToValue={(option, value) => option === value}
				onChange={(_, values) => setUpdateLocations(values)}
				onBlur={handleBlur}
				renderInput={(params) => (
					<TextField {...params} label={label} placeholder={placeholder} />
				)}
			/>
		</FormControl>
	);
};
export default SiteConfigurationColdCallsAutocomplete;
