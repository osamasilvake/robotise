import { Avatar, Box, Card, CardContent, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { AppConfigService } from '../../../../services';
import { generalSelector } from '../../../../slices/general/General.slice';
import { GeneralThemePaletteTypeEnum } from '../../../../slices/general/General.slice.enum';
import { CardStyles } from '../../../../utilities/styles/Card.style';
import Tooltip from '../../../common/tooltip/Tooltip';
import { QRCodeStyles } from './QRCode.style';

const QRCode: FC = () => {
	const { t } = useTranslation('TOOLTIPS');

	const cardClasses = CardStyles();
	const qrCodeClasses = QRCodeStyles();

	const general = useSelector(generalSelector);

	return (
		<Tooltip
			hideOnMobile
			title={
				<Card square elevation={1}>
					<CardContent className={cardClasses.sCardContent3}>
						<Box>
							<Typography variant="caption" color="textSecondary">
								{String(t('QR_CODE'))}
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
					</CardContent>
				</Card>
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
