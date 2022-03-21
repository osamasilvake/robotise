import { SelectChangeEvent } from '@mui/material/Select';
import { ChangeEvent, FocusEvent, FormEvent, SyntheticEvent } from 'react';

export interface UseFormRetInterface<UseFormEntity> {
	handleChangeInput: (event: ChangeEvent<HTMLInputElement> | TargetInterface) => void;
	handleChangeInputs: (id: string, values: string[]) => void;
	handleChangeInputsMultiple: (
		index: number,
		event: ChangeEvent<HTMLInputElement> | TargetInterface,
		items: string[]
	) => void;
	handleChangeCheckbox: (event: ChangeEvent<HTMLInputElement>) => void;
	handleChangeSelect: (event: SelectChangeEvent) => void;
	handleChangeAutoComplete: <T>(event: SyntheticEvent, option: T) => void;
	handleBlur: (event: FocusEvent<HTMLInputElement>) => void;
	handleSubmit: (event: FormEvent<HTMLFormElement | EventTarget>) => Promise<void>;
	values: UseFormEntity;
	errors: null | UseFormEntity;
}

export interface TargetInterface {
	target: {
		name: string;
		value: string;
		valueAsNumber?: number;
	};
}
