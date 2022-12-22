import { HTMLInputTypeAttribute } from 'react';

import { TriggerMessageInterface } from '../../../../../components/frame/message/Message.interface';

export interface SliceSiteConfigurationInterface {
	init: boolean;
	loader: boolean;
	loading: boolean;
	updating: boolean;
	content: SCContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface SCContentInterface {
	data: SCContentDataInterface[];
	pSiteId?: string;
}

export interface SCContentDataInterface {
	id: string;
	name: string;
	configType: string;
	elements: SCCDataElementInterface;
	preset: boolean;
	sectionName: string;
	updatedFrom: string;
	updatedOrigin: string;
	deleted: false;
	createdAt: Date;
	updatedAt: Date;
}

export interface SCCDataElementInterface {
	[key: string]:
		| number
		| string
		| string[]
		| boolean
		| SCCDataElementInterface
		| SCCDataElementInterface[]
		| SCCDataElementKeyValueInterface;
}

export interface SCCDataElementKeyValueInterface {
	default: string;
	required: boolean;
	notes: string;
	type: HTMLInputTypeAttribute;
	value: object;
}
