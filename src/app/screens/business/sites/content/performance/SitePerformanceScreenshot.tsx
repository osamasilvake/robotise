import { Box, Button } from '@mui/material';
import domtoimage from 'dom-to-image';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { AppConfigService } from '../../../../../services';
import { appSelector } from '../../../../../slices/app/App.slice';
import { AppThemePaletteTypeEnum } from '../../../../../slices/app/App.slice.enum';
import { SitePerformanceDownloadInterface } from './SitePerformance.interface';

const SitePerformanceScreenshot: FC<SitePerformanceDownloadInterface> = (props) => {
	const { siteName, currentPeriod } = props;
	const { t } = useTranslation('SITES');

	const app = useSelector(appSelector);

	const isDark = app.themePalette === AppThemePaletteTypeEnum.DARK;
	const translation = 'CONTENT.PERFORMANCE';

	/**
	 * download
	 */
	const download = async () => {
		const elem = document.querySelector('#performance') as HTMLElement;
		domtoimage
			.toPng(elem, {
				bgcolor: isDark
					? AppConfigService.AppOptions.colors.c1
					: AppConfigService.AppOptions.colors.c4
			})
			.then((dataUrl: string) => {
				const name = siteName?.replace(/\s/g, '_');
				const period = t(`${translation}.${currentPeriod}`).replace(/\s/g, '_');

				const link = document.createElement('a');
				link.download = `Performance_${name}_${period}.png`;
				link.href = dataUrl;
				link.click();
			});
	};

	return (
		<Box>
			<Button variant="outlined" onClick={download}>
				{t(`${translation}.SCREENSHOT`)}
			</Button>
		</Box>
	);
};
export default SitePerformanceScreenshot;
