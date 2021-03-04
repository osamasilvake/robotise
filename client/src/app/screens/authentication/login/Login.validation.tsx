import { validateEmail } from '../../../utilities/methods/ValidateEmail';
import { AuthLoginInterface } from '../Auth.interface';

/**
 * login form validation
 * @param values
 */
export const LoginFormValidation = (values: AuthLoginInterface): AuthLoginInterface => {
	const errors: AuthLoginInterface = {
		email: '',
		password: ''
	};

	// Email
	if (!values.email) {
		errors.email = 'AUTH.LOGIN.FIELDS.EMAIL.VALIDATIONS.REQUIRED';
	}

	// Password
	if (!values.password) {
		errors.password = 'AUTH.LOGIN.FIELDS.PASSWORD.VALIDATIONS.REQUIRED';
	}

	// Email: format
	if (values.email && !validateEmail(values.email)) {
		errors.email = 'AUTH.LOGIN.FIELDS.EMAIL.VALIDATIONS.INVALID';
	}

	return errors;
};
