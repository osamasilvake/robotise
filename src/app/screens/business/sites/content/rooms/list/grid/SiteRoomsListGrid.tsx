import {
	Box,
	Card,
	CardContent,
	Checkbox,
	FormControlLabel,
	Grid,
	Typography
} from '@material-ui/core';
import clsx from 'clsx';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { AppConfigService } from '../../../../../../../services';
import { RoomUpdateState } from '../../../../../../../slices/rooms/Rooms.slice';
import { SiteUpdate } from '../../../../../../../slices/sites/Sites.slice';
import { CardStyles } from '../../../../../../../utilities/styles/Card.style';
import {
	SiteRoomsListGridGroupAccInterface,
	SiteRoomsListGridInterface
} from './SiteRoomsListGrid.interface';
import { SiteRoomsListGridStyles } from './SiteRoomsListGrid.style';

const SiteRoomsListGrid: FC<SiteRoomsListGridInterface> = (props) => {
	const { siteSingle, active, inactive } = props;
	const { t } = useTranslation('SITES');
	const classes = SiteRoomsListGridStyles();
	const cardClasses = CardStyles();

	const dispatch = useDispatch();

	const [result, setResult] = useState<SiteRoomsListGridGroupAccInterface | null>(null);

	const allRooms = siteSingle.rooms.available;
	const allWhitelist = siteSingle.rooms.whitelist;

	useEffect(() => {
		const allBlacklist = allRooms?.filter((r) => !allWhitelist?.includes(r));

		// set rooms
		let rooms = allRooms;
		if (!active && !inactive) {
			rooms = allRooms;
		} else if (active && inactive) {
			rooms = [...allWhitelist, ...allBlacklist];
		} else if (active) {
			rooms = allWhitelist;
		} else {
			rooms = allBlacklist;
		}

		// sort rooms
		const sortedRooms = rooms?.concat().sort((a, b) => (a > b ? 1 : b > a ? -1 : 0));

		// group rooms by floor
		const groupedRooms =
			sortedRooms &&
			sortedRooms.reduce((acc: SiteRoomsListGridGroupAccInterface, val) => {
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
	}, [allRooms, allWhitelist, active, inactive]);

	/**
	 * handle room toggle
	 * @param room
	 * @returns
	 */
	const handleRoomToggle = (room: string) => (event: ChangeEvent<HTMLInputElement>) => {
		const whitelist = event.target.checked
			? allWhitelist.filter((r) => r !== room)
			: [...allWhitelist, room];

		// dispatch: update room
		if (siteSingle?.id) {
			Promise.all([dispatch(RoomUpdateState(siteSingle.id, whitelist))]).then(() => {
				// dispatch: update site
				dispatch(
					SiteUpdate({
						...siteSingle,
						rooms: {
							...siteSingle.rooms,
							whitelist
						}
					})
				);
			});
		}
	};

	return (
		<>
			{result &&
				Object.keys(result).map((key, idx) => (
					<Box key={key}>
						{/* Floor */}
						<Typography variant="h2" className={classes.sFloorLabel}>
							{t('CONTENT.ROOMS.LIST.GRID.FLOOR')} {key}
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
													classes.sCardContent,
													cardClasses.sCardContent2,
													classes.sActive,
													{
														[classes.sInactive]:
															!allWhitelist?.includes(room)
													}
												)}>
												<Box>
													<FormControlLabel
														className={classes.sToggle}
														control={
															<Checkbox
																name="toggle"
																checked={
																	!allWhitelist?.includes(room)
																}
																onChange={handleRoomToggle(room)}
																style={{
																	color: AppConfigService
																		.AppOptions.colors.c15
																}}
															/>
														}
														label={t('CONTENT.ROOMS.LIST.GRID.BLOCKED')}
														labelPlacement="start"
													/>
												</Box>

												<Box>
													<Typography variant="body2">
														{t('CONTENT.ROOMS.LIST.GRID.ROOM')}
													</Typography>
													<Typography variant="h4">{room}</Typography>
												</Box>
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
export default SiteRoomsListGrid;
