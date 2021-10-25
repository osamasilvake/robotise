import { Link, TableCell } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { AppConfigService } from '../../../../../services';
import { SDLDataInterface } from '../../../../../slices/settings/deep-links/DeepLinks.interface';
import { momentFormat1 } from '../../../../../utilities/methods/Moment';
import { DeepLinksTableColumnsTypeEnum } from './DeepLinksTable.enum';
import {
	DeepLinksTableBodyCellInterface,
	DeepLinksTableColumnInterface
} from './DeepLinksTable.interface';

const DeepLinksTableBodyCell: FC<DeepLinksTableBodyCellInterface> = (props) => {
	const { deepLink, column } = props;
	const { t } = useTranslation('DEEP_LINKS');

	/**
	 * set cell value
	 * @param deepLink
	 * @param column
	 * @returns
	 */
	const setCellValue = (deepLink: SDLDataInterface, column: DeepLinksTableColumnInterface) => {
		const value = deepLink[column.id];
		if (DeepLinksTableColumnsTypeEnum.UPDATED_AT === column.id) {
			return momentFormat1(value);
		} else if (DeepLinksTableColumnsTypeEnum.LINK === column.id) {
			return (
				<Link underline="hover" variant="body2" href={String(value)} target="_blank">
					{t('LIST.VALUES.LINK')}
				</Link>
			);
		}
		return value || AppConfigService.AppOptions.common.none;
	};

	return (
		<TableCell key={column.id} align={column.align}>
			{setCellValue(deepLink, column)}
		</TableCell>
	);
};
export default DeepLinksTableBodyCell;
