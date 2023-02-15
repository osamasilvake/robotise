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
import { floorsSelector } from '../../../../../../../slices/business/sites/floors/Floors.slice';
import { qrCodesSelector } from '../../../../../../../slices/business/sites/rooms/qrCode/QRCodes.slice';
import { roomsSelector } from '../../../../../../../slices/business/sites/rooms/Rooms.slice';
import { RoomsTypeEnum } from '../../../../../../../slices/business/sites/rooms/Rooms.slice.enum';
import { SRContentDataInterface } from '../../../../../../../slices/business/sites/rooms/Rooms.slice.interface';
import { CardStyle } from '../../../../../../../utilities/styles/Card.style';
import { SiteConfigOrderOriginsTypeEnum } from '../../../configuration/cloud/site-config/SiteConfig.enum';
import DialogToggleRoomState from './DialogToggleRoomState';
import DialogGenerateQRCode from './qr-code/DialogGenerateQRCode';
import { SiteRoomsGridGroupAccInterface, SiteRoomsGridInterface } from './SiteRoomsGrid.interface';
import { SiteRoomsGridStyle } from './SiteRoomsGrid.style';
import SiteRoomsGridFloor from './SiteRoomsGridFloor';

const SiteRoomsGrid: FC<SiteRoomsGridInterface> = (props) => {
	const { siteSingle, active, inactive, searchText } = props;
	const { t } = useTranslation('SITES');
	const classes = SiteRoomsGridStyle();
	const cardClasses = CardStyle();

	const floors = useSelector(floorsSelector);
	const rooms = useSelector(roomsSelector);
	const qrCodes = useSelector(qrCodesSelector);

	const [allRooms, setAllRooms] = useState<SRContentDataInterface[]>([]);
	const [result, setResult] = useState<SiteRoomsGridGroupAccInterface | null>(null);
	const [qrCode, setQRCode] = useState(false);
	const [confirmRoomState, setConfirmRoomState] = useState(false);
	const [roomState, setRoomState] = useState({ id: '', room: '', checked: false });

	const roomsGroupBy = rooms.content?.groupByType;
	const orderOriginsEnabled = siteSingle?.configs?.orderOriginsEnabled;
	const isSMSCode = orderOriginsEnabled.includes(SiteConfigOrderOriginsTypeEnum.SMS_CODE);
	const qrCodesDataById = qrCodes.content?.dataById;

	const translation = 'CONTENT.ROOMS.LIST.GRID';

	useEffect(() => {
		const allRooms = roomsGroupBy?.find((r) => r.key === RoomsTypeEnum.ROOM)?.values || [];
		const allWhitelist = (allRooms || [])?.filter((f) => !!f.metadata && !f.metadata?.blocked);
		const allBlacklist = (allRooms || [])?.filter((f) => !!f.metadata && f.metadata?.blocked);
		setAllRooms(allRooms);

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
		rooms = searchText ? rooms.filter((r) => r.name.indexOf(searchText) > -1) : rooms;

		// combine floors and rooms
		const combineFloorsAndRooms = floors.content?.data?.reduce(
			(acc: SiteRoomsGridGroupAccInterface, floor) => {
				const list = rooms?.filter((r) => r.floor.id === floor.id);
				acc[floor.name] = list || [];
				return acc;
			},
			{}
		);

		// set result
		combineFloorsAndRooms && setResult(combineFloorsAndRooms);
	}, [floors, roomsGroupBy, active, inactive, searchText]);

	return result ? (
		<>
			{Object.keys(result).map((key, idx) => (
				<Box key={key}>
					{/* Floor */}
					<SiteRoomsGridFloor siteSingle={siteSingle} floor={key} result={result} />

					{/* Floor with rooms */}
					{result[key] && result[key].length > 0 && (
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
												{ [classes.sInactive]: !!room.metadata?.blocked }
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
															qrCodesDataById[room.name] && (
																<QrCode2
																	className={classes.sQRCodeIcon}
																/>
															)}
													</Stack>
													<Typography variant="h4">
														{room.name}
													</Typography>
												</Box>

												{/* Info */}
												<Box flex={1} className={classes.sBlockRight}>
													<Box
														className={clsx({
															[classes.sQRChip]:
																!isSMSCode ||
																!!room.metadata?.blocked
														})}>
														<Chip
															size="small"
															label={t(
																qrCodesDataById &&
																	qrCodesDataById[room.name]
																	? `${translation}.QR_CODE.MANAGE`
																	: `${translation}.QR_CODE.CREATE`
															)}
															color="info"
															variant="outlined"
															onClick={() => {
																setQRCode(true);
																setRoomState({
																	id: room.id,
																	room: room.name,
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
																checked={!!room.metadata?.blocked}
																onChange={(e) => {
																	setConfirmRoomState(true);
																	setRoomState({
																		id: room.id,
																		room: room.name,
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

					{/* Empty Floor */}
					{result[key] && result[key].length <= 0 && (
						<Typography variant="body1" className={classes.sEmptyFloor}>
							{t(`${translation}.FLOOR_EMPTY`)}
						</Typography>
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
					allRooms={allRooms}
				/>
			)}

			{/* Empty */}
			{Object.keys(result).length === 0 && <PageEmpty message="EMPTY.MESSAGE" paddingTop />}
		</>
	) : null;
};
export default SiteRoomsGrid;
