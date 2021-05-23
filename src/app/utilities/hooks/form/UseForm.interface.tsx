import { ChangeEvent, FocusEvent, FormEvent } from 'react';

export interface UseFormRetInterface<UseFormEntity> {
	handleChangeInput: (event: ChangeEvent<HTMLInputElement>) => void;
	handleChangeCheckbox: (event: ChangeEvent<HTMLInputElement>) => void;
	handleChangeSelect: (event: ChangeEvent<SelectInterface>) => void;
	handleBlur: (event: FocusEvent<HTMLInputElement>) => void;
	handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
	values: UseFormEntity;
	errors: null | UseFormEntity;
}

export interface SelectInterface {
	name?: string;
	value: string;
}
