import { Box, CardMedia, Divider, Grid, Link, Paper, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import PageHead from '../../../components/content/page-head/PageHead';
import { AppConfigService } from '../../../services';
import { AboutStyle } from './About.style';

const About: FC = () => {
	const { t } = useTranslation('ABOUT');
	const classes = AboutStyle();

	return (
		<Paper elevation={12} component="section" square>
			{/* Page Head */}
			<PageHead title="ABOUT.TITLE" description="ABOUT.DESCRIPTION" />

			{/* Content */}
			<Grid container>
				<Grid item xs={12} md={6}>
					<Typography variant="h6">{AppConfigService.envCompanyName}</Typography>
					<Typography>{t('INFO.ADDRESS')}</Typography>
					<Typography>{t('INFO.POSTAL_CITY')}</Typography>
					<Typography>{t('INFO.OWNER')}</Typography>
					<br />
					<Typography variant="h6">{t('INFO.SUPPORT.TITLE')}</Typography>
					<Stack direction="row" spacing={0.5}>
						<Typography>{t('INFO.SUPPORT.TEL.LABEL')}: </Typography>
						<Link underline="hover" href={`tel:${t('INFO.SUPPORT.TEL.PHONE')}`}>
							{t('INFO.SUPPORT.TEL.VALUE')}
						</Link>
					</Stack>
					<Stack direction="row" spacing={0.5}>
						<Typography>{t('INFO.SUPPORT.EMAIL.LABEL')}: </Typography>
						<Link underline="hover" href={`mailto:${t('INFO.SUPPORT.EMAIL.VALUE')}`}>
							{t('INFO.SUPPORT.EMAIL.VALUE')}
						</Link>
					</Stack>
					<br />
					<Typography variant="h6">{t('INFO.CONTACT.TITLE')}</Typography>
					<Stack direction="row" spacing={0.5}>
						<Typography>{t('INFO.CONTACT.TEL.LABEL')}: </Typography>
						<Link underline="hover" href={`tel:${t('INFO.CONTACT.TEL.PHONE')}`}>
							{t('INFO.CONTACT.TEL.VALUE')}
						</Link>
					</Stack>
					<Stack direction="row" spacing={0.5}>
						<Typography>{t('INFO.CONTACT.EMAIL.LABEL')}: </Typography>
						<Link underline="hover" href={`mailto:${t('INFO.CONTACT.EMAIL.VALUE')}`}>
							{t('INFO.CONTACT.EMAIL.VALUE')}
						</Link>
					</Stack>
					<br />
					<Typography variant="h6">{t('INFO.REGISTRY.TITLE')}</Typography>
					<Typography>
						{t('INFO.REGISTRY.COURT.LABEL')}: {t('INFO.REGISTRY.COURT.VALUE')}
					</Typography>
					<Typography>
						{t('INFO.REGISTRY.REG_NO.LABEL')}: {t('INFO.REGISTRY.REG_NO.VALUE')}
					</Typography>
				</Grid>
				<Grid item xs={12} md={6} className={classes.sMediaGrid}>
					<CardMedia
						className={classes.sMediaCard}
						component="iframe"
						src="https://player.vimeo.com/video/478088838?background=1&allow=autoplay"
					/>
				</Grid>
			</Grid>

			<br />
			<Divider light />
			<br />

			<Box>
				<Typography variant="h6">{t('SERVICES.JEEVES.TITLE')}</Typography>
				<Typography>{t('SERVICES.JEEVES.DESCRIPTION')}</Typography>
				<br />
				<Typography variant="h6">{t('SERVICES.RB_130.TITLE')}</Typography>
				<Typography>{t('SERVICES.RB_130.DESCRIPTION')}</Typography>
				<br />
				<Typography variant="h6">{t('SERVICES.SAFETY_MEASURES.TITLE')}</Typography>
				<Typography>{t('SERVICES.SAFETY_MEASURES.DESCRIPTION')}</Typography>
				<br />
				<Typography variant="h6">{t('SERVICES.ELEVATOR.TITLE')}</Typography>
				<Typography>{t('SERVICES.ELEVATOR.DESCRIPTION')}</Typography>
			</Box>
		</Paper>
	);
};
export default About;
