import { Box } from '@mui/material';
import clsx from 'clsx';
import { FC, Suspense, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../components/common/loader/Loader.enum';
import Drawer from '../../components/frame/drawer/Drawer';
import { LayoutPageInterface } from '../../routes/Routes.interface';
import { AppConfigService } from '../../services';
import { appSelector } from '../../slices/app/App.slice';
import { RobotTwinsSummaryFetchList } from '../../slices/business/robots/RobotTwinsSummary.slice';
import { SitesFetchList } from '../../slices/business/sites/Sites.slice';
import { PrivateLayoutStyle } from './PrivateLayout.style';

const PrivateLayout: FC<LayoutPageInterface> = (props) => {
	const { Component } = props;
	const classes = PrivateLayoutStyle();

	const dispatch = useDispatch();
	const app = useSelector(appSelector);

	const loaded = useRef(false);

	useEffect(() => {
		/**
		 * actions
		 * 1. load and refresh sites
		 * 2. load and refresh robot-twins summary
		 * 3. set loaded to trigger loading instead of loader after 1st call
		 */
		const actions = () => {
			// dispatch: fetch sites
			dispatch(SitesFetchList(!!loaded.current));

			// dispatch: fetch robot twins summary
			dispatch(RobotTwinsSummaryFetchList(!!loaded.current));

			// set loaded
			loaded.current = true;
		};
		actions();

		// interval
		const intervalId = window.setInterval(
			actions,
			AppConfigService.AppOptions.screens.business.sites.list.refreshTime ||
				AppConfigService.AppOptions.screens.business.robots.list.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [dispatch]);

	return (
		<Box component="main">
			{/* Drawer */}
			<Drawer />

			{/* Content */}
			<Box
				className={clsx({
					[classes.sContentOpen]: app.openDrawer,
					[classes.sContentClose]: !app.openDrawer
				})}>
				<Suspense fallback={<Loader loader={LoaderTypeEnum.FALLBACK_LOADER} />}>
					<Component />
				</Suspense>
			</Box>
		</Box>
	);
};
export default PrivateLayout;
