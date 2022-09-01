import { SelectChangeEvent } from '@mui/material/Select';
import { ChangeEvent, FormEvent, SyntheticEvent, useState } from 'react';

import { TargetInterface, UseFormRetInterface } from './UseForm.interface';

/**
 * custom hook: useForm
 * handle change events of input fields and perform error validation on the form
 * @param initState
 * @param formValidation
 * @param submitCallBack
 */
export const useForm = <UseFormEntity,>(
	initState: UseFormEntity,
	formValidation: (arg: UseFormEntity, arg2: UseFormEntity) => UseFormEntity,
	submitCallBack: () => Promise<void>
): UseFormRetInterface<UseFormEntity> => {
	const [values, setValues] = useState(initState);
	const [errors, setErrors] = useState<UseFormEntity>();
	const [touched, setTouched] = useState(initState);

	/**
	 * handle change: input
	 * @param event
	 */
	const handleChangeInput = (event: ChangeEvent<HTMLInputElement> | TargetInterface) => {
		const { name, value } = event.target;

		// set change event values
		name && setChangeEventValues(name, value);
	};

	/**
	 * handle change: inputs (single field)
	 * @param name
	 * @param values
	 */
	const handleChangeInputs = (name: string, values: string[]) => {
		setChangeEventValues(name, values);
	};

	/**
	 * handle change: inputs (multiple fields)
	 * @param index
	 * @param event
	 * @param items
	 */
	const handleChangeInputsMultiple = (
		index: number,
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | TargetInterface,
		items: string[]
	) => {
		const { name, value } = event.target;
		const list = [...items];

		// update target field
		list[index] = value;

		// set change event values
		setChangeEventValues(name, list);
	};

	/**
	 * handle change: checkbox
	 * @param event
	 */
	const handleChangeCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = event.target;

		// set change event values
		name && setChangeEventValues(name, checked);
	};

	/**
	 * handle change: select
	 * @param event
	 */
	const handleChangeSelect = (event: SelectChangeEvent) => {
		const { name, value } = event.target;

		// set change event values
		name && value && setChangeEventValues(name, value);
	};

	const handleChangeAutoComplete = <T,>(event: SyntheticEvent, option: T) => {
		const id = (event.target as Element)?.id;
		const name = id?.split('-')[0];
		if (!name) return;
		const value = option;

		// set change event values
		name && value && setChangeEventValues(name, value);
	};

	/**
	 * set change event values
	 * @param name
	 * @param value
	 */
	const setChangeEventValues = (name: string, value: string | boolean | unknown) => {
		setValues((prevState) => {
			const newState = {
				...prevState,
				[name]: value
			};

			// form validation
			setErrors(formValidation(newState, touched));

			return newState;
		});
	};

	/**
	 * handle blur
	 * @param event
	 */
	const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
		const { name } = event.target;

		// set touch to current selected property
		setTouched((prevState) => {
			const newState = {
				...prevState,
				[name]: true
			};

			// form validation
			setErrors(formValidation(values, newState));

			return newState;
		});
	};

	/**
	 * handle submit
	 * @param event
	 */
	const handleSubmit = async (event: FormEvent<HTMLFormElement | EventTarget>) => {
		// prevent default
		event.preventDefault();

		// wait for callback to execute
		await submitCallBack();
	};

	return {
		handleChangeInput,
		handleChangeInputs,
		handleChangeInputsMultiple,
		handleChangeCheckbox,
		handleChangeSelect,
		handleBlur,
		handleSubmit,
		handleChangeAutoComplete,
		values,
		errors
	};
};
