import {
	Box,
	Button,
	Card,
	CardContent,
	CircularProgress,
	FormControl,
	TextField,
	Typography
} from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppDispatch } from '../../../../../../../slices';
import {
	PhoneConfigEdit,
	PhoneConfigsFetch,
	phoneConfigsSelector
} from '../../../../../../../slices/business/sites/phone-configs/PhoneConfigs.slice';
import { useForm } from '../../../../../../../utilities/hooks/form/UseForm';
import { strCapitalLetterAndCamelCaseToDash } from '../../../../../../../utilities/methods/String';
import { SiteParamsInterface } from '../../../../Site.interface';
import { mapPhoneConfig } from '../general/SitePhoneConfigsGeneral.map';
import {
	SitePhoneConfigsSMSMessagesFormInterface,
	SitePhoneConfigsSMSMessagesInterface
} from './SitePhoneConfigsSMSMessages.interface';
import { SitePhoneConfigsSMSMessagesStyle } from './SitePhoneConfigsSMSMessages.style';

const SitePhoneConfigsSMSMessages: FC<SitePhoneConfigsSMSMessagesInterface> = (props) => {
	const { content } = props;
	const { t } = useTranslation('SITES');
	const classes = SitePhoneConfigsSMSMessagesStyle();

	const dispatch = useDispatch<AppDispatch>();
	const phoneConfigs = useSelector(phoneConfigsSelector);

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;
	const cSiteId = params.siteId;
	const phoneConfig = content?.data && mapPhoneConfig(content.data[0]);
	const roomsMapping = Object.entries(phoneConfig?.roomsMapping || {})
		.map(([key, value]) => `${key}:${value}`)
		.join(',');
	const messages = phoneConfig?.smsMessages;
	const translation = 'CONTENT.PHONE_CONFIGS.DETAIL.SMS';

	const { handleChangeInput, handleBlur, handleSubmit, values } =
		useForm<SitePhoneConfigsSMSMessagesFormInterface>(
			{ ...messages },
			() => ({ ...messages }),
			async () => {
				const payload = {
					mode: phoneConfig?.mode || '',
					prefixes: phoneConfig?.prefixes || '',
					from: phoneConfig?.from || '',
					roomsMapping: roomsMapping || '',
					outboundPattern: phoneConfig?.sip?.outboundPattern || '',
					callbackRetries: String(phoneConfig?.callbackRetries),
					smsGateway: phoneConfig?.smsGateway || '',
					smsMessages: values
				};

				// dispatch: edit phone config
				cSiteId &&
					phoneConfig?.id &&
					dispatch(
						PhoneConfigEdit(phoneConfig.id, payload, () => {
							// dispatch: fetch site phone configs
							dispatch(PhoneConfigsFetch(cSiteId, true));
						})
					);
			}
		);

	return messages ? (
		<Box className={classes.sContainer}>
			<Card>
				<CardContent>
					<Typography variant="h6">{t(`${translation}.TITLE`)}</Typography>
					<Typography variant="body2" color="textSecondary" className={classes.sExcerpt}>
						{t(`${translation}.EXCERPT`)}
					</Typography>

					<form onSubmit={handleSubmit}>
						{Object.keys(messages).map((message, idx) => (
							<FormControl key={idx} fullWidth margin="normal">
								<TextField
									multiline
									type="text"
									id={message}
									name={message}
									rows={2}
									label={strCapitalLetterAndCamelCaseToDash(message)}
									placeholder={t(`${translation}.FIELDS.MESSAGE.PLACEHOLDER`)}
									value={values[message]}
									onChange={handleChangeInput}
									onBlur={handleBlur}
									inputProps={{ maxLength: 300 }}
								/>
							</FormControl>
						))}
						<Box className={classes.sButtonWrapper}>
							<Button
								variant="outlined"
								type="submit"
								disabled={phoneConfigs.updating}
								endIcon={phoneConfigs.updating && <CircularProgress size={20} />}>
								{t('DIALOG:BUTTONS.UPDATE')}
							</Button>
						</Box>
					</form>
				</CardContent>
			</Card>
		</Box>
	) : null;
};
export default SitePhoneConfigsSMSMessages;
