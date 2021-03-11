import { Box, Paper } from '@material-ui/core';
import React, { FC, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';

import PageHead from '../../../components/content/page-head/PageHead';
import { GeneralFetchChangelog, generalSelector } from '../../../slices/general/General.slice';
import { jsonParse } from '../../../utilities/methods/JsonUtilities';
import { MarkdownRenderers } from './markdown/Markdown';

const ChangeLog: FC = () => {
	const dispatch = useDispatch();
	const { changeLog } = useSelector(generalSelector);

	useEffect(() => {
		if (!changeLog) {
			// dispatch: update changelog
			dispatch(GeneralFetchChangelog());
		}
	}, [changeLog, dispatch]);

	return (
		<Box component="section">
			{/* Page Head */}
			<PageHead title="CHANGE_LOG.TITLE" />

			{/* Content */}
			{changeLog && (
				<Paper square elevation={12}>
					<ReactMarkdown
						escapeHtml={false}
						renderers={MarkdownRenderers}
						source={jsonParse(changeLog)}
					/>
				</Paper>
			)}
		</Box>
	);
};
export default ChangeLog;
