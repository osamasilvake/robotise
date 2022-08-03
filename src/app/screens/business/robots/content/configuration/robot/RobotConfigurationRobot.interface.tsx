import { ChangeEvent, FocusEvent } from 'react';

import {
	RCCDataElementValueInterface,
	RCContentInterface
} from '../../../../../../slices/business/robots/configuration/robot-configuration/RobotConfiguration.slice.interface';
import { TargetInterface } from '../../../../../../utilities/hooks/form/UseForm.interface';

export interface RobotConfigurationRobotFormInputInterface {
	id: string;
	label: string;
	content: RCCDataElementValueInterface;
	handleChangeInput: (event: ChangeEvent<HTMLInputElement> | TargetInterface) => void;
	handleBlur: (event: FocusEvent<HTMLInputElement>) => void;
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
	[key: string]:
		| RCCDataElementValueInterface
		| { [key: string]: string | RCCDataElementValueInterface };
}

export interface RobotConfigurationRobotRenderElementsInterface {
	parentKey?: string;
	key: string;
	obj: RCCDataElementValueInterface;
	index?: number;
}
