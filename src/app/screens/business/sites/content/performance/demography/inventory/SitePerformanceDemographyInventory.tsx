import { InfoOutlined } from '@mui/icons-material';
import { Box, Grid, List, ListItem, Stack, Tooltip, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { AppConfigService } from '../../../../../../../services';
import StackedAreaReChart from '../../../../../../../utilities/charts/stacked-area-chart/StackedAreaChart';
import { SitePerformanceDemographyOrdersTooltipTypeEnum } from '../SitePerformanceDemography.enum';
import { SitePerformanceDemographyStyle } from '../SitePerformanceDemography.style';
import { SitePerformanceDemographyInventoryInterface } from './SitePerformanceDemographyInventory.interface';

const SitePerformanceDemographyInventory: FC<SitePerformanceDemographyInventoryInterface> = (
	props
) => {
	const { currentPeriod, chart } = props;
	const { t } = useTranslation('SITES');
	const classes = SitePerformanceDemographyStyle();

	const translation = 'CONTENT.PERFORMANCE';
	const tooltips = {
		label: t(`${translation}.DEMOGRAPHY.INVENTORY.TOOLTIP.LABEL`),
		list: [
			{
				key: SitePerformanceDemographyOrdersTooltipTypeEnum.FULL,
				label: t(`${translation}.DEMOGRAPHY.INVENTORY.TOOLTIP.TYPES.FULL`)
			},
			{
				key: SitePerformanceDemographyOrdersTooltipTypeEnum.LOW,
				label: t(`${translation}.DEMOGRAPHY.INVENTORY.TOOLTIP.TYPES.LOW`)
			},
			{
				key: SitePerformanceDemographyOrdersTooltipTypeEnum.EMPTY,
				label: t(`${translation}.DEMOGRAPHY.INVENTORY.TOOLTIP.TYPES.EMPTY`)
			}
		]
	};

	/**
	 * tooltip inventory colors
	 * @param type
	 * @returns
	 */
	const tooltipInventoryColors = (type: SitePerformanceDemographyOrdersTooltipTypeEnum) => {
		if (type === SitePerformanceDemographyOrdersTooltipTypeEnum.FULL) {
			return AppConfigService.AppOptions.colors.c10v1;
		} else if (type === SitePerformanceDemographyOrdersTooltipTypeEnum.LOW) {
			return AppConfigService.AppOptions.colors.c11;
		}
		return AppConfigService.AppOptions.colors.c12;
	};

	return (
		<Grid item xs={12} sm={12} md={6}>
			{/* Title */}
			<Stack
				spacing={0.5}
				direction="row"
				alignItems="center"
				className={classes.sTitleLabel}>
				{/* Label */}
				<Typography variant="h5">
					{t(`${translation}.DEMOGRAPHY.INVENTORY.LABEL`)}
				</Typography>

				{/* Tooltip */}
				<Tooltip
					title={
						<Box>
							<Box className={classes.sTooltipLabel}>{tooltips.label}</Box>
							<List disablePadding className={classes.sTooltipInventoryList}>
								{tooltips.list.map((item) => (
									<ListItem disablePadding key={item.key}>
										<Stack spacing={0} direction="row">
											<Box
												className={classes.sTooltipInventoryListItemKey}
												style={{
													color: tooltipInventoryColors(item.key)
												}}>
												{item.key}
											</Box>
											<Box className={classes.sTooltipInventoryListItemLabel}>
												{item.label}
											</Box>
										</Stack>
									</ListItem>
								))}
							</List>
						</Box>
					}>
					<InfoOutlined fontSize="small" />
				</Tooltip>
			</Stack>

			{/* Chart */}
			{chart && (
				<StackedAreaReChart
					currentPeriod={currentPeriod}
					data={chart}
					axisX={t(`${translation}.DEMOGRAPHY.INVENTORY.DATE`)}
					axisY1={t(`${translation}.DEMOGRAPHY.INVENTORY.STATUS.GREEN`)}
					axisY2={t(`${translation}.DEMOGRAPHY.INVENTORY.STATUS.YELLOW`)}
					axisY3={t(`${translation}.DEMOGRAPHY.INVENTORY.STATUS.RED`)}
					fills={[
						AppConfigService.AppOptions.colors.c10v1,
						AppConfigService.AppOptions.colors.c14,
						AppConfigService.AppOptions.colors.c12
					]}
				/>
			)}
		</Grid>
	);
};
export default SitePerformanceDemographyInventory;
