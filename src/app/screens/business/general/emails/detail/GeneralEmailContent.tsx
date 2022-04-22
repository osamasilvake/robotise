import { CopyAll } from '@mui/icons-material';
import {
	Alert,
	AlertTitle,
	Box,
	Card,
	CardContent,
	Divider,
	IconButton,
	Link,
	Stack,
	Tooltip,
	Typography
} from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { TriggerMessageTypeEnum } from '../../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../../components/frame/message/Message.interface';
import { AppDispatch } from '../../../../../slices';
import { AppTriggerMessage } from '../../../../../slices/app/App.slice';
import { dateFormat1 } from '../../../../../utilities/methods/Date';
import { strToLinks } from '../../../../../utilities/methods/String';
import { GeneralEmailsTableColumnHistoryEventTypeEnum } from '../list/table/GeneralEmailsTable.enum';
import { GeneralEmailDetailContentInterface } from './GeneralEmailDetail.interface';
import { GeneralEmailsTableStyle } from './GeneralEmailDetail.style';

const GeneralEmailContent: FC<GeneralEmailDetailContentInterface> = (props) => {
	const { email } = props;
	const { t } = useTranslation('GENERAL');
	const classes = GeneralEmailsTableStyle();

	const dispatch = useDispatch<AppDispatch>();

	const translation = 'CONTENT.EMAILS.DETAIL';
	const history = email.history && email.history[email.history.length - 1];
	const content = email.content && strToLinks(email.content);

	/**
	 * copy to clipboard
	 * @param code
	 * @param text
	 * @returns
	 */
	const handleCopyToClipboard = (code: string, text: string) => () => {
		// copy message
		navigator.clipboard.writeText(text);

		// dispatch: trigger message
		const message: TriggerMessageInterface = {
			id: code,
			show: true,
			severity: TriggerMessageTypeEnum.SUCCESS,
			text: 'GENERAL.COMMON.COPY_TO_CLIPBOARD'
		};
		dispatch(AppTriggerMessage(message));
	};

	return (
		<Box>
			{/* Error */}
			{email.status === GeneralEmailsTableColumnHistoryEventTypeEnum.BOUNCE && history && (
				<Alert
					severity="error"
					action={
						<Tooltip title={t<string>(`${translation}.COPY`)}>
							<IconButton
								color="error"
								onClick={handleCopyToClipboard(email.id, history.reason)}>
								<CopyAll fontSize="small" />
							</IconButton>
						</Tooltip>
					}
					className={classes.sError}>
					<AlertTitle>{history.event.toUpperCase()}</AlertTitle>
					{history.reason}
				</Alert>
			)}

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
					{dateFormat1(email.createdAt)}
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
