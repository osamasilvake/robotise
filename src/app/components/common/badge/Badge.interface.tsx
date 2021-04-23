import { BadgeTypeEnum } from './Badge.enum';

export interface BadgeInterface {
	type: BadgeTypeEnum;
	count?: number;
	color?: 'primary' | 'secondary' | 'default' | 'error';
}
