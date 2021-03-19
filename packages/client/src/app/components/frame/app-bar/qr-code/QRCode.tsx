import { Avatar, Box, Paper, Tooltip, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { AppConfigService } from '../../../../services';
import { generalSelector } from '../../../../slices/general/General.slice';
import { GeneralThemePaletteTypeEnum } from '../../../../slices/general/General.slice.enum';
import { qrCodeStyles } from './QRCode.style';

const QRCode: FC = () => {
	const { t } = useTranslation('TOOLTIPS');
	const qrCodeClasses = qrCodeStyles();

	const { themePalette } = useSelector(generalSelector);

	return (
		<Tooltip
			classes={{
				tooltip: qrCodeClasses.sQRCode
			}}
			interactive
			className={qrCodeClasses.sQRCodeAvatar}
			title={
				<Paper square elevation={2}>
					<Box className={qrCodeClasses.sQRCodeTooltip}>
						<Typography variant="caption" color="textSecondary">
							{String(t('TOOLTIPS:QR_CODE'))}
						</Typography>
						<Avatar
							variant="square"
							src={
								themePalette === GeneralThemePaletteTypeEnum.DARK
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
					themePalette === GeneralThemePaletteTypeEnum.DARK
						? AppConfigService.AppImageURLs.qrCode.path.dark
						: AppConfigService.AppImageURLs.qrCode.path.light
				}
				alt={AppConfigService.AppImageURLs.qrCode.name}
			/>
		</Tooltip>
	);
};
export default QRCode;
