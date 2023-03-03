import { ChangeEvent, Dispatch, FocusEvent, SetStateAction } from 'react';

import { TargetInterface } from '../../../../../../utilities/hooks/form/UseForm.interface';

export interface SiteConfigurationMarketingRidesInterface {
	setFormDirty: Dispatch<SetStateAction<boolean>>;
}

export interface SiteConfigurationMarketingRidesContentInterface {
	setFormDirty: Dispatch<SetStateAction<boolean>>;
}

export interface SiteConfigurationMarketingRidesFormInterface {
	active: boolean;
	locations: string[];
	weekdays: string[];
	times: SiteConfigurationMarketingRidesTimesInterface[];
}

export interface SiteConfigurationMarketingRidesTimesInterface {
	hour: number;
	minutes: string;
}

export interface SiteConfigurationMarketingRidesTimesByIdInterface {
	[key: string]: SiteConfigurationMarketingRidesTimesInterface;
}

export interface SiteConfigurationMarketingRidesAutocompleteInterface {
	locations: string[];
	handleChangeInputs: (id: string, values: string[]) => void;
	handleBlur: (event: FocusEvent<HTMLInputElement>) => void;
}

export interface SiteConfigurationMarketingRidesCheckboxInterface {
	weekdays: string[];
	handleChangeInputs: (id: string, values: string[]) => void;
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
