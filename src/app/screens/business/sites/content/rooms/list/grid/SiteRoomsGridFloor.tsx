import { Block, Contrast } from '@mui/icons-material';
import { Box, Chip, Stack, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import DialogToggleFloorState from './DialogToggleFloorState';
import { SiteRoomsGridBlockUnblockFloorTypeEnum } from './SiteRoomsGrid.enum';
import { SiteRoomsGridFloorInterface } from './SiteRoomsGrid.interface';
import { SiteRoomsGridStyle } from './SiteRoomsGrid.style';

const SiteRoomsGridFloor: FC<SiteRoomsGridFloorInterface> = (props) => {
	const { siteSingle, floor, result } = props;
	const { t } = useTranslation('SITES');
	const classes = SiteRoomsGridStyle();

	const [confirmFloorState, setConfirmFloorState] = useState(false);
	const [floorState, setFloorState] = useState({
		type: SiteRoomsGridBlockUnblockFloorTypeEnum.BLOCK,
		floor: '',
		rooms: ['']
	});
	const allWhitelist = siteSingle.rooms.whitelist;

	const translation = 'CONTENT.ROOMS.LIST.GRID';

	/**
	 * block/unblock floor
	 * @param type
	 * @returns
	 */
	const blockAndUnblockFloor = (type: SiteRoomsGridBlockUnblockFloorTypeEnum) => {
		if (!result) return;
		setConfirmFloorState(true);
		setFloorState({
			type,
			floor: floor,
			rooms: result[+floor]
		});
	};

	return result ? (
		<>
			<Stack spacing={1.5} direction="row" alignItems="center" className={classes.sFloor}>
				{/* Floor No. */}
				<Typography variant="h2">
					{t(`${translation}.FLOOR`)} {floor}
				</Typography>

				{/* Block/Unblock */}
				<Box>
					<Chip
						size="small"
						label={t(`${translation}.BLOCK`)}
						color="error"
						variant="outlined"
						icon={<Block />}
						onClick={() =>
							blockAndUnblockFloor(SiteRoomsGridBlockUnblockFloorTypeEnum.BLOCK)
						}
					/>
					<Chip
						size="small"
						label={t(`${translation}.UNBLOCK`)}
						color="secondary"
						variant="outlined"
						icon={<Contrast />}
						onClick={() =>
							blockAndUnblockFloor(SiteRoomsGridBlockUnblockFloorTypeEnum.UNBLOCK)
						}
						className={classes.sFloorIcon}
					/>
				</Box>
			</Stack>

			{/* Dialog: Confirm Floor State */}
			{confirmFloorState && floorState.floor === floor && (
				<DialogToggleFloorState
					open={confirmFloorState}
					setOpen={setConfirmFloorState}
					floorState={floorState}
					siteSingle={siteSingle}
					allWhitelist={allWhitelist}
				/>
			)}
		</>
	) : null;
};
export default SiteRoomsGridFloor;
