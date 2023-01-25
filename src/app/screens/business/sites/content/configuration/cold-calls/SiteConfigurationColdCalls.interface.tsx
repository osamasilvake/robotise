import { ChangeEvent, FocusEvent } from 'react';

import { TargetInterface } from '../../../../../../utilities/hooks/form/UseForm.interface';

export interface SiteConfigurationColdCallsFormInterface {
	enabled: boolean;
	startTimeLocal: string;
	endTimeLocal: string;
	days: string[];
}

export interface SiteConfigurationColdCallsAutocompleteInterface {
	locations: string[];
	handleChangeInputs: (id: string, values: string[]) => void;
	handleBlur: (event: FocusEvent<HTMLInputElement>) => void;
	errors: string[];
}

export interface SiteConfigurationColdCallsCheckboxInterface {
	weekdays: string[];
	handleChangeInputs: (id: string, values: string[]) => void;
}

export interface SiteConfigurationColdCallsTimesInterface {
	startTimeLocal: string;
	endTimeLocal: string;
	handleChangeInput: (event: ChangeEvent<HTMLInputElement> | TargetInterface) => void;
	errors?: SiteConfigurationColdCallsFormInterface;
}
