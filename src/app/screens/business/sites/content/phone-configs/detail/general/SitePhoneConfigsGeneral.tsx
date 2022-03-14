import { Edit, InfoOutlined } from '@mui/icons-material';
import { Box, Grid, IconButton, Link, Stack, Tooltip, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AppConfigService } from '../../../../../../../services';
import DialogEditPhoneConfig from './DialogEditPhoneConfig';
import { SitePhoneConfigsGeneralInterface } from './SitePhoneConfigsGeneral.interface';
import { mapPhoneConfig } from './SitePhoneConfigsGeneral.map';
import { SitePhoneConfigsGeneralStyle } from './SitePhoneConfigsGeneral.style';

const SitePhoneConfigsGeneral: FC<SitePhoneConfigsGeneralInterface> = (props) => {
	const { content } = props;
	const { t } = useTranslation(['SITES', 'GENERAL']);
	const classes = SitePhoneConfigsGeneralStyle();

	const [editConfig, setEditConfig] = useState(false);

	const item = content?.data && mapPhoneConfig(content.data[0]);
	const translation = 'CONTENT.PHONE_CONFIGS.DETAIL.GENERAL';

	return item ? (
		<Box className={classes.sGeneral}>
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
					<Typography>
						{item.prefixes || AppConfigService.AppOptions.common.none}
					</Typography>
				</Grid>

				{/* From */}
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<Typography variant="caption" color="textSecondary">
						{t(`${translation}.FROM`)}
					</Typography>
					<Box>
						{item.from ? (
							<Link underline="hover" href={`tel:${item.from}`}>
								{item.from}
							</Link>
						) : (
							AppConfigService.AppOptions.common.none
						)}
					</Box>
				</Grid>

				{/* Workflow */}
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<Typography variant="caption" color="textSecondary">
						{t(`${translation}.WORKFLOW.LABEL`)}
					</Typography>
					<Stack spacing={0.5} direction="row">
						<Typography>
							{t(`${translation}.WORKFLOW.ITEMS.${item.workflow}`)}
						</Typography>
						<Tooltip
							title={t<string>(`${translation}.WORKFLOW.NOTES.${item.workflow}`)}>
							<InfoOutlined fontSize="small" className={classes.sWorkflowInfoIcon} />
						</Tooltip>
					</Stack>
				</Grid>

				{/* Rooms Mapping */}
				{item.roomsMapping && (
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<Typography variant="caption" color="textSecondary">
							{t(`${translation}.ROOMS_MAPPING`)}
						</Typography>
						{item.roomsMapping.map((room) => (
							<Box key={room.key}>
								<Typography>
									{room.key}:{room.value}
								</Typography>
							</Box>
						))}
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
			</Grid>

			{/* Edit Config */}
			<Box className={classes.sEdit}>
				<IconButton color="primary" onClick={() => setEditConfig(true)}>
					<Edit fontSize="small" />
				</IconButton>

				{/* Dialog: Edit Config */}
				{editConfig && (
					<DialogEditPhoneConfig
						open={editConfig}
						setOpen={setEditConfig}
						phoneConfig={content.data[0]}
					/>
				)}
			</Box>
		</Box>
	) : null;
};
export default SitePhoneConfigsGeneral;
