import { TableCell } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Status from '../../../../../components/common/status/Status';
import { ISite } from '../../../../../slices/sites/Sites.slice.interface';
import { momentFormat1 } from '../../../../../utilities/methods/Moment';
import { SitesTableBodyCellInterface, SitesTableColumnInterface } from './SitesTable.interface';
import { columns } from './SitesTable.list';

const SitesTableBodyCell: FC<SitesTableBodyCellInterface> = (props) => {
	const { column, site } = props;
	const { t } = useTranslation('SITES');

	/**
	 * set cell value
	 * @param site
	 * @param column
	 * @returns
	 */
	const setCellValue = (site: ISite, column: SitesTableColumnInterface) => {
		const value = site[column.id];
		if (columns[3].id === column.id) {
			return (
				<Status active={site.acceptOrders}>
					{site.acceptOrders
						? t('LIST.TABLE.VALUES.ACTIVE')
						: t('LIST.TABLE.VALUES.INACTIVE')}
				</Status>
			);
		} else if (columns[4].id === column.id) {
			return momentFormat1(value);
		}
		return value;
	};

	return (
		<TableCell key={column.id} align={column.align}>
			{setCellValue(site, column)}
		</TableCell>
	);
};
export default SitesTableBodyCell;
