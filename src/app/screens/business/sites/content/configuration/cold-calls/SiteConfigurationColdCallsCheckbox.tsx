import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { ChangeEvent, FC } from 'react';

import { SiteConfigurationColdCallsWeekdaysEnum } from './SiteConfigurationColdCalls.enum';
import { SiteConfigurationColdCallsCheckboxInterface } from './SiteConfigurationColdCalls.interface';

const SiteConfigurationColdCallsContent: FC<SiteConfigurationColdCallsCheckboxInterface> = (
	props
) => {
	const { weekdays, handleChangeInputs } = props;

	const allWeekdays = Object.values(SiteConfigurationColdCallsWeekdaysEnum);

	/**
	 * on change weekday
	 * @param event
	 */
	const onChangeWeekday = (event: ChangeEvent<HTMLInputElement>) => {
		const { name } = event.target;
		const isExist = weekdays?.includes(name);
		const list = isExist ? weekdays.filter((w) => w !== name) : [...weekdays, name];

		// update list
		handleChangeInputs('days', list);
	};

	return (
		<Box>
			{allWeekdays &&
				allWeekdays.map((weekday) => (
					<FormControlLabel
						key={weekday}
						control={
							<Checkbox
								color="primary"
								name={weekday}
								checked={weekdays.includes(weekday)}
								onChange={onChangeWeekday}
							/>
						}
						label={weekday}
					/>
				))}
		</Box>
	);
};
export default SiteConfigurationColdCallsContent;
