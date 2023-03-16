import { SelectChangeEvent } from '@mui/material';
import { ChangeEvent, FocusEvent } from 'react';

import {
	RCCDataElementInterface,
	RCContentDataInterface
} from '../../../../../../slices/business/robots/configuration/robot/RobotConfiguration.slice.interface';
import { TargetInterface } from '../../../../../../utilities/hooks/form/UseForm.interface';

export interface RobotConfigurationRobotInterface {
	section: RCContentDataInterface;
}

export interface RobotConfigurationRobotSectionInterface {
	section: RCContentDataInterface;
}

export interface RobotConfigurationRobotRenderElementsInterface {
	parentKey?: string;
	key: string;
	list: RCCDataElementInterface;
	level: number;
	index?: number;
}

export interface RobotConfigurationRobotResultInterface {
	initial: RCCDataElementInterface;
	update: RCCDataElementInterface;
	newItems?: RCCDataElementInterface[];
	isArray?: boolean;
}

export interface RobotConfigurationRobotSectionSelectInterface {
	id: string;
	label: string;
	content: RCCDataElementInterface;
	initValue: any;
	value: any;
	choices: string[];
	handleChangeSelect: (event: SelectChangeEvent) => void;
}

export interface RobotConfigurationRobotSectionInputInterface {
	multiline: boolean;
	id: string;
	label: string;
	content: RCCDataElementInterface;
	initValue: string;
	value: string;
	error: string | null;
	handleChangeInput: (event: ChangeEvent<HTMLInputElement> | TargetInterface) => void;
	handleBlur: (event: FocusEvent<HTMLInputElement>) => void;
}

export interface RobotConfigurationRobotSectionBooleanInterface {
	id: string;
	label: string;
	content: RCCDataElementInterface;
	initValue: boolean;
	value: boolean;
	handleChangeCheckbox: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface RobotConfigurationRobotAddDeleteItemInterface {
	parentKey?: string;
	items: RCCDataElementInterface | RCCDataElementInterface[];
	isDelete?: boolean;
	isRoot?: boolean;
}
