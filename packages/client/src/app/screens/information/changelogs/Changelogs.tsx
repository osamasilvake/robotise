import { Box, Paper } from '@material-ui/core';
import React, { FC, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';

import PageHead from '../../../components/content/page-head/PageHead';
import { GeneralFetchChangelog, generalSelector } from '../../../slices/general/General.slice';
import { jsonParse } from '../../../utilities/methods/JsonUtilities';
import { MarkdownRenderers } from './markdown/Markdown';

const Changelogs: FC = () => {
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
			{/* Page Head */}
			<PageHead title="CHANGELOGS.TITLE" />

			{/* Content */}
			{changelog && (
				<Paper square elevation={12}>
					<ReactMarkdown
						escapeHtml={false}
						renderers={MarkdownRenderers}
						source={jsonParse(changelog)}
					/>
				</Paper>
			)}
		</Box>
	);
};
export default Changelogs;
