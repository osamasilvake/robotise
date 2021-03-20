import { Box, Fab, useScrollTrigger, Zoom } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { FC } from 'react';

import { scrollTopStyles } from './ScrollTop.styles';

const ScrollTop: FC = () => {
	const scrollTopClasses = scrollTopStyles();
	const trigger = useScrollTrigger({
		target: window,
		disableHysteresis: true,
		threshold: 100
	});

	/**
	 * scroll to top
	 */
	const handleScrollToTop = () => {
		const scrollSpeed = 400;
		const scrollDuration = scrollSpeed / 25;
		const scrollStep = -window.scrollY / scrollDuration;
		const scrollInterval = setInterval(() => {
			if (window.scrollY !== 0) {
				window.scrollBy(0, scrollStep);
			} else {
				clearInterval(scrollInterval);
			}
		}, 15);
	};

	return (
		<Zoom in={trigger}>
			<Box onClick={handleScrollToTop} className={scrollTopClasses.sScrollTop}>
				<Fab size="small">
					<ArrowUpwardIcon />
				</Fab>
			</Box>
		</Zoom>
	);
};
export default ScrollTop;
