import { ChangeEvent, FocusEvent } from 'react';

import { TargetInterface } from '../../../../../../utilities/hooks/form/UseForm.interface';

export interface SiteConfigurationMarketingRidesFormInterface {
	locations: string[];
	times: SiteConfigurationMarketingRidesTimesInterface[];
}

export interface SiteConfigurationMarketingRidesTimesInterface {
	id: number;
	value: string;
}

export interface SiteConfigurationMarketingRidesAutocompleteInterface {
	locations: string[];
	handleChangeInputs: (id: string, values: string[]) => void;
	handleBlur: (event: FocusEvent<HTMLInputElement>) => void;
	errors: string[];
}

export interface SiteConfigurationMarketingRidesInputInterface {
	index: number;
	id: string;
	times: SiteConfigurationMarketingRidesTimesInterface[];
	error: string | null;
	handleBlur: (event: FocusEvent<HTMLInputElement>) => void;
	handleChangeInputsMultiple: (
		index: number,
		event: ChangeEvent<HTMLInputElement> | TargetInterface,
		items: string[] | object[]
	) => void;
}
