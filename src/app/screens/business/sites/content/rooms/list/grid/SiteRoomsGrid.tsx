import {
	Box,
	Card,
	CardContent,
	Checkbox,
	FormControlLabel,
	Grid,
	Typography
} from '@mui/material';
import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import PageEmpty from '../../../../../../../components/content/page-empty/PageEmpty';
import { AppConfigService } from '../../../../../../../services';
import { CardStyle } from '../../../../../../../utilities/styles/Card.style';
import DialogToggleRoomState from './DialogToggleRoomState';
import { SiteRoomsGridGroupAccInterface, SiteRoomsGridInterface } from './SiteRoomsGrid.interface';
import { SiteRoomsGridStyle } from './SiteRoomsGrid.style';

const SiteRoomsGrid: FC<SiteRoomsGridInterface> = (props) => {
	const { siteSingle, active, inactive } = props;
	const { t } = useTranslation('SITES');
	const classes = SiteRoomsGridStyle();
	const cardClasses = CardStyle();

	const [result, setResult] = useState<SiteRoomsGridGroupAccInterface | null>(null);
	const [confirmRoomState, setConfirmRoomState] = useState(false);
	const [checkedState, setCheckedState] = useState({ room: '', checked: false });

	const allRooms = siteSingle.rooms.available;
	const allWhitelist = siteSingle.rooms.whitelist;

	const translation = 'CONTENT.ROOMS.LIST.GRID';

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
			sortedRooms.reduce((acc: SiteRoomsGridGroupAccInterface, val) => {
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

	return result ? (
		<>
			{Object.keys(result).map((key, idx) => (
				<Box key={key}>
					{/* Floor */}
					<Typography variant="h2" className={classes.sFloorLabel}>
						{t(`${translation}.FLOOR`)} {key}
					</Typography>

					{/* Grid */}
					{result[key] && result[key].length && (
						<Grid
							container
							spacing={1}
							className={clsx({
								[classes.sGridContainer]: Object.keys(result).length - 1 !== idx
							})}>
							{result[key].map((room, index) => (
								<Grid item key={index} xs={12} sm={6} md={3} lg={2}>
									<Card square elevation={1}>
										<CardContent
											className={clsx(
												classes.sCardContent,
												cardClasses.sCardContent1,
												classes.sActive,
												{
													[classes.sInactive]:
														!allWhitelist?.includes(room)
												}
											)}>
											<FormControlLabel
												className={classes.sCheckbox}
												control={
													<Checkbox
														name="room"
														checked={!allWhitelist?.includes(room)}
														onChange={(e) => {
															setConfirmRoomState(true);
															setCheckedState({
																room,
																checked: e.target.checked
															});
														}}
														style={{
															color: AppConfigService.AppOptions
																.colors.c15
														}}
													/>
												}
												label={t<string>(`${translation}.BLOCKED`)}
												labelPlacement="start"
											/>

											<Box>
												<Typography variant="body2">
													{t(`${translation}.ROOM`)}
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

			{/* Dialog: Confirm Room State */}
			{confirmRoomState && (
				<DialogToggleRoomState
					open={confirmRoomState}
					setOpen={setConfirmRoomState}
					checkedState={checkedState}
					siteSingle={siteSingle}
					allWhitelist={allWhitelist}
				/>
			)}

			{/* Empty */}
			{Object.keys(result).length === 0 && <PageEmpty message="EMPTY.MESSAGE" paddingTop />}
		</>
	) : null;
};
export default SiteRoomsGrid;
