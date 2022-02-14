import { AddCircle } from '@mui/icons-material';
import { Box, Card, CardContent, IconButton, List, Tooltip, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppConfigService } from '../../../../../../services';
import { ServicePositionsFetchList } from '../../../../../../slices/business/sites/configuration/ServicePositions.slice';
import { CardStyle } from '../../../../../../utilities/styles/Card.style';
import { SiteParamsInterface } from '../../../Site.interface';
import DialogCreateEditServicePosition from './DialogCreateEditServicePosition';
import SiteServicePosition from './SiteServicePosition';
import { SiteServicePositionsCreateEditTypeEnum } from './SiteServicePositions.enum';
import { SiteServicePositionsInterface } from './SiteServicePositions.interface';
import { SiteServicePositionsStyle } from './SiteServicePositions.style';

const SiteServicePositions: FC<SiteServicePositionsInterface> = (props) => {
	const { servicePositions } = props;
	const { t } = useTranslation(['SITES', 'TOOLTIP']);
	const classes = SiteServicePositionsStyle();
	const cardClasses = CardStyle();

	const dispatch = useDispatch();

	const [open, setOpen] = useState(false);

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;
	const cSiteId = params.siteId;

	const translation = 'CONTENT.CONFIGURATION.SERVICE_POSITIONS';

	useEffect(() => {
		const executeServices = () => {
			if (cSiteId) {
				// dispatch: fetch service positions
				dispatch(ServicePositionsFetchList(cSiteId, true));
			}
		};

		// interval
		const intervalId = window.setInterval(
			executeServices,
			AppConfigService.AppOptions.screens.business.sites.content.configuration
				.servicePositions.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [dispatch, cSiteId]);

	return (
		<Card square elevation={1} className={classes.sCard}>
			<CardContent className={cardClasses.sCardContent0}>
				<Typography variant="h6" className={classes.sTitle}>
					{t(`${translation}.TITLE`)}
				</Typography>
				<Typography variant="body2" color="textSecondary" className={classes.sExcerpt}>
					{t(`${translation}.EXCERPT`)}
				</Typography>

				<Box className={classes.sCreate}>
					<Tooltip
						placement="left"
						title={t<string>('TOOLTIP:SERVICE_POSITIONS.ADD')}
						onClick={() => setOpen(true)}>
						<IconButton edge="end">
							<AddCircle color="primary" />
						</IconButton>
					</Tooltip>
					{open && (
						<DialogCreateEditServicePosition
							type={SiteServicePositionsCreateEditTypeEnum.CREATE}
							open={open}
							setOpen={setOpen}
						/>
					)}
				</Box>

				{!!servicePositions.content?.data.length && (
					<List disablePadding>
						{servicePositions.content.data.map((servicePosition, index) => (
							<SiteServicePosition
								key={servicePosition.id}
								servicePosition={servicePosition}
								index={index}
							/>
						))}
					</List>
				)}
			</CardContent>
		</Card>
	);
};
export default SiteServicePositions;
