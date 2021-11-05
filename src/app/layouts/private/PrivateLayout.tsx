import { Box } from '@mui/material';
import clsx from 'clsx';
import { FC, Suspense } from 'react';
import { useSelector } from 'react-redux';

import Loader from '../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../components/common/loader/Loader.enum';
import Drawer from '../../components/frame/drawer/Drawer';
import { LayoutPageInterface } from '../../routes/Routes.interfaces';
import { generalSelector } from '../../slices/general/General.slice';
import { PrivateLayoutStyle } from './PrivateLayout.style';

const PrivateLayout: FC<LayoutPageInterface> = (props) => {
	const { Component } = props;
	const classes = PrivateLayoutStyle();

	const general = useSelector(generalSelector);

	return (
		<Box component="main">
			{/* Drawer */}
			<Drawer />

			{/* Content */}
			<Box
				className={clsx({
					[classes.sContentOpen]: general.openDrawer,
					[classes.sContentClose]: !general.openDrawer
				})}>
				<Suspense fallback={<Loader loader={LoaderTypeEnum.FALLBACK_LOADER} />}>
					<Component />
				</Suspense>
			</Box>
		</Box>
	);
};
export default PrivateLayout;
