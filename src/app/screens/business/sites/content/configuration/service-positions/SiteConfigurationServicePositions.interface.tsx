import { Dispatch, SetStateAction } from 'react';

import {
	SliceServicePositionsInterface,
	SSCDataInterface
} from '../../../../../../slices/business/sites/configuration/ServicePositions.slice.interface';
import { SiteConfigurationServicePositionsCreateEditTypeEnum } from './SiteConfigurationServicePositions.enum';

export interface SiteConfigurationServicePositionsInterface {
	servicePositions: SliceServicePositionsInterface;
}

export interface SiteConfigurationServicePositionInterface {
	servicePosition: SSCDataInterface;
	index: number;
}

export interface DialogCreateEditServicePositionInterface {
	type: SiteConfigurationServicePositionsCreateEditTypeEnum;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	index?: number;
}

export interface DialogCreateEditServicePositionFormInterface {
	id?: string;
	name: string;
	location: string;
}

export interface DialogDeleteServicePositionInterface {
	servicePosition: SSCDataInterface;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}
