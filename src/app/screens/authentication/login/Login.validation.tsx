import { validateEmail } from '../../../utilities/methods/Validations';
import { AuthLoginPayloadInterface } from '../Auth.interface';

/**
 * login form validation
 * @param values
 * @param touched
 */
export const LoginFormValidation = (
	values: AuthLoginPayloadInterface,
	touched: AuthLoginPayloadInterface
): AuthLoginPayloadInterface => {
	const errors: AuthLoginPayloadInterface = {
		email: '',
		password: ''
	};

	// Email
	if (touched.email) {
		// required
		if (!values.email) {
			errors.email = 'LOGIN.FIELDS.EMAIL.VALIDATIONS.REQUIRED';
		}

		// validate
		if (values.email && !validateEmail(values.email) && touched.email) {
			errors.email = 'LOGIN.FIELDS.EMAIL.VALIDATIONS.INVALID';
		}
	}

	// Password
	if (touched.password && !values.password) {
		errors.password = 'LOGIN.FIELDS.PASSWORD.VALIDATIONS.REQUIRED';
	}

	return errors;
};
