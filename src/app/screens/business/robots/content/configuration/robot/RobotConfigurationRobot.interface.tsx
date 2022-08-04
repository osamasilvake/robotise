import { ChangeEvent, FocusEvent } from 'react';

import {
	RCCDataElementKeyValueInterface,
	RCContentInterface
} from '../../../../../../slices/business/robots/configuration/robot-configuration/RobotConfiguration.slice.interface';
import { TargetInterface } from '../../../../../../utilities/hooks/form/UseForm.interface';

export interface RobotConfigurationRobotFormInputInterface {
	id: string;
	label: string;
	content: RCCDataElementKeyValueInterface;
	handleChangeInput: (event: ChangeEvent<HTMLInputElement> | TargetInterface) => void;
	handleBlur: (event: FocusEvent<HTMLInputElement>) => void;
	initValue: string;
	value: string;
}

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
