import { HTMLInputTypeAttribute } from 'react';

import { TriggerMessageInterface } from '../../../../../components/frame/message/Message.interface';

export interface SliceRobotConfigurationInterface {
	init: boolean;
	loader: boolean;
	loading: boolean;
	content: RCContentInterface[] | null;
	errors: TriggerMessageInterface | null;
}

export interface RCContentInterface {
	id: string;
	name: string;
	configType: string;
	elements: RCCDataElementInterface;
	preset: boolean;
	sectionName: string;
	updatedFrom: string;
	updatedOrigin: string;
	deleted: false;
	createdAt: Date;
	updatedAt: Date;
}

export interface RCCDataElementInterface {
	type: string;
	required: boolean;
	notes: string;
	value: {
		[key: string]: RCCDataElementValueInterface;
	};
}

export interface RCCDataElementValueInterface {
	default: string;
	required: boolean;
	notes: string;
	type: HTMLInputTypeAttribute;
	value: object;
}
