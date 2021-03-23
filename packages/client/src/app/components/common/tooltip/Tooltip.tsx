import { Tooltip } from '@material-ui/core';
import clsx from 'clsx';
import { FC } from 'react';

import { isMobileDevice } from '../../../utilities/methods/MobileUtilities';
import { TooltipInterface } from './Tooltip.interface';
import { TooltipStyles } from './Tooltip.style';

const TooltipCustom: FC<TooltipInterface> = (props) => {
	const { children, title, hideOnMobile, hideTitleOnMobile, ...rest } = props;
	const tooltipClasses = TooltipStyles();

	return (
		<Tooltip
			interactive
			classes={{
				tooltip: tooltipClasses.sTooltip
			}}
			className={clsx({
				[tooltipClasses.sTooltipElementHideOnMobile]: hideOnMobile,
				[tooltipClasses.sTooltipElementCursorZoom]: !!title,
				[tooltipClasses.sTooltipElementCursorDefault]: hideTitleOnMobile && isMobileDevice()
			})}
			title={!(hideTitleOnMobile && isMobileDevice()) && title}
			{...rest}>
			{children}
		</Tooltip>
	);
};
export default TooltipCustom;
