import { ChangeEvent, FocusEvent, FormEvent, useState } from 'react';

import { timeout } from '../methods/Timeout';
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
	formValidation: (arg: UseFormEntity) => UseFormEntity,
	submitCallBack: () => Promise<void>
): UseFormRetInterface<UseFormEntity> => {
	const [values, setValues] = useState(initState);
	const [errors, setErrors] = useState(initState);
	const [loader, setLoader] = useState(false);

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

		// set values
		setValues((prevState) => {
			const newState = {
				...prevState,
				[name]: value
			};

			// TODO: validate only incase of error
			setErrors(formValidation(newState));

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

		// start loader
		setLoader(true);

		// timeout: 1000ms
		await timeout(1000);

		// wait for callback to execute
		await submitCallBack();

		// stop loader
		setLoader(false);
	};

	return { handleChange, handleSubmit, values, errors, loader };
};
