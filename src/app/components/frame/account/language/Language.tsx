import { Done } from '@mui/icons-material';
import {
	Avatar,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	ListSubheader
} from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppConfigService } from '../../../../services';
import { AppDispatch } from '../../../../slices';
import { AppChangeLanguage, appSelector } from '../../../../slices/app/App.slice';
import { AppLanguageTypeEnum } from '../../../../slices/app/App.slice.enum';
import { LanguageStyle } from './Language.style';

const Language: FC = () => {
	const { t } = useTranslation('FRAME');
	const classes = LanguageStyle();

	const dispatch = useDispatch<AppDispatch>();

	const languages = Object.keys(AppLanguageTypeEnum);
	const app = useSelector(appSelector);

	/**
	 * dispatch: change language
	 * @param language
	 * @returns
	 */
	const handleLanguage = (language: string) => () => dispatch(AppChangeLanguage(language));

	return (
		<List
			disablePadding
			dense
			subheader={
				<ListSubheader className={classes.sSubHeader}>
					{t('ACCOUNT.LANGUAGES.LABEL')}
				</ListSubheader>
			}>
			{languages.map((language, index, { length }) => (
				<ListItem
					disablePadding
					key={language}
					divider={index + 1 !== length}
					secondaryAction={
						language.toLowerCase() === app.currentLanguage ? (
							<IconButton edge="end" disabled>
								<Done color="success" />
							</IconButton>
						) : null
					}>
					<ListItemButton
						selected={language.toLowerCase() === app.currentLanguage}
						onClick={handleLanguage(language.toLowerCase())}>
						<Avatar
							variant="square"
							className={classes.sFlag}
							src={`${
								AppConfigService.AppImageURLs.languages.path
							}${language.toLowerCase()}${
								AppConfigService.AppImageURLs.languages.format
							}`}
							alt="flag"
						/>
						<ListItemText primary={t(`ACCOUNT.LANGUAGES.${language}`)} />
					</ListItemButton>
				</ListItem>
			))}
		</List>
	);
};
export default Language;
