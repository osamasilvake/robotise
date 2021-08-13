import { validateEmail } from '../../../utilities/methods/Validations';
import { AuthLoginFormInterface } from '../Auth.interface';

/**
 * login form validation
 * @param values
 * @param touched
 */
export const LoginValidation = (
	values: AuthLoginFormInterface,
	touched: AuthLoginFormInterface
): AuthLoginFormInterface => {
	const common = 'LOGIN.FIELDS';
	const errors: AuthLoginFormInterface = {
		email: '',
		password: ''
	};

	// Email
	if (touched.email) {
		// required
		if (!values.email) {
			errors.email = `${common}.EMAIL.VALIDATIONS.REQUIRED`;
		}

		// validate
		if (values.email && !validateEmail(values.email)) {
			errors.email = `${common}.EMAIL.VALIDATIONS.INVALID`;
		}
	}

	// Password
	if (touched.password && !values.password) {
		errors.password = 'LOGIN.FIELDS.PASSWORD.VALIDATIONS.REQUIRED';
	}

	return errors;
};
