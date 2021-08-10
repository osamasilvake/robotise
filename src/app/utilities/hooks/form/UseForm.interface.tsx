import { SelectChangeEvent } from '@material-ui/core/Select';
import { ChangeEvent, FocusEvent, FormEvent } from 'react';

export interface UseFormRetInterface<UseFormEntity> {
	handleChangeStringInputs: (
		index: number,
		event: ChangeEvent<HTMLInputElement> | TargetInterface,
		items: string[]
	) => void;
	handleChangeInput: (event: ChangeEvent<HTMLInputElement> | TargetInterface) => void;
	handleChangeInputNumber: (event: ChangeEvent<HTMLInputElement>) => void;
	handleChangeCheckbox: (event: ChangeEvent<HTMLInputElement>) => void;
	handleChangeSelect: (event: SelectChangeEvent) => void;
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
