import { ChangeEvent, FocusEvent } from 'react';

import {
	RCCDataElementKeyValueInterface,
	RCContentInterface
} from '../../../../../../slices/business/robots/configuration/robot-configuration/RobotConfiguration.slice.interface';
import { TargetInterface } from '../../../../../../utilities/hooks/form/UseForm.interface';

export interface RobotConfigurationRobotSectionInterface {
	section: RCContentInterface | null;
}

export interface RobotConfigurationRobotFormInterface {
	[key: string]: string | object;
}

export interface RobotConfigurationRobotFieldsChangesInterface {
	key: string;
	value: string | number | object;
}

export interface RobotConfigurationRobotRecursiveOutputInterface {
	[key: string]: any;
}

export interface RobotConfigurationRobotRenderElementsInterface {
	parentKey?: string;
	key: string;
	list: RCCDataElementKeyValueInterface;
	index?: number;
}

export interface RobotConfigurationRobotFormInputInterface {
	id: string;
	label: string;
	content: RCCDataElementKeyValueInterface;
	initValue: string;
	value: string;
	error: string | null;
	handleChangeInput: (event: ChangeEvent<HTMLInputElement> | TargetInterface) => void;
	handleBlur: (event: FocusEvent<HTMLInputElement>) => void;
}

export interface RobotConfigurationRobotFormBooleanInterface {
	id: string;
	label: string;
	content: RCCDataElementKeyValueInterface;
	initValue: boolean;
	value: boolean;
	handleChangeCheckbox: (event: ChangeEvent<HTMLInputElement>) => void;
}
