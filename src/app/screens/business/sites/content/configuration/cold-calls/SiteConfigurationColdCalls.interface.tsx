import { ChangeEvent, Dispatch, FocusEvent, SetStateAction } from 'react';

import { TargetInterface } from '../../../../../../utilities/hooks/form/UseForm.interface';

export interface SiteConfigurationColdCallsFormInterface {
	enabled: boolean;
	startTimeLocal: string;
	endTimeLocal: string;
	days: string[];
}

export interface SiteConfigurationColdCallsAutocompleteInterface {
	updateLocations: string[];
	setUpdateLocations: Dispatch<SetStateAction<string[]>>;
	handleBlur: (event: FocusEvent<HTMLInputElement>) => void;
}

export interface SiteConfigurationColdCallsCheckboxInterface {
	weekdays: string[];
	handleChangeInputs: (id: string, values: string[]) => void;
}

export interface SiteConfigurationColdCallsTimesInterface {
	startTimeLocal: string;
	endTimeLocal: string;
	handleChangeInput: (event: ChangeEvent<HTMLInputElement> | TargetInterface) => void;
	handleBlur: (event: FocusEvent<HTMLInputElement>) => void;
	errors?: SiteConfigurationColdCallsFormInterface;
}
