import { AppConfigService } from '../../../services';
import { AuthLoginFormInterface } from '../Auth.interface';

/**
 * login validation
 * @param values
 * @param touched
 */
export const LoginValidation = (
	values: AuthLoginFormInterface,
	touched: AuthLoginFormInterface
): AuthLoginFormInterface => {
	const translation = 'LOGIN.FIELDS';
	const regexEmail = AppConfigService.AppOptions.regex.email;
	const errors: AuthLoginFormInterface = {
		email: '',
		password: ''
	};

	// Email
	if (touched.email) {
		// required
		if (!values.email) {
			errors.email = `${translation}.EMAIL.VALIDATIONS.REQUIRED`;
		}

		// validate
		if (values.email && !regexEmail.test(values.email)) {
			errors.email = `${translation}.EMAIL.VALIDATIONS.INVALID`;
		}
	}

	// Password
	if (touched.password && !values.password) {
		errors.password = 'LOGIN.FIELDS.PASSWORD.VALIDATIONS.REQUIRED';
	}

	return errors;
};
