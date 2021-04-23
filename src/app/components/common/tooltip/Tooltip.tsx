import { Tooltip } from '@material-ui/core';
import clsx from 'clsx';
import { FC } from 'react';

import { AppConfigService } from '../../../services';
import { useWindow } from '../../../utilities/hooks/window/UseWindow';
import { TooltipInterface } from './Tooltip.interface';
import { TooltipStyles } from './Tooltip.style';

const TooltipCustom: FC<TooltipInterface> = (props) => {
	const { children, title, hideOnMobile, hideTitleOnMobile, ...rest } = props;
	const classes = TooltipStyles();

	const cWindow = useWindow();

	const mobileScreen = AppConfigService.AppOptions.styles.responsive.mobile;

	return (
		<Tooltip
			classes={{
				tooltip: classes.sTooltip
			}}
			className={clsx({
				[classes.sTooltipElementHideOnMobile]: hideOnMobile,
				[classes.sTooltipElementCursorZoom]: !!title,
				[classes.sTooltipElementCursorDefault]:
					hideTitleOnMobile && cWindow.innerWidth <= mobileScreen
			})}
			title={!(hideTitleOnMobile && cWindow.innerWidth <= mobileScreen) && title}
			{...rest}>
			{children}
		</Tooltip>
	);
};
export default TooltipCustom;
