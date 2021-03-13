import { BadgeTypeEnum } from './Badge.enum';

export interface BadgeInterface {
	options?: BadgeNumberInterface;
}

export interface BadgeNumberInterface {
	type?: BadgeTypeEnum.NUMBER;
	count?: number;
	color?: 'primary' | 'secondary' | 'default' | 'error';
}
