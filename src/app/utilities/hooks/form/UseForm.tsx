import { ChangeEvent, FocusEvent, FormEvent, useState } from 'react';

import { UseFormEventTypeEnum } from './UseForm.enum';
import { UseFormRetInterface } from './UseForm.interface';

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
	const [errors, setErrors] = useState(initState);
	const [touched, setTouched] = useState(initState);

	/**
	 * handle change
	 * @param event
	 */
	const handleChange = (event: FocusEvent<HTMLInputElement> | ChangeEvent<HTMLInputElement>) => {
		const { name } = event.target;
		const value =
			event.target.type === UseFormEventTypeEnum.CHECKBOX
				? event.target.checked
				: event.target.value;

		// update value to current selected property
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

	return { handleChange, handleBlur, handleSubmit, values, errors };
};
