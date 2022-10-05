import { Autocomplete, FormControl, TextField } from '@mui/material';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppDispatch } from '../../../../../../slices';
import {
	ServicePositionsFetchList,
	servicePositionsSelector
} from '../../../../../../slices/business/sites/configuration/ServicePositions.slice';
import { sitesSelector } from '../../../../../../slices/business/sites/Sites.slice';
import { SiteParamsInterface } from '../../../Site.interface';
import { SiteConfigurationMarketingRidesAutocompleteInterface } from './SiteConfigurationMarketingRides.interface';

const SiteConfigurationMarketingRidesAutocomplete: FC<
	SiteConfigurationMarketingRidesAutocompleteInterface
> = (props) => {
	const { locations, handleChangeInputs, handleBlur, errors } = props;
	const { t } = useTranslation('SITES');

	const dispatch = useDispatch<AppDispatch>();
	const sites = useSelector(sitesSelector);
	const servicePositions = useSelector(servicePositionsSelector);

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;

	const cSiteId = params.siteId;
	const siteSingle = sites.content?.dataById[cSiteId];

	const whitelist = siteSingle?.rooms?.whitelist || [];
	const pServicePositionSiteId = servicePositions.content?.state?.pSiteId;

	const translation = 'CONTENT.CONFIGURATION.MARKETING_RIDES';
	const label = t(`${translation}.FORM.FIELDS.LOCATIONS.LABEL`);
	const placeholder = t(`${translation}.FORM.FIELDS.LOCATIONS.PLACEHOLDER`);

	const serviceLocations = servicePositions?.content?.data?.map((s) => s.location) || [];
	const options = whitelist.concat(serviceLocations);

	useEffect(() => {
		if (pServicePositionSiteId === cSiteId) return;

		// dispatch: fetch service positions
		dispatch(ServicePositionsFetchList(cSiteId));
	}, [dispatch, pServicePositionSiteId, cSiteId]);

	return (
		<FormControl fullWidth margin="normal">
			<Autocomplete
				disablePortal
				multiple
				id="locations"
				options={options}
				value={locations || []}
				isOptionEqualToValue={(option, value) => option === value}
				onChange={(_, values) => handleChangeInputs('locations', values)}
				onBlur={handleBlur}
				renderInput={(params) => (
					<TextField
						{...params}
						label={label}
						placeholder={placeholder}
						error={!!errors[0]}
						helperText={errors[0] && t(errors[0])}
					/>
				)}
			/>
		</FormControl>
	);
};
export default SiteConfigurationMarketingRidesAutocomplete;
