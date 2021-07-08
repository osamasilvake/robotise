import { ChangeEvent, FocusEvent, FormEvent } from 'react';

export interface UseFormRetInterface<UseFormEntity> {
	handleChangeMultipleInputs: (
		index: number,
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | MultipleInputsTargetInterface,
		items: string[]
	) => void;
	handleChangeInput: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	handleChangeCheckbox: (event: ChangeEvent<HTMLInputElement>) => void;
	handleChangeSelect: (event: ChangeEvent<SelectInterface>) => void;
	handleBlur: (event: FocusEvent<HTMLInputElement>) => void;
	handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
	values: UseFormEntity;
	errors: null | UseFormEntity;
}

export interface MultipleInputsTargetInterface {
	target: {
		name: string;
		value: string;
	};
}

export interface SelectInterface {
	name?: string;
	value: string;
}
