import { Dispatch, SetStateAction } from 'react';

import {
	SliceServicePositionsInterface,
	SSCDataInterface
} from '../../../../../../slices/business/sites/configuration/ServicePositions.slice.interface';
import { SiteServicePositionsCreateEditTypeEnum } from './SiteServicePositions.enum';

export interface SiteServicePositionsInterface {
	servicePositions: SliceServicePositionsInterface;
}

export interface SiteServicePositionInterface {
	servicePosition: SSCDataInterface;
	index: number;
}

export interface DialogCreateEditServicePositionInterface {
	type: SiteServicePositionsCreateEditTypeEnum;
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
