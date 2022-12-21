import { AppConfigService } from '../../../../../../../services';
import { DialogModifyRoomsFormInterface } from './SiteRoomsActions.interface';

/**
 * modify rooms validation
 * @param values
 * @param touched
 */
export const ModifyRoomsValidation = (
	values: DialogModifyRoomsFormInterface,
	touched: DialogModifyRoomsFormInterface
): DialogModifyRoomsFormInterface => {
	const translation = 'SITES:CONTENT.ROOMS.LIST.ACTIONS.MODIFY.FORM.FIELDS';
	const regexRooms = AppConfigService.AppOptions.regex.rooms;
	const errors: DialogModifyRoomsFormInterface = {
		whitelist: '',
		blocked: ''
	};

	// Whitelist
	if (touched.whitelist) {
		// validate
		if (values.whitelist && !regexRooms.test(values.whitelist as string)) {
			errors.whitelist = `${translation}.WHITELIST.VALIDATIONS.INVALID`;
		}
	}

	// Blocked
	if (touched.whitelist) {
		// validate
		if (values.blocked && !regexRooms.test(values.blocked as string)) {
			errors.blocked = `${translation}.BLOCKED.VALIDATIONS.INVALID`;
		}
	}

	// Whitelist/Blocked
	if (touched.whitelist && touched.blocked) {
		if (values.whitelist && values.blocked) {
			const str1 = values.whitelist as string;
			const str2 = values.blocked as string;
			const words = str2.split(',');
			words
				.filter((w) => w && w.length >= 3)
				.forEach((word) => {
					if (str1 === word) {
						errors.blocked = `${translation}.BLOCKED.VALIDATIONS.SIMILAR`;
					}
				});
		}
	}

	return errors;
};
