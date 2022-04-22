import { OpenInNew } from '@mui/icons-material';
import { Chip, CircularProgress, IconButton } from '@mui/material';
import { FC, MouseEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../../slices';
import {
	DeepLinkAlertLogsLinkFetch,
	DeepLinkAuditLogsLinkFetch,
	DeepLinkBatteryLinkFetch,
	DeepLinkCoolingUnitLinkFetch,
	DeepLinkDiagnosticsLogsLinkFetch,
	DeepLinkElevatorLogsLinkFetch,
	DeepLinkItemTrackingLinkFetch,
	DeepLinkTemperatureLinkFetch
} from '../../../slices/settings/deep-links/DeepLink.slice';
import { ExternalLinkActionTypeEnum, ExternalLinkTypeEnum } from './ExternalLink.enum';
import { ExternalLinkInterface } from './ExternalLink.interface';

const ExternalLink: FC<ExternalLinkInterface> = (props) => {
	const {
		index,
		type = ExternalLinkTypeEnum.CHIP,
		actionType,
		text,
		payload,
		showIcon,
		disabled
	} = props;

	const dispatch = useDispatch<AppDispatch>();

	const [trackingIndex, setTrackingIndex] = useState(-1);

	const actionsList = {
		[ExternalLinkActionTypeEnum.AUDIT_LOGS]: DeepLinkAuditLogsLinkFetch,
		[ExternalLinkActionTypeEnum.ALERT_LOGS]: DeepLinkAlertLogsLinkFetch,
		[ExternalLinkActionTypeEnum.BATTERY]: DeepLinkBatteryLinkFetch,
		[ExternalLinkActionTypeEnum.COOLING_UNIT]: DeepLinkCoolingUnitLinkFetch,
		[ExternalLinkActionTypeEnum.DIAGNOSTICS_LOGS]: DeepLinkDiagnosticsLogsLinkFetch,
		[ExternalLinkActionTypeEnum.ELEVATOR_LOGS]: DeepLinkElevatorLogsLinkFetch,
		[ExternalLinkActionTypeEnum.ITEM_TRACKING]: DeepLinkItemTrackingLinkFetch,
		[ExternalLinkActionTypeEnum.TEMPERATURE]: DeepLinkTemperatureLinkFetch
	};

	/**
	 * handle external link
	 * @param event
	 * @returns
	 */
	const handleExternalLink = (event: MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
		// stop propagation
		event.stopPropagation();

		// set tracking index
		setTrackingIndex(index || -1);

		// dispatch: fetch link
		dispatch(
			actionsList[actionType](payload, (res) => {
				res.data && window.open(res.data.dlink);

				// reset tracking index
				setTrackingIndex(-1);
			})
		);
	};

	return (
		<>
			{type === ExternalLinkTypeEnum.CHIP && (
				<Chip
					size="small"
					label={text}
					color="primary"
					variant="outlined"
					clickable
					icon={
						showIcon && (!index || (index && index === trackingIndex)) ? (
							<CircularProgress size={18} />
						) : (
							<OpenInNew />
						)
					}
					disabled={disabled}
					onClick={handleExternalLink}
				/>
			)}
			{type === ExternalLinkTypeEnum.ICON && (
				<IconButton
					color="primary"
					size="small"
					disabled={disabled}
					onClick={(e) => handleExternalLink(e)}>
					{showIcon && (!index || (index && index === trackingIndex)) ? (
						<CircularProgress size={20} />
					) : (
						<>
							<OpenInNew />
						</>
					)}
				</IconButton>
			)}
		</>
	);
};
export default ExternalLink;
