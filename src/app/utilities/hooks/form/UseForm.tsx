import { ChangeEvent, FormEvent, useState } from 'react';

import { SelectInterface, UseFormRetInterface } from './UseForm.interface';

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
	const [errors, setErrors] = useState<null | UseFormEntity>(null);
	const [touched, setTouched] = useState(initState);

	/**
	 * handle change: input
	 * @param event
	 */
	const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
		const { name } = event.target;
		const value = event.target.value;

		if (name) {
			// set change event values
			setChangeEventValues(name, value);
		}
	};

	/**
	 * handle change: checkbox
	 * @param event
	 */
	const handleChangeCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
		const { name } = event.target;
		const value = event.target.checked;

		if (name) {
			// set change event values
			setChangeEventValues(name, value);
		}
	};

	/**
	 * handle change: select
	 * @param event
	 */
	const handleChangeSelect = (event: ChangeEvent<SelectInterface>) => {
		const { name, value } = event.target;
		if (name && value) {
			// set change event values
			setChangeEventValues(name, value);
		}
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
	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		// prevent default
		event.preventDefault();

		// wait for callback to execute
		await submitCallBack();
	};

	return {
		handleChangeInput,
		handleChangeCheckbox,
		handleChangeSelect,
		handleBlur,
		handleSubmit,
		values,
		errors
	};
};
