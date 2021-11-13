import { Chip, CircularProgress } from '@mui/material';
import { FC, MouseEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ExternalLinkInterface } from './ExternalLink.interface';

const ExternalLink: FC<ExternalLinkInterface> = (props) => {
	const { index, text, payload, FetchExternalLink, showIcon, disabled } = props;

	const dispatch = useDispatch();

	const [trackingIndex, setTrackingIndex] = useState(-1);

	/**
	 * handle external link
	 * @param event
	 * @returns
	 */
	const handleExternalLink = (event: MouseEvent<HTMLDivElement>) => {
		// stop propagation
		event.stopPropagation();

		// set tracking index
		setTrackingIndex(index || -1);

		// dispatch: fetch link
		dispatch(
			FetchExternalLink(payload, (res) => {
				res.data && window.open(res.data.dlink);

				// reset tracking index
				setTrackingIndex(-1);
			})
		);
	};

	return (
		<Chip
			size="small"
			label={text}
			color="primary"
			variant="outlined"
			clickable
			icon={
				showIcon && (!index || (index && index === trackingIndex)) ? (
					<CircularProgress size={20} />
				) : undefined
			}
			disabled={disabled}
			onClick={handleExternalLink}
		/>
	);
};
export default ExternalLink;
