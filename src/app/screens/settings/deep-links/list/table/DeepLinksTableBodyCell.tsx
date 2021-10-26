import { Box, Chip, TableCell } from '@mui/material';
import { FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ReadMore from '../../../../../components/common/read-more/ReadMore';
import { AppConfigService } from '../../../../../services';
import { SDLDataInterface } from '../../../../../slices/settings/deep-links/DeepLinks.interface';
import { momentFormat1 } from '../../../../../utilities/methods/Moment';
import { DeepLinkCreateEditTypeEnum, DeepLinksTableColumnsTypeEnum } from './DeepLinksTable.enum';
import {
	DeepLinksTableBodyCellInterface,
	DeepLinksTableColumnInterface
} from './DeepLinksTable.interface';
import { DeepLinksTableStyle } from './DeepLinksTable.style';
import DialogCreateEditDeepLink from './DialogCreateEditDeepLink';

const DeepLinksTableBodyCell: FC<DeepLinksTableBodyCellInterface> = (props) => {
	const { deepLink, column } = props;
	const { t } = useTranslation('DEEP_LINKS');
	const classes = DeepLinksTableStyle();

	const [openCreateEdit, setOpenCreateEdit] = useState(false);

	/**
	 * open create/edit deep link dialog
	 * @param event
	 */
	const openCreateEditDeepLinkDialog = (event: MouseEvent<HTMLDivElement>) => {
		// stop propagation
		event.stopPropagation();

		// set create/edit open
		setOpenCreateEdit(true);
	};

	/**
	 * set cell value
	 * @param deepLink
	 * @param column
	 * @returns
	 */
	const setCellValue = (deepLink: SDLDataInterface, column: DeepLinksTableColumnInterface) => {
		if (column.id === DeepLinksTableColumnsTypeEnum.ACTIONS) {
			const translation = 'LIST.TABLE.VALUES';
			return (
				<Box>
					<Chip
						size="small"
						label={t(`${translation}.EDIT`)}
						color="primary"
						variant="outlined"
						clickable
						onClick={openCreateEditDeepLinkDialog}
						className={classes.sEditDeepLink}
					/>
					<DialogCreateEditDeepLink
						deepLink={deepLink}
						type={DeepLinkCreateEditTypeEnum.EDIT}
						open={openCreateEdit}
						setOpen={setOpenCreateEdit}
					/>

					<Chip
						style={{
							borderColor: AppConfigService.AppOptions.colors.c12,
							color: AppConfigService.AppOptions.colors.c12
						}}
						size="small"
						label={t(`${translation}.DELETE`)}
						variant="outlined"
						clickable
						onClick={() => null}
					/>
				</Box>
			);
		} else {
			const value = deepLink[column.id];
			if (DeepLinksTableColumnsTypeEnum.UPDATED_AT === column.id) {
				return momentFormat1(value);
			} else if (DeepLinksTableColumnsTypeEnum.DESCRIPTION === column.id) {
				return <ReadMore text={String(value)} />;
			}
			return value || AppConfigService.AppOptions.common.none;
		}
	};

	return (
		<TableCell key={column.id} align={column.align}>
			{setCellValue(deepLink, column)}
		</TableCell>
	);
};
export default DeepLinksTableBodyCell;
