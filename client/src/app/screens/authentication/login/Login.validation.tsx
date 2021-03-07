import { validateEmail } from '../../../utilities/methods/Validations';
import { AuthLoginInterface } from '../Auth.interface';

/**
 * login form validation
 * @param values
 * @param touched
 */
export const LoginFormValidation = (
	values: AuthLoginInterface,
	touched: AuthLoginInterface
): AuthLoginInterface => {
	const errors: AuthLoginInterface = {
		email: '',
		password: ''
	};

	// Email
	if (touched.email) {
		// required
		if (!values.email) {
			errors.email = 'AUTH.LOGIN.FIELDS.EMAIL.VALIDATIONS.REQUIRED';
		}

		// format
		if (values.email && !validateEmail(values.email) && touched.email) {
			errors.email = 'AUTH.LOGIN.FIELDS.EMAIL.VALIDATIONS.INVALID';
		}
	}

	// Password
	if (touched.password && !values.password) {
		errors.password = 'AUTH.LOGIN.FIELDS.PASSWORD.VALIDATIONS.REQUIRED';
	}

	return errors;
};
