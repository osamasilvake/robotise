/**
 * control mode
 * @param value
 */
export const controlMode = (value: string) => {
	switch (value) {
		case 'joystick':
			return 'CONTENT.DETAIL.COMMANDS.CONTROL.CHIPS.MODE.JOYSTICK';
		case 'autonomous':
			return 'CONTENT.DETAIL.COMMANDS.CONTROL.CHIPS.MODE.AUTONOMOUS';
		case 'roc_control':
			return 'CONTENT.DETAIL.COMMANDS.CONTROL.CHIPS.MODE.ROC_CONTROL';
		default:
			return value;
	}
};
