import { ArrowUpward } from '@mui/icons-material';
import { Box, Fab, useScrollTrigger, Zoom } from '@mui/material';
import { FC } from 'react';

import { ScrollTopStyle } from './ScrollTop.style';

const ScrollTop: FC = () => {
	const classes = ScrollTopStyle();

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
			<Box onClick={handleScrollToTop} className={classes.sScrollTop}>
				<Fab size="small" color="primary">
					<ArrowUpward className={classes.sScrollTopIcon} />
				</Fab>
			</Box>
		</Zoom>
	);
};
export default ScrollTop;
