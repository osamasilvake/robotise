import { Box, Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import ReadMore from '../../../../../../../components/common/read-more/ReadMore';
import { AppConfigService } from '../../../../../../../services';
import { SitePhoneConfigsGeneralInterface } from './SitePhoneConfigsGeneral.interface';
import { mapPhoneConfig } from './SitePhoneConfigsGeneral.map';

const SitePhoneConfigsGeneral: FC<SitePhoneConfigsGeneralInterface> = (props) => {
	const { content } = props;
	const { t } = useTranslation(['SITES', 'GENERAL']);

	const item = content?.data && mapPhoneConfig(content.data[0]);
	const translation = 'CONTENT.PHONE_CONFIGS.DETAIL.GENERAL';

	const roomsMapping = item?.roomsMapping?.map((ob) => `${ob.key}:${ob.value}`).join(' ') || '';

	return item ? (
		<Grid container spacing={1}>
			{/* Mode */}
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<Typography variant="caption" color="textSecondary">
					{t(`${translation}.MODE`)}
				</Typography>
				<Typography>{t(`GENERAL:COMMON.MODE.${item.mode}`)}</Typography>
			</Grid>

			{/* Prefixes */}
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<Typography variant="caption" color="textSecondary">
					{t(`${translation}.PREFIXES`)}
				</Typography>
				<Typography>{item.prefixes || AppConfigService.AppOptions.common.none}</Typography>
			</Grid>

			{/* From */}
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<Typography variant="caption" color="textSecondary">
					{t(`${translation}.FROM`)}
				</Typography>
				<Box>{item.from || AppConfigService.AppOptions.common.none}</Box>
			</Grid>

			{/* Callback Retries */}
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<Typography variant="caption" color="textSecondary">
					{t(`${translation}.CALLBACK_RETRIES`)}
				</Typography>
				<Box>{item.callbackRetries || 0}</Box>
			</Grid>

			{/* Rooms Mapping */}
			{item.roomsMapping && (
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<Typography variant="caption" color="textSecondary">
						{t(`${translation}.ROOMS_MAPPING`)}
					</Typography>
					{item.roomsMapping.length > 12 ? (
						<ReadMore text={roomsMapping} />
					) : (
						<Typography>{roomsMapping}</Typography>
					)}
				</Grid>
			)}

			{/* Disable Rooms Callback */}
			{item.disableRoomsCallback && (
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<Typography variant="caption" color="textSecondary">
						{t(`${translation}.DISABLE_ROOMS_CALLBACK`)}
					</Typography>
					<Typography>{item.disableRoomsCallback}</Typography>
				</Grid>
			)}

			{/* SMS Gateway */}
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<Typography variant="caption" color="textSecondary">
					{t(`${translation}.SMS_GATEWAY`)}
				</Typography>
				<Box>{item.smsGateway || AppConfigService.AppOptions.common.none}</Box>
			</Grid>

			{/* Outbound Pattern */}
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<Typography variant="caption" color="textSecondary">
					{t(`${translation}.SIP_CONFIG.OUTBOUND_PATTERN`)}
				</Typography>
				<Box>{item.sip?.outboundPattern || AppConfigService.AppOptions.common.none}</Box>
			</Grid>
		</Grid>
	) : null;
};
export default SitePhoneConfigsGeneral;
