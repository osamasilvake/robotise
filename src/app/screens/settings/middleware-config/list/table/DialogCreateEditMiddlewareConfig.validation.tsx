import { DialogCreateEditMiddlewareConfigFormInterface } from './MiddlewareConfigTable.interface';

/**
 * create/edit middleware config validation
 * @param values
 * @param touched
 */
export const CreateEditMiddlewareConfigValidation = (
	values: DialogCreateEditMiddlewareConfigFormInterface,
	touched: DialogCreateEditMiddlewareConfigFormInterface
): DialogCreateEditMiddlewareConfigFormInterface => {
	const translation = 'MIDDLEWARE_CONFIG:LIST.ACTIONS.CREATE_EDIT.FIELDS';
	const errors: DialogCreateEditMiddlewareConfigFormInterface = {
		name: '',
		desc: '',
		key: '',
		prop: '',
		direction: '',
		status: '',
		traceMode: ''
	};

	// Name
	if (touched.name) {
		// required
		if (!values.name) {
			errors.name = `${translation}.NAME.VALIDATIONS.REQUIRED`;
		}
	}

	// Key
	if (touched.key) {
		// required
		if (!values.key) {
			errors.key = `${translation}.KEY.VALIDATIONS.REQUIRED`;
		}
	}

	// Prop
	if (touched.prop) {
		// required
		if (!values.prop) {
			errors.prop = `${translation}.PROP.VALIDATIONS.REQUIRED`;
		}
	}

	// Direction
	if (touched.direction) {
		// required
		if (!values.direction) {
			errors.direction = `${translation}.DIRECTION.VALIDATIONS.REQUIRED`;
		}
	}

	return errors;
};
