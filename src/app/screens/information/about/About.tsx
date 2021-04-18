import { Box, CardMedia, Divider, Grid, Link, Paper, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import PageHead from '../../../components/content/page-head/PageHead';
import { AppConfigService } from '../../../services';
import { AboutStyles } from './About.style';

const About: FC = () => {
	const { t } = useTranslation('ABOUT');
	const classes = AboutStyles();

	return (
		<Paper elevation={12} component="section" square>
			{/* Page Head */}
			<PageHead title="ABOUT.TITLE" description="ABOUT.DESCRIPTION" />

			{/* Content */}
			<Grid container>
				<Grid item xs={12} md={6}>
					<Typography variant="h6">{AppConfigService.envAuthor}</Typography>
					<Typography variant="body1">{t('INFO.ADDRESS')}</Typography>
					<Typography variant="body1">{t('INFO.POSTAL_CITY')}</Typography>
					<Typography variant="body1">{t('INFO.OWNER')}</Typography>
					<br />
					<Typography variant="h6">{t('INFO.CONTACT.TITLE')}</Typography>
					<Typography variant="body1">
						{t('INFO.CONTACT.TEL.LABEL')}:{' '}
						<Link href={`tel:${t('INFO.CONTACT.TEL.VALUE')}`}>
							{t('INFO.CONTACT.TEL.VALUE')}
						</Link>
					</Typography>
					<Typography variant="body1">
						{t('INFO.CONTACT.EMAIL.LABEL')}:{' '}
						<Link href={`mailto:${t('INFO.CONTACT.EMAIL.VALUE')}`}>
							{t('INFO.CONTACT.EMAIL.VALUE')}
						</Link>
					</Typography>
					<br />
					<Typography variant="h6">{t('INFO.REGISTRY.TITLE')}</Typography>
					<Typography variant="body1">
						{t('INFO.REGISTRY.COURT.LABEL')}: {t('INFO.REGISTRY.COURT.VALUE')}
					</Typography>
					<Typography variant="body1">
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
				<Typography variant="body1">{t('SERVICES.JEEVES.DESCRIPTION')}</Typography>
				<br />
				<Typography variant="h6">{t('SERVICES.RB_130.TITLE')}</Typography>
				<Typography variant="body1">{t('SERVICES.RB_130.DESCRIPTION')}</Typography>
				<br />
				<Typography variant="h6">{t('SERVICES.SAFETY_MEASURES.TITLE')}</Typography>
				<Typography variant="body1">{t('SERVICES.SAFETY_MEASURES.DESCRIPTION')}</Typography>
				<br />
				<Typography variant="h6">{t('SERVICES.ELEVATOR.TITLE')}</Typography>
				<Typography variant="body1">{t('SERVICES.ELEVATOR.DESCRIPTION')}</Typography>
			</Box>
		</Paper>
	);
};
export default About;
