import { Box, Grid } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../../../../../../slices';
import { SPContentInterface } from '../../../../../../../slices/business/robots/purchases/Purchases.slice.interface';
import {
	PerformanceFetchPurchases,
	performanceSelector
} from '../../../../../../../slices/business/sites/performance/Performance.slice';
import SitePerformanceKPIPurchaseCard from './SitePerformanceKPIPurchaseCard';

const SitePerformanceKPIPurchases: FC = () => {
	const dispatch = useDispatch<AppDispatch>();

	const performance = useSelector(performanceSelector);

	const [sum, setSum] = useState(0);
	const [avg, setAvg] = useState(0);

	useEffect(() => {
		// dispatch: fetch purchases
		dispatch(PerformanceFetchPurchases({ from: 7 })).then(
			(res: SPContentInterface | undefined | null) => {
				if (!res) return;

				// total
				const total = +res?.data.length || 0;

				// sum
				const sum = res?.data.reduce((acc, obj) => acc + +obj.totalPrice, 0);
				setSum(+sum?.toFixed(2));

				// avg
				const avg = sum / total;
				setAvg(+avg?.toFixed(2));
			}
		);
	}, [dispatch]);

	return performance.purchases?.content ? (
		<Box>
			<Grid container spacing={1}>
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<SitePerformanceKPIPurchaseCard title="Sum" value={sum} icon="functions" />
				</Grid>

				<Grid item xs={12} sm={6} md={4} lg={3}>
					<SitePerformanceKPIPurchaseCard title="Avg" value={avg} icon="functions" />
				</Grid>
			</Grid>
		</Box>
	) : null;
};
export default SitePerformanceKPIPurchases;
