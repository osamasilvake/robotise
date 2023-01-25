import { Box, FormControl, Grid, TextField } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { SiteConfigurationColdCallsTimesInterface } from './SiteConfigurationColdCalls.interface';

const SiteConfigurationColdCallsTimes: FC<SiteConfigurationColdCallsTimesInterface> = (props) => {
	const { startTimeLocal, endTimeLocal, handleChangeInput, errors } = props;
	const { t } = useTranslation('SITES');

	const translation = 'CONTENT.CONFIGURATION.COLD_CALLS';

	console.log(errors);

	return (
		<Box>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<FormControl fullWidth margin="normal">
						<TextField
							required
							type="string"
							id="startTimeLocal"
							name="startTimeLocal"
							label={t(`${translation}.FORM.FIELDS.START_TIME.LABEL`)}
							placeholder={t(`${translation}.FORM.FIELDS.START_TIME.PLACEHOLDER`)}
							value={startTimeLocal}
							onChange={handleChangeInput}
							error={!!errors?.startTimeLocal}
							helperText={errors?.startTimeLocal && t(errors.startTimeLocal)}
						/>
					</FormControl>
				</Grid>
				<Grid item xs={6}>
					<FormControl fullWidth margin="normal">
						<TextField
							required
							type="string"
							id="endTimeLocal"
							name="endTimeLocal"
							label={t(`${translation}.FORM.FIELDS.END_TIME.LABEL`)}
							placeholder={t(`${translation}.FORM.FIELDS.END_TIME.PLACEHOLDER`)}
							value={endTimeLocal}
							onChange={handleChangeInput}
							error={!!errors?.endTimeLocal}
							helperText={errors?.endTimeLocal && t(errors.endTimeLocal)}
						/>
					</FormControl>
				</Grid>
			</Grid>
		</Box>
	);
};
export default SiteConfigurationColdCallsTimes;
