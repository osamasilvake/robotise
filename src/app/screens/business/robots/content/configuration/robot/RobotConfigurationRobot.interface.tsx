import { ChangeEvent, FocusEvent } from 'react';

import {
	RCCDataElementInterface,
	RCContentInterface
} from '../../../../../../slices/business/robots/configuration/robot-configuration/RobotConfiguration.slice.interface';
import { TargetInterface } from '../../../../../../utilities/hooks/form/UseForm.interface';

export interface RobotConfigurationRobotSectionInterface {
	section: RCContentInterface | null;
}

export interface RobotConfigurationRobotRenderElementsInterface {
	parentKey?: string;
	key: string;
	list: RCCDataElementInterface;
	index?: number;
}

export interface RobotConfigurationRobotFormInputInterface {
	id: string;
	label: string;
	content: RCCDataElementInterface;
	initValue: string;
	value: string;
	error: string | null;
	handleChangeInput: (event: ChangeEvent<HTMLInputElement> | TargetInterface) => void;
	handleBlur: (event: FocusEvent<HTMLInputElement>) => void;
}

export interface RobotConfigurationRobotFormBooleanInterface {
	id: string;
	label: string;
	content: RCCDataElementInterface;
	initValue: boolean;
	value: boolean;
	handleChangeCheckbox: (event: ChangeEvent<HTMLInputElement>) => void;
}
