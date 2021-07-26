import { ChangeEvent, FocusEvent, FormEvent } from 'react';

export interface UseFormRetInterface<UseFormEntity> {
	handleChangeStringInputs: (
		index: number,
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | TargetInterface,
		items: string[]
	) => void;
	handleChangeInput: (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | TargetInterface
	) => void;
	handleChangeCheckbox: (event: ChangeEvent<HTMLInputElement>) => void;
	handleChangeSelect: (event: ChangeEvent<SelectInterface>) => void;
	handleBlur: (event: FocusEvent<HTMLInputElement>) => void;
	handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
	values: UseFormEntity;
	errors: null | UseFormEntity;
}

export interface TargetInterface {
	target: {
		name: string;
		value: string;
	};
}

export interface SelectInterface {
	name?: string;
	value: string;
}
