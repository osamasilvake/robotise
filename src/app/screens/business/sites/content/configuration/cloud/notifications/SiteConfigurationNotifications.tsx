import { AddCircle, KeyboardArrowDown, KeyboardArrowRight } from '@mui/icons-material';
import {
	Box,
	Card,
	CardContent,
	Collapse,
	IconButton,
	List,
	Stack,
	Tooltip,
	Typography
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppConfigService } from '../../../../../../../services';
import { AppDispatch } from '../../../../../../../slices';
import { NotificationTypesAndUsersFetchList } from '../../../../../../../slices/business/sites/configuration/notifications/Notifications.slice';
import { CardStyle } from '../../../../../../../utilities/styles/Card.style';
import { SiteParamsInterface } from '../../../../Site.interface';
import DialogCreateEditNotification from './DialogCreateEditNotification';
import SiteConfigurationNotification from './SiteConfigurationNotification';
import { SiteConfigurationNotificationsCreateEditTypeEnum } from './SiteConfigurationNotifications.enum';
import { SiteConfigurationNotificationsInterface } from './SiteConfigurationNotifications.interface';
import { SiteConfigurationNotificationsStyle } from './SiteConfigurationNotifications.style';

const SiteConfigurationNotifications: FC<SiteConfigurationNotificationsInterface> = (props) => {
	const { notifications } = props;
	const { t } = useTranslation(['SITES', 'TOOLTIP']);
	const classes = SiteConfigurationNotificationsStyle();
	const cardClasses = CardStyle();

	const dispatch = useDispatch<AppDispatch>();

	const [open, setOpen] = useState(false);
	const [collapse, setCollapse] = useState(false);

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;
	const cSiteId = params.siteId;

	const translation = 'CONTENT.CONFIGURATION.NOTIFICATIONS';

	useEffect(() => {
		const executeServices = () => {
			// dispatch: fetch site notification types and users
			cSiteId && dispatch(NotificationTypesAndUsersFetchList(cSiteId, true));
		};

		// interval
		const intervalId = window.setInterval(
			executeServices,
			AppConfigService.AppOptions.screens.business.sites.content.configuration.notifications
				.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [dispatch, cSiteId]);

	return (
		<Card square elevation={1} className={classes.sCard}>
			<CardContent className={cardClasses.sCardContent0}>
				<Box className={classes.sHeadBlock} onClick={() => setCollapse(!collapse)}>
					<Stack
						spacing={0.5}
						direction="row"
						alignItems="center"
						className={classes.sTitle}>
						<Typography variant="h6">{t(`${translation}.TITLE`)}</Typography>
						{!collapse && <KeyboardArrowRight color="primary" sx={{ fontSize: 18 }} />}
						{collapse && <KeyboardArrowDown color="success" sx={{ fontSize: 18 }} />}
					</Stack>
					<Typography variant="body2" color="textSecondary" className={classes.sExcerpt}>
						{t(`${translation}.EXCERPT`)}
					</Typography>
				</Box>

				<Box className={classes.sCreate}>
					<Tooltip
						placement="left"
						title={t<string>('TOOLTIP:NOTIFICATION.ADD')}
						onClick={() => setOpen(true)}>
						<IconButton edge="end">
							<AddCircle color="primary" />
						</IconButton>
					</Tooltip>
					{open && (
						<DialogCreateEditNotification
							type={SiteConfigurationNotificationsCreateEditTypeEnum.CREATE}
							open={open}
							setOpen={setOpen}
						/>
					)}
				</Box>

				<Collapse in={collapse}>
					{!!notifications.content?.data.length && (
						<List disablePadding>
							{notifications.content.data.map((notification, index) => (
								<SiteConfigurationNotification
									key={notification.id}
									notifications={notifications}
									notification={notification}
									index={index}
								/>
							))}
						</List>
					)}
				</Collapse>
			</CardContent>
		</Card>
	);
};
export default SiteConfigurationNotifications;
