import { Assignment } from '@mui/icons-material';
import { Chip } from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import DialogTestOutboundCallPhoneConfig from './DialogTestOutboundCallPhoneConfig';

const SitePhoneConfigsTestOutboundCall: FC = () => {
	const { t } = useTranslation('SITES');

	const [open, setOpen] = useState(false);

	const translation = 'CONTENT.PHONE_CONFIGS.DETAIL.ACTIONS.OUTBOUND_CALL';

	return (
		<>
			<Chip
				size="small"
				icon={<Assignment />}
				label={t(`${translation}.LABEL`)}
				color="primary"
				variant="outlined"
				clickable
				onClick={() => setOpen(true)}
			/>

			{/* Dialog: Test Outbound Call */}
			{open && <DialogTestOutboundCallPhoneConfig open={open} setOpen={setOpen} />}
		</>
	);
};
export default SitePhoneConfigsTestOutboundCall;
