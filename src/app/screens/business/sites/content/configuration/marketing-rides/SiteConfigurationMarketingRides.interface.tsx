import { ChangeEvent, FocusEvent } from 'react';

import { TargetInterface } from '../../../../../../utilities/hooks/form/UseForm.interface';

export interface SiteConfigurationMarketingRidesInterface {
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

export interface SiteConfigurationMarketingRidesFormInterface {
	times: SiteConfigurationMarketingRidesTimesInterface[];
}

export interface SiteConfigurationMarketingRidesTimesInterface {
	id: number;
	value: string;
}
