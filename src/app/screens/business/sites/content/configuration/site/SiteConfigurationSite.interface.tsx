import { ChangeEvent, Dispatch, FocusEvent, SetStateAction } from 'react';

import { RTSContentDataInterface } from '../../../../../../slices/business/robots/RobotTwinsSummary.slice.interface';
import {
	SCCDataElementInterface,
	SCContentDataInterface
} from '../../../../../../slices/business/sites/configuration/site-configuration/SiteConfiguration.slice.interface';
import { TargetInterface } from '../../../../../../utilities/hooks/form/UseForm.interface';

export interface SiteConfigurationSiteInterface {
	section: SCContentDataInterface;
}

export interface SiteConfigurationSiteSectionInterface {
	section: SCContentDataInterface;
}

export interface SiteConfigurationSiteRenderElementsInterface {
	parentKey?: string;
	key: string;
	list: SCCDataElementInterface;
	index?: number;
}

export interface SiteConfigurationSiteResultInterface {
	initial: SCCDataElementInterface;
	update: SCCDataElementInterface;
	newItems?: SCCDataElementInterface[];
	isArray?: boolean;
}

export interface SiteConfigurationSiteFormInputInterface {
	multiline: boolean;
	id: string;
	label: string;
	content: SCCDataElementInterface;
	initValue: string;
	value: string;
	error: string | null;
	handleChangeInput: (event: ChangeEvent<HTMLInputElement> | TargetInterface) => void;
	handleBlur: (event: FocusEvent<HTMLInputElement>) => void;
}

export interface SiteConfigurationSiteFormBooleanInterface {
	id: string;
	label: string;
	content: SCCDataElementInterface;
	initValue: boolean;
	value: boolean;
	handleChangeCheckbox: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface SiteConfigurationSiteAddDeleteItemInterface {
	parentKey?: string;
	items: SCCDataElementInterface;
	isDelete?: boolean;
	isRoot?: boolean;
}

export interface DialogSiteConfigurationSyncRobotInterface {
	open: SCCDataElementInterface | SCCDataElementInterface[] | null;
	setOpen: Dispatch<SetStateAction<SCCDataElementInterface | SCCDataElementInterface[] | null>>;
	section: SCContentDataInterface;
	robotsList: RTSContentDataInterface[];
	cSiteId: string;
}
