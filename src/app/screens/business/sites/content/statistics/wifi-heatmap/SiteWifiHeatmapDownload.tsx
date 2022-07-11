import { Button } from '@mui/material';
import domtoimage from 'dom-to-image';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { SiteWifiHeatmapDownloadInterface } from './SiteWifiHeatmap.interface';
import { SiteWifiHeatmapStyle } from './SiteWifiHeatmap.style';

const SiteWifiHeatmapDownload: FC<SiteWifiHeatmapDownloadInterface> = (props) => {
	const { siteName, floor } = props;
	const { t } = useTranslation('SITES');
	const classes = SiteWifiHeatmapStyle();

	const translation = 'CONTENT.STATISTICS.WIFI_HEATMAP';

	/**
	 * download map
	 */
	const downloadMap = async () => {
		const elem = document.querySelector('#wifi-map') as HTMLElement;
		domtoimage.toPng(elem).then((dataUrl: string) => {
			const link = document.createElement('a');
			link.download = `Wifi_Map_${siteName?.replace(/\s/g, '_')}_${floor}.png`;
			link.href = dataUrl;
			link.click();
		});
	};

	return (
		<Button variant="outlined" onClick={downloadMap} className={classes.sDownload}>
			{t(`${translation}.DOWNLOAD`)}
		</Button>
	);
};
export default SiteWifiHeatmapDownload;
