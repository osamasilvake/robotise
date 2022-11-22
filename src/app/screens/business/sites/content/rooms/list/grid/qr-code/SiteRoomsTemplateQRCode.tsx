import QRCode, { QRCodeToDataURLOptions } from 'qrcode';
import { FC, useEffect } from 'react';

import { AppConfigService } from '../../../../../../../../services';
import { timeout } from '../../../../../../../../utilities/methods/Timeout';
import { QRCodeTemplateEnumType } from './SiteRoomsQRCode.enum';
import { QRCodeTemplateInterface } from './SiteRoomsQRCode.interface';

const SiteRoomsTemplateQRCode: FC<QRCodeTemplateInterface> = (props) => {
	const { text, code, smsTo, room, siteTitle, iframeId, iframeUrl, currentState } = props;

	const typeQRImage = QRCodeTemplateEnumType.QR_IMAGE;
	const isStatusValid = currentState?.status;
	const isShowIframe = !!currentState.status && currentState.type !== typeQRImage;

	useEffect(() => {
		// return on invalid
		if (!isStatusValid) return;

		/**
		 * generate QR code
		 */
		const generateQRCode = () => {
			const opts: QRCodeToDataURLOptions = {
				errorCorrectionLevel: 'H',
				type: 'image/png',
				margin: 0,
				color: { dark: AppConfigService.AppOptions.colors.c2 },
				width: 210
			};

			QRCode.toDataURL(text, opts, async (err, url) => {
				if (err) throw err;

				// cases
				// 1. send post message
				// 2. download QR image
				if (isShowIframe) {
					// wait
					await timeout(300);

					// post message
					const iframeElem = document.getElementById(iframeId) as HTMLIFrameElement;
					iframeElem?.contentWindow?.postMessage({
						type: iframeId,
						url,
						text,
						code,
						smsTo,
						room,
						siteTitle
					});
				} else {
					const link = document.createElement('a');
					link.download = `QR_Room_${room}_Code_${code}.png`;
					link.href = url;
					link.click();
				}
			});
		};
		generateQRCode();
	}, [iframeId, isStatusValid, isShowIframe, text, code, smsTo, room, siteTitle]);

	return isShowIframe ? (
		<iframe
			id={iframeId}
			title={iframeId}
			src={iframeUrl}
			height={0}
			width={0}
			frameBorder={0}
		/>
	) : null;
};
export default SiteRoomsTemplateQRCode;
