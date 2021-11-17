import { Box, Card, CardContent, Divider, Link, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { momentFormat1 } from '../../../../../utilities/methods/Moment';
import { strToLinks } from '../../../../../utilities/methods/String';
import { GeneralEmailDetailContentInterface } from './GeneralEmailDetail.interface';
import { GeneralEmailsTableStyle } from './GeneralEmailDetail.style';

const GeneralEmailContent: FC<GeneralEmailDetailContentInterface> = (props) => {
	const { email } = props;
	const { t } = useTranslation('GENERAL');
	const classes = GeneralEmailsTableStyle();

	const translation = 'EMAILS.DETAIL';

	const content = email.content && strToLinks(email.content);

	return (
		<Box>
			{/* Subject */}
			<Typography variant="h5">{email.subject}</Typography>

			<Box className={classes.sBlock1}>
				{/* From */}
				<Stack direction="row" spacing={0.5} alignItems="center" className={classes.sFrom}>
					<Typography>{email.from.name}</Typography>
					<Link
						variant="body2"
						underline="hover"
						href={`mailto:${email.from.email}`}
						target="_blank">
						{`<${email.from.email}>`}
					</Link>
				</Stack>

				{/* Created */}
				<Typography variant="caption" color="textSecondary">
					{momentFormat1(email.createdAt)}
				</Typography>
			</Box>

			<Box className={classes.sBlock2}>
				<Stack direction="row" spacing={0.5} alignItems="center">
					{/* To */}
					<Typography variant="body2">{t(`${translation}.TO`)}: </Typography>

					{/* Recipient */}
					<Link
						variant="body2"
						underline="hover"
						href={`mailto:${email.recipient}`}
						target="_blank">
						{email.recipient}
					</Link>
				</Stack>
			</Box>

			<Divider />

			{/* Content */}
			<Card square elevation={0}>
				<CardContent>
					<Typography
						variant="body2"
						dangerouslySetInnerHTML={{ __html: content }}
						className={classes.sContent}
					/>
				</CardContent>
			</Card>

			<Divider />
		</Box>
	);
};
export default GeneralEmailContent;
