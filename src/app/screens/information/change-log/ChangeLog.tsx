import { Box, Paper } from '@material-ui/core';
import { FC, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';

import PageHead from '../../../components/content/page-head/PageHead';
import { GeneralFetchChangelog, generalSelector } from '../../../slices/general/General.slice';
import { MarkdownRenderers } from './markdown/Markdown';

const ChangeLog: FC = () => {
	const dispatch = useDispatch();
	const general = useSelector(generalSelector);

	useEffect(() => {
		if (!general.changeLog) {
			// dispatch: fetch changelog
			dispatch(GeneralFetchChangelog());
		}
	}, [dispatch, general.changeLog]);

	return (
		<Paper elevation={12} component="section" square>
			{/* Page Head */}
			<PageHead title="CHANGE_LOG.TITLE" />

			{/* Content */}
			{general.changeLog && (
				<Box>
					<ReactMarkdown components={MarkdownRenderers}>
						{JSON.parse(general.changeLog)}
					</ReactMarkdown>
				</Box>
			)}
		</Paper>
	);
};
export default ChangeLog;
