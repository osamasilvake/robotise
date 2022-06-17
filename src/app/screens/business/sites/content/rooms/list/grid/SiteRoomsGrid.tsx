import { QrCode2 } from '@mui/icons-material';
import {
	Box,
	Card,
	CardContent,
	Checkbox,
	Chip,
	FormControlLabel,
	Grid,
	Stack,
	Typography
} from '@mui/material';
import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import PageEmpty from '../../../../../../../components/content/page-empty/PageEmpty';
import { AppConfigService } from '../../../../../../../services';
import { qrCodesSelector } from '../../../../../../../slices/business/sites/rooms/qrCode/QRCodes.slice';
import { CardStyle } from '../../../../../../../utilities/styles/Card.style';
import { SiteConfigOrderOriginsTypeEnum } from '../../../configuration/site-config/SiteConfig.enum';
import DialogGenerateQRCode from './DialogGenerateQRCode';
import DialogToggleRoomState from './DialogToggleRoomState';
import { SiteRoomsGridGroupAccInterface, SiteRoomsGridInterface } from './SiteRoomsGrid.interface';
import { SiteRoomsGridStyle } from './SiteRoomsGrid.style';
import SiteRoomsGridFloor from './SiteRoomsGridFloor';

const SiteRoomsGrid: FC<SiteRoomsGridInterface> = (props) => {
	const { siteSingle, active, inactive, searchText } = props;
	const { t } = useTranslation('SITES');
	const classes = SiteRoomsGridStyle();
	const cardClasses = CardStyle();

	const qrCodes = useSelector(qrCodesSelector);

	const [result, setResult] = useState<SiteRoomsGridGroupAccInterface | null>(null);
	const [qrCode, setQRCode] = useState(false);
	const [confirmRoomState, setConfirmRoomState] = useState(false);
	const [roomState, setRoomState] = useState({ room: '', checked: false });

	const allRooms = siteSingle.rooms.available;
	const allWhitelist = siteSingle.rooms.whitelist;
	const orderOriginsEnabled = siteSingle?.configs?.orderOriginsEnabled;
	const isSMSCode = orderOriginsEnabled.includes(SiteConfigOrderOriginsTypeEnum.SMS_CODE);
	const qrCodesDataById = qrCodes.content?.dataById;

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

		// search room
		rooms = searchText ? rooms.filter((r) => r.indexOf(searchText) > -1) : rooms;

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
	}, [allRooms, allWhitelist, active, inactive, searchText]);

	return result ? (
		<>
			{Object.keys(result).map((key, idx) => (
				<Box key={key}>
					{/* Floor */}
					<SiteRoomsGridFloor siteSingle={siteSingle} floor={key} result={result} />

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
												cardClasses.sCardContent1,
												classes.sActive,
												{
													[classes.sInactive]:
														!allWhitelist?.includes(room)
												}
											)}>
											<Stack
												direction="row"
												alignItems="flex-end"
												justifyContent="space-between">
												{/* Room */}
												<Box flex={1}>
													<Stack direction="row" alignItems="center">
														<Typography variant="body2">
															{t(`${translation}.ROOM`)}
														</Typography>
														{isSMSCode &&
															qrCodesDataById &&
															qrCodesDataById[room] && (
																<QrCode2
																	className={classes.sQRCodeIcon}
																/>
															)}
													</Stack>
													<Typography variant="h4">{room}</Typography>
												</Box>

												{/* Info */}
												<Box flex={1} className={classes.sBlockRight}>
													<Box
														className={clsx({
															[classes.sQRChip]:
																!isSMSCode ||
																!allWhitelist?.includes(room)
														})}>
														<Chip
															size="small"
															label={t(
																qrCodesDataById &&
																	qrCodesDataById[room]
																	? `${translation}.QR_CODE.MANAGE`
																	: `${translation}.QR_CODE.CREATE`
															)}
															color="info"
															variant="outlined"
															onClick={() => {
																setQRCode(true);
																setRoomState({
																	room,
																	checked: false
																});
															}}
														/>
													</Box>
													<FormControlLabel
														className={classes.sCheckboxControl}
														classes={{ label: classes.sCheckboxLabel }}
														control={
															<Checkbox
																name="room"
																checked={
																	!allWhitelist?.includes(room)
																}
																onChange={(e) => {
																	setConfirmRoomState(true);
																	setRoomState({
																		room,
																		checked: e.target.checked
																	});
																}}
																style={{
																	color: AppConfigService
																		.AppOptions.colors.c15
																}}
																className={classes.sCheckbox}
															/>
														}
														label={t<string>(`${translation}.BLOCKED`)}
														labelPlacement="start"
													/>
												</Box>
											</Stack>
										</CardContent>
									</Card>
								</Grid>
							))}
						</Grid>
					)}
				</Box>
			))}

			{/* Dialog: Generate QR Code */}
			<DialogGenerateQRCode
				open={qrCode}
				setOpen={setQRCode}
				roomState={roomState}
				siteSingle={siteSingle}
			/>

			{/* Dialog: Confirm Room State */}
			{confirmRoomState && (
				<DialogToggleRoomState
					open={confirmRoomState}
					setOpen={setConfirmRoomState}
					checkedState={roomState}
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
