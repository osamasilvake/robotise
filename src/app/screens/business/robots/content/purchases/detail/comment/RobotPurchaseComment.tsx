import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { RobotPurchaseCommentInterface } from './RobotPurchaseComment.interface';
import { RobotPurchaseCommentStyle } from './RobotPurchaseComment.style';

const RobotPurchaseComment: FC<RobotPurchaseCommentInterface> = (props) => {
	const { purchase } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotPurchaseCommentStyle();

	const translation = 'CONTENT.PURCHASES.DETAIL.COMMENT';

	return purchase?.content?.comment ? (
		<Box className={classes.sBox}>
			<Typography variant="h6" color="textSecondary">
				{t(`${translation}.NOTE`)}
			</Typography>
			<Typography>{purchase.content.comment}</Typography>
		</Box>
	) : null;
};
export default RobotPurchaseComment;
