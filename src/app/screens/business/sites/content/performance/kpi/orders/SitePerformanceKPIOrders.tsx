import { Box, Grid, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { performanceSelector } from '../../../../../../../slices/business/sites/performance/Performance.slice';
import { SitePerformanceDemographyTypeEnum } from '../../demography/SitePerformanceDemography.enum';
import { SitePerformanceKPIStyle } from '../SitePerformanceKPI.style';
import SitePerformanceKPICard from '../SitePerformanceKPICard';

const SitePerformanceKPIOrders: FC = () => {
	const { t } = useTranslation('SITES');
	const classes = SitePerformanceKPIStyle();

	const performance = useSelector(performanceSelector);

	const [sumTotalMinibar, setSumTotalMinibar] = useState(0);
	const [sumTotalRoomService, setSumTotalRoomService] = useState(0);
	const [avgMinibar, setAvgMinibar] = useState(0);
	const [avgRoomService, setAvgRoomService] = useState(0);

	const translation = 'CONTENT.PERFORMANCE.BOXES.ORDERS';

	useEffect(() => {
		const tMinibar = SitePerformanceDemographyTypeEnum.MINI_BAR;
		const tRoomService = SitePerformanceDemographyTypeEnum.ROOM_SERVICE;

		const single = performance?.content?.orders?.statistics?.single;
		const minibars = single?.totalOrderModes.buckets.filter((m) => m.key === tMinibar);
		const roomService = single?.totalOrderModes.buckets.filter((m) => m.key === tRoomService);
		const avgMinibars = single?.avgOrderModes.buckets.filter((m) => m.key === tMinibar);
		const avgRoomService = single?.avgOrderModes.buckets.filter((m) => m.key === tRoomService);

		setSumTotalMinibar(minibars?.reduce((acc, { docCount }) => acc + docCount, 0) || 0);
		setSumTotalRoomService(roomService?.reduce((acc, { docCount }) => acc + docCount, 0) || 0);
		setAvgMinibar(avgMinibars?.reduce((acc, { docCount }) => acc + docCount, 0) || 0);
		setAvgRoomService(avgRoomService?.reduce((acc, { docCount }) => acc + docCount, 0) || 0);
	}, [performance?.content?.orders]);

	return performance?.content ? (
		<Box>
			{/* Title */}
			<Typography variant="h5" className={classes.sTitle}>
				{t(`${translation}.TITLE`)}
			</Typography>

			{/* Cards */}
			<Grid container spacing={1}>
				<Grid item xs={12} sm={12} md={6} lg={3}>
					<SitePerformanceKPICard
						title={t(`${translation}.TOTAL_MINIBAR_ORDERS`)}
						value={sumTotalMinibar}
						icon="functions"
					/>
				</Grid>

				<Grid item xs={12} sm={12} md={6} lg={3}>
					<SitePerformanceKPICard
						title={t(`${translation}.TOTAL_ROOM_SERVICE_ORDERS`)}
						value={sumTotalRoomService}
						icon="functions"
					/>
				</Grid>

				<Grid item xs={12} sm={12} md={6} lg={3}>
					<SitePerformanceKPICard
						title={t(`${translation}.AVG_MINIBAR_ORDERS`)}
						value={avgMinibar}
						icon="hide_source"
						rotateIcon
					/>
				</Grid>

				<Grid item xs={12} sm={12} md={6} lg={3}>
					<SitePerformanceKPICard
						title={t(`${translation}.AVG_ROOM_SERVICE_ORDERS`)}
						value={avgRoomService}
						icon="hide_source"
						rotateIcon
					/>
				</Grid>
			</Grid>
		</Box>
	) : null;
};
export default SitePerformanceKPIOrders;
