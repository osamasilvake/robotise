import { Box, Link, Typography } from '@material-ui/core';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AppConfigService } from '../../../services';
import { strToLinks } from '../../../utilities/methods/String';
import { ReadMoreInterface } from './ReadMore.interface';
import { ReadMoreStyle } from './ReadMore.style';

const ReadMore: FC<ReadMoreInterface> = (props) => {
	const {
		text,
		min = AppConfigService.AppOptions.components.readMore.min,
		variant = 'body1',
		display
	} = props;
	const { t } = useTranslation('READ_MORE');
	const classes = ReadMoreStyle();

	const [readMore, setReadMore] = useState(false);

	const textExceeds = text && text.length > min;
	const parseText = textExceeds && !readMore ? `${text.substring(0, min)}...` : text;
	const sText = text && strToLinks(parseText);

	return text ? (
		<Box onClick={(e) => e.stopPropagation()}>
			{/* Text */}
			<Typography
				variant={variant}
				display={display}
				dangerouslySetInnerHTML={{ __html: sText }}
				className={classes.sText}
			/>

			{/* Link */}
			{textExceeds && (
				<Link
					component="button"
					variant={variant}
					display={display}
					underline="hover"
					onClick={() => setReadMore(!readMore)}>
					{!readMore ? t('SHOW_MORE') : t('SHOW_LESS')}
				</Link>
			)}
		</Box>
	) : (
		<Typography>{AppConfigService.AppOptions.common.none}</Typography>
	);
};
export default ReadMore;
