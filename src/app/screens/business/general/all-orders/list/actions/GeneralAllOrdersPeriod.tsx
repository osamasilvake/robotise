import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { GeneralAllOrdersPeriodInterface } from './GeneralAllOrdersActions.interface';
import { generalAllOrdersPeriod } from './GeneralAllOrdersActions.list';

const GeneralAllOrdersPeriod: FC<GeneralAllOrdersPeriodInterface> = (props) => {
	const { currentPeriod, setCurrentPeriod } = props;
	const { t } = useTranslation('GENERAL');

	const translation = 'CONTENT.ALL_ORDERS.LIST.ACTIONS.FILTERS';

	/**
	 * handle period
	 * @param id
	 */
	const handlePeriod = (id: string) => {
		const period = generalAllOrdersPeriod.find((d) => d.id === id);
		period && setCurrentPeriod(period);
	};

	return (
		<FormControl>
			<InputLabel id="period">{t(`${translation}.PERIOD.LABEL`)}</InputLabel>
			<Select
				size="small"
				labelId="period"
				id="period"
				name="period"
				label={t(`${translation}.PERIOD.LABEL`)}
				value={currentPeriod}
				onChange={(event) => handlePeriod(event.target.value)}>
				{generalAllOrdersPeriod.map((item) => (
					<MenuItem key={item.id} value={item.id}>
						{t(`${translation}.${item.label}`)}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};
export default GeneralAllOrdersPeriod;
