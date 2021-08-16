import { Box, Link, Typography } from '@material-ui/core';
import { FC, useState } from 'react';

import { AppConfigService } from '../../../services';
import { strToLinks } from '../../../utilities/methods/String';
import { ReadMoreInterface } from './ReadMore.interface';
import { ReadMoreStyle } from './ReadMore.style';

const ReadMore: FC<ReadMoreInterface> = (props) => {
	const { text, variant = 'body1', min = 250 } = props;
	const classes = ReadMoreStyle();

	const [readMore, setReadMore] = useState(false);

	const textExceeds = text && text.length > min;
	const parseText = textExceeds && !readMore ? `${text.substring(0, min)}...` : text;
	const sText = text && strToLinks(parseText);

	return text ? (
		<Box>
			{/* Text */}
			<Typography
				variant={variant}
				dangerouslySetInnerHTML={{ __html: sText }}
				className={classes.sText}
			/>

			{/* Link */}
			{textExceeds && (
				<Link
					component="button"
					variant={variant}
					underline="hover"
					onClick={() => setReadMore(!readMore)}>
					{!readMore ? 'Show More' : 'Show Less'}
				</Link>
			)}
		</Box>
	) : (
		<Typography>{AppConfigService.AppOptions.common.none}</Typography>
	);
};
export default ReadMore;
