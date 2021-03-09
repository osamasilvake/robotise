import { Box, Paper } from '@material-ui/core';
import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';

import Meta from '../../../frame/meta/Meta';
import { GeneralFetchChangelog, generalSelector } from '../../../slices/general/General.slice';
import { jsonParse } from '../../../utilities/helpers/json';
import { MarkdownRenderers } from '../../../utilities/parsers/Markdown/Markdown';

const Changelogs: FC = () => {
	const { t } = useTranslation('META');

	const dispatch = useDispatch();
	const { changelog } = useSelector(generalSelector);

	useEffect(() => {
		if (!changelog) {
			// dispatch: update changelog
			dispatch(GeneralFetchChangelog());
		}
	}, [changelog, dispatch]);

	return (
		<Box component="section">
			{/* Meta */}
			<Meta title={t('CHANGELOGS.TITLE')} description={t('CHANGELOGS.DESCRIPTION')} />

			{/* Header */}
			<Paper square>
				<h1>Header</h1>
			</Paper>

			{/* Content */}
			<Paper square>
				<ReactMarkdown
					escapeHtml={false}
					renderers={MarkdownRenderers}
					source={changelog && jsonParse(changelog)}
				/>
			</Paper>
		</Box>
	);
};
export default Changelogs;
