import QRCode, { QRCodeToDataURLOptions } from 'qrcode';
import { FC, useEffect } from 'react';

import { timeout } from '../../../../../../../../utilities/methods/Timeout';
import { QRCodeTemplateInterface } from './QRCodeTemplate.interface';

const QRCodeTemplate: FC<QRCodeTemplateInterface> = (props) => {
	const { text, iframeId, iframeUrl, showIframe } = props;

	useEffect(() => {
		/**
		 * generate QR code
		 */
		const generateQRCode = () => {
			const opts: QRCodeToDataURLOptions = {
				errorCorrectionLevel: 'H',
				type: 'image/png',
				margin: 0,
				rendererOpts: { quality: 1 },
				color: { dark: '#B0B0B0' },
				width: 210
			};

			QRCode.toDataURL(text, opts, async (err, url) => {
				if (err) throw err;

				// wait
				await timeout(300);

				// send url to iframe
				const iframeElem = document.getElementById(iframeId) as HTMLIFrameElement;
				iframeElem?.contentWindow?.postMessage({ type: iframeId, url });
			});
		};
		showIframe && generateQRCode();
	}, [iframeId, showIframe, text]);

	return showIframe ? (
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
export default QRCodeTemplate;
