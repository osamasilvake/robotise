import { Box, Grid, Typography } from '@mui/material';
import i18next from 'i18next';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { performanceSelector } from '../../../../../../../slices/business/sites/performance/Performance.slice';
import { sitesSelector } from '../../../../../../../slices/business/sites/Sites.slice';
import { currencyFormat } from '../../../../../../../utilities/methods/Number';
import { SiteParamsInterface } from '../../../../Site.interface';
import { SitePerformanceKPIStyle } from '../SitePerformanceKPI.style';
import SitePerformanceKPICard from '../SitePerformanceKPICard';

const SitePerformanceKPIPurchases: FC = () => {
	const { t } = useTranslation('SITES');
	const classes = SitePerformanceKPIStyle();

	const sites = useSelector(sitesSelector);
	const performance = useSelector(performanceSelector);

	const [sumTotal, setSumTotal] = useState(0);
	const [avgTotal, setAvgTotal] = useState(0);
	const [avgSumTotal, setAvgSumTotal] = useState(0);
	const [avgTotalQuantity, setAvgTotalQuantity] = useState(0);

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;

	const cSiteId = params.siteId;
	const siteSingle = sites.content?.dataById[cSiteId];
	const translation = 'CONTENT.PERFORMANCE.BOXES.PURCHASES';

	useEffect(() => {
		const single = performance?.content?.purchases?.statistics?.single;
		setSumTotal(single?.sumTotalPrice || 0);
		setAvgTotal(single?.avgTotalPrice || 0);
		setAvgSumTotal(single?.avgSumTotalPricePerPeriod || 0);
		setAvgTotalQuantity(single?.avgTotalQuantity || 0);
	}, [performance?.content?.purchases]);

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
						title={t(`${translation}.SUM`)}
						value={currencyFormat(sumTotal, siteSingle?.currency, i18next.language)}
						icon="functions"
					/>
				</Grid>

				<Grid item xs={12} sm={12} md={6} lg={3}>
					<SitePerformanceKPICard
						title={t(`${translation}.AVG_REVENUE_PER_PERIOD`)}
						value={currencyFormat(avgSumTotal, siteSingle?.currency, i18next.language)}
						icon="hide_source"
						rotateIcon
					/>
				</Grid>

				<Grid item xs={12} sm={12} md={6} lg={3}>
					<SitePerformanceKPICard
						title={t(`${translation}.AVG`)}
						value={currencyFormat(avgTotal, siteSingle?.currency, i18next.language)}
						icon="hide_source"
						rotateIcon
					/>
				</Grid>

				<Grid item xs={12} sm={12} md={6} lg={3}>
					<SitePerformanceKPICard
						title={t(`${translation}.AVG_TOTAL_QUANTITY`)}
						value={avgTotalQuantity}
						icon="hide_source"
						rotateIcon
					/>
				</Grid>
			</Grid>
		</Box>
	) : null;
};
export default SitePerformanceKPIPurchases;
