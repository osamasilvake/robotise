// react
import { FocusEvent, FormEvent, useEffect, useState } from 'react';

/**
 * custom hook: useForm
 * handle change events of TextField and DatePicker and perform validation on the form
 * @param valuesInitialState
 * @param formValidation
 * @param submitCallBack
 * @returns {*}
 */
const useForm = (valuesInitialState: any, formValidation: any, submitCallBack: any) => {
	const errorInitialState = {};

	// hooks: values, errors, loader
	const [values, setValues] = useState(valuesInitialState);
	const [errors, setErrors] = useState(errorInitialState);
	const [loader, setLoader] = useState(false);

	useEffect(() => {
		// set errors
		const validateErrors = formValidation(values);
		setErrors(validateErrors);
	}, [values, formValidation, setErrors]);

	/**
	 * handle change
	 * @param event
	 */
	const handleChange = (event: FocusEvent<HTMLInputElement>) => {
		// payload
		const { name, value } = event.target;

		// set values
		setValues((prevState: any) => ({
			...prevState,
			[name]: value
		}));
	};

	/**
	 * handle submit
	 */
	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		// prevent default
		event.preventDefault();

		// start loader
		setLoader(true);

		// callback
		// wait for callback to execute
		await submitCallBack();

		// stop loader
		setLoader(false);

		// set errors initial state
		setErrors(errorInitialState);
	};

	return [handleChange, handleSubmit, values, errors, loader];
};
export default useForm;
