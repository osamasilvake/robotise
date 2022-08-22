import { Box, Button } from '@mui/material';
import domtoimage from 'dom-to-image';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { SiteStatisticsWifiHeatmapDownloadInterface } from './SiteStatisticsWifiHeatmap.interface';
import { SiteStatisticsWifiHeatmapStyle } from './SiteStatisticsWifiHeatmap.style';

const SiteStatisticsWifiHeatmapScreenshot: FC<SiteStatisticsWifiHeatmapDownloadInterface> = (
	props
) => {
	const { siteName, floor } = props;
	const { t } = useTranslation('SITES');
	const classes = SiteStatisticsWifiHeatmapStyle();

	const translation = 'CONTENT.STATISTICS.WIFI_HEATMAP';

	/**
	 * download
	 */
	const download = async () => {
		const elem = document.querySelector('#wifi-map') as HTMLElement;
		domtoimage.toPng(elem).then((dataUrl: string) => {
			const link = document.createElement('a');
			link.download = `Wifi_Map_${siteName?.replace(/\s/g, '_')}_Floor_${floor}.png`;
			link.href = dataUrl;
			link.click();
		});
	};

	return (
		<Box className={classes.sScreenshot}>
			<Button variant="outlined" onClick={download}>
				{t(`${translation}.SCREENSHOT`)}
			</Button>
		</Box>
	);
};
export default SiteStatisticsWifiHeatmapScreenshot;
