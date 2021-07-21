import { validateEmail } from '../../../utilities/methods/Validations';
import { AuthLoginPayloadInterface } from '../Auth.interface';

/**
 * login form validation
 * @param values
 * @param touched
 */
export const LoginValidation = (
	values: AuthLoginPayloadInterface,
	touched: AuthLoginPayloadInterface
): AuthLoginPayloadInterface => {
	const common = 'LOGIN.FIELDS';
	const errors: AuthLoginPayloadInterface = {
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
