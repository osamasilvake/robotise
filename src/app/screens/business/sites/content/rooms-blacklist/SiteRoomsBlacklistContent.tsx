import { Box, Card, CardContent, Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';

import { CardStyles } from '../../../../../utilities/styles/Card.style';
import {
	SiteRoomsBlacklistContentGroupAccInterface,
	SiteRoomsBlacklistContentInterface
} from './SiteRoomsBlacklist.interface';
import { SiteRoomsBlacklistStyles } from './SiteRoomsBlacklist.style';

const SiteRoomsBlacklistContent: FC<SiteRoomsBlacklistContentInterface> = (props) => {
	const { site } = props;
	const classes = SiteRoomsBlacklistStyles();
	const cardClasses = CardStyles();

	const [result, setResult] = useState<SiteRoomsBlacklistContentGroupAccInterface | null>(null);

	const allRooms = site.rooms && site.rooms.available;
	// const allWhitelist = site.rooms && site.rooms.whitelist;

	useEffect(() => {
		if (allRooms) {
			/**
			 * group rooms by floor
			 * @param rooms
			 * @returns
			 */
			const groupAllRooms = (rooms: string[]) =>
				rooms.reduce((acc: SiteRoomsBlacklistContentGroupAccInterface, val) => {
					const letters =
						val.length > 3 ? val.substring(0, val.length - 2) : val.charAt(0);
					if (!acc[letters]) {
						acc[letters] = [val];
					} else {
						acc[letters].push(val);
					}
					return acc;
				}, {});

			// sorted rooms
			const sortedRooms = allRooms.concat().sort((a, b) => (a > b ? 1 : b > a ? -1 : 0));

			// set result
			setResult(sortedRooms && groupAllRooms(sortedRooms));
		}
	}, [allRooms]);

	return (
		<>
			{result &&
				Object.keys(result).map((key) => (
					<Box key={key}>
						{result[key] && result[key].length > 0 && (
							<Grid container spacing={1}>
								{result[key].map((room) => (
									<Grid item xs={12} sm={6} md={3} lg={2} key={room}>
										<Card square elevation={1}>
											<CardContent
												className={clsx(cardClasses.sCardContent2, {
													[classes.sAvailable]: true
												})}>
												<Typography variant="body2">Room</Typography>
												<Typography variant="h4">{room}</Typography>
											</CardContent>
										</Card>
									</Grid>
								))}
							</Grid>
						)}
					</Box>
				))}
		</>
	);
};
export default SiteRoomsBlacklistContent;
