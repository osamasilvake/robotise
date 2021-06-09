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
	const { siteSingle } = props;
	const classes = SiteRoomsBlacklistStyles();
	const cardClasses = CardStyles();

	const [result, setResult] = useState<SiteRoomsBlacklistContentGroupAccInterface | null>(null);

	const allRooms = siteSingle.rooms && siteSingle.rooms.available;
	const allWhitelist = siteSingle.rooms && siteSingle.rooms.whitelist;

	useEffect(() => {
		// sort rooms
		const sortedRooms = allRooms?.concat().sort((a, b) => (a > b ? 1 : b > a ? -1 : 0));

		// group rooms by floor
		const groupedRooms =
			sortedRooms &&
			sortedRooms.reduce((acc: SiteRoomsBlacklistContentGroupAccInterface, val) => {
				const letters = val.length > 3 ? val.substring(0, val.length - 2) : val.charAt(0);
				if (!acc[letters]) {
					acc[letters] = [val];
				} else {
					acc[letters].push(val);
				}
				return acc;
			}, {});

		// set result
		groupedRooms && setResult(groupedRooms);
	}, [allRooms]);

	return (
		<>
			{result &&
				Object.keys(result).map((key, idx) => (
					<Box key={key}>
						{/* Floor */}
						<Typography variant="h2" className={classes.sFloorLabel}>
							Floor {key}
						</Typography>

						{/* Grid */}
						{result[key] && result[key].length > 0 && (
							<Grid
								container
								spacing={1}
								className={clsx({
									[classes.sGridContainer]: Object.keys(result).length - 1 !== idx
								})}>
								{result[key].map((room) => (
									<Grid item xs={12} sm={6} md={3} lg={2} key={room}>
										<Card square elevation={1}>
											<CardContent
												className={clsx(
													cardClasses.sCardContent2,
													classes.sActive,
													{
														[classes.sInactive]:
															!allWhitelist?.includes(room)
													}
												)}>
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
