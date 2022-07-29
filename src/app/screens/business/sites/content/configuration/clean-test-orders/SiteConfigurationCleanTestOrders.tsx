import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { sitesSelector } from '../../../../../../slices/business/sites/Sites.slice';
import { dateFormat1 } from '../../../../../../utilities/methods/Date';
import { SiteParamsInterface } from '../../../Site.interface';
import DialogCleanTestOrders from './DialogCleanTestOrders';
import { SiteConfigurationCleanTestOrdersActionTypeEnum } from './SiteConfigurationCleanTestOrders.enum';
import { SiteConfigurationCleanTestOrdersStyle } from './SiteConfigurationCleanTestOrders.style';

const SiteConfigurationCleanTestOrders: FC = () => {
	const { t } = useTranslation('SITES');
	const classes = SiteConfigurationCleanTestOrdersStyle();

	const sites = useSelector(sitesSelector);

	const [open, setOpen] = useState(false);

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;
	const cSiteId = params.siteId;
	const siteSingle = sites.content?.dataById[cSiteId];
	const cleanAfterDeployment =
		SiteConfigurationCleanTestOrdersActionTypeEnum.CLEAN_AFTER_DEPLOYMENT;
	const cleanedOnce = siteSingle?.actions.find((e) => e.action === cleanAfterDeployment);
	const translation = 'CONTENT.CONFIGURATION.CLEAN_TEST_ORDERS';

	return (
		<Box>
			<Card square elevation={1}>
				<CardContent>
					<Typography variant="h6">{t(`${translation}.TITLE`)}</Typography>
					<Typography variant="body2" color="textSecondary">
						{t(`${translation}.EXCERPT`)}
					</Typography>

					<Button
						color="error"
						variant="outlined"
						className={classes.sButton}
						onClick={() => setOpen(true)}
						disabled={!!cleanedOnce}>
						{t(`${translation}.BUTTONS.CLEAN`)}
					</Button>

					{!!cleanedOnce && (
						<Typography
							variant="body2"
							color="textSecondary"
							className={classes.sUpdated}>
							{dateFormat1(cleanedOnce.createdAt)}
						</Typography>
					)}
				</CardContent>
			</Card>

			{/* Dialog: Clean Test Orders */}
			{open && <DialogCleanTestOrders open={open} setOpen={setOpen} />}
		</Box>
	);
};
export default SiteConfigurationCleanTestOrders;
