import { Avatar, Box, Paper, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { AppConfigService } from '../../../../services';
import { generalSelector } from '../../../../slices/general/General.slice';
import { GeneralThemePaletteTypeEnum } from '../../../../slices/general/General.slice.enum';
import Tooltip from '../../../common/tooltip/Tooltip';
import { QRCodeStyles } from './QRCode.style';

const QRCode: FC = () => {
	const { t } = useTranslation('TOOLTIPS');
	const qrCodeClasses = QRCodeStyles();

	const general = useSelector(generalSelector);

	return (
		<Tooltip
			hideOnMobile
			title={
				<Paper square elevation={2}>
					<Box className={qrCodeClasses.sQRCodeTooltip}>
						<Typography variant="caption" color="textSecondary">
							{String(t('TOOLTIPS:QR_CODE'))}
						</Typography>
						<Avatar
							variant="square"
							src={
								general.themePalette === GeneralThemePaletteTypeEnum.DARK
									? AppConfigService.AppImageURLs.qrCode.path.dark
									: AppConfigService.AppImageURLs.qrCode.path.light
							}
							alt={AppConfigService.AppImageURLs.qrCode.name}
							className={qrCodeClasses.sQRCodeAvatarTooltip}
						/>
					</Box>
				</Paper>
			}>
			<Avatar
				variant="square"
				src={
					general.themePalette === GeneralThemePaletteTypeEnum.DARK
						? AppConfigService.AppImageURLs.qrCode.path.dark
						: AppConfigService.AppImageURLs.qrCode.path.light
				}
				alt={AppConfigService.AppImageURLs.qrCode.name}
				className={qrCodeClasses.sQRCodeAvatar}
			/>
		</Tooltip>
	);
};
export default QRCode;
