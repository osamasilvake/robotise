import { Box } from '@mui/material';
import h337 from 'heatmap.js';
import { FC, useCallback, useEffect, useRef, useState } from 'react';

import Picture from '../../../../../../components/common/picture/Picture';
import { PictureOnLoadInterface } from '../../../../../../components/common/picture/Picture.interface';
import { AppConfigService } from '../../../../../../services';
import { robotLocationImageUrl } from '../../../../robots/Robots.url';
import {
	SiteHeatmapConfigInterface,
	SiteHeatmapCoordinatesInterface,
	SiteHeatmapInstanceInterface,
	SiteHeatmapInterface,
	SiteHeatmapRatioInterface
} from './SiteWifiHeatmap.interface';

const SiteHeatmap: FC<SiteHeatmapInterface> = (props) => {
	const { robot, wifiHeatmap, name } = props;
	const heatmapInstance = useRef<SiteHeatmapInstanceInterface>();

	const [ratio, setRatio] = useState<SiteHeatmapRatioInterface>({
		x: 0,
		y: 0,
		cx: 0,
		cy: 0
	});
	const [points, setPoints] = useState<SiteHeatmapCoordinatesInterface[]>([]);

	useEffect(() => {
		const map = robot.maps.content?.data?.find((m) => m.name === name);
		const origin = map?.origin;
		const resolution = map?.resolution;
		if (origin && resolution && ratio) {
			if (wifiHeatmap.content?.data?.length) {
				setPoints(
					wifiHeatmap.content.data.map((point) => {
						const x = (Math.abs(origin[0] - point.x) / resolution) * ratio.x;
						const y = (Math.abs(origin[1] - point.y) / resolution) * ratio.y;
						return {
							x: +(x > 0 ? x % ratio.cx : x).toFixed(0),
							y: +(y > 0 ? y % ratio.cy : y).toFixed(0),
							value: point.signalStrength
						};
					})
				);
			} else {
				setPoints([]);
			}
		}
	}, [robot.maps.content?.data, wifiHeatmap.content?.data, name, ratio]);

	useEffect(() => {
		const prepareHeatmap = () => {
			// set data
			if (heatmapInstance && heatmapInstance.current) {
				heatmapInstance.current.setData({
					max: 100,
					min: 0,
					data: points
				});
			}
		};
		prepareHeatmap();
	}, [points]);

	/**
	 * on image load
	 * @param values
	 */
	const onLoad = useCallback((values: PictureOnLoadInterface) => {
		const statistics = AppConfigService.AppOptions.screens.business.sites.content.statistics;
		const radius = statistics.wifiHeatmap.config.radius;
		const maxOpacity = statistics.wifiHeatmap.config.maxOpacity;
		const minOpacity = statistics.wifiHeatmap.config.minOpacity;
		const blur = statistics.wifiHeatmap.config.blur;
		const gradient = statistics.wifiHeatmap.config.gradient;
		const config: SiteHeatmapConfigInterface = {
			container: document.querySelector('.sHeatmap') as HTMLElement,
			radius,
			maxOpacity,
			minOpacity,
			blur,
			gradient
		};

		// remove canvas
		if (heatmapInstance.current !== undefined) {
			heatmapInstance.current._renderer?.canvas.remove();
		}

		// create canvas
		heatmapInstance.current = h337.create(config);

		// set ratio
		setRatio({
			x: values.clientWidth / values.naturalWidth,
			y: values.clientHeight / values.naturalHeight,
			cx: values.clientWidth,
			cy: values.clientHeight
		});
	}, []);

	return (
		<Box className="sHeatmap">
			<Picture src={robotLocationImageUrl(name)} alt={name} onLoad={onLoad} fullWidth />
		</Box>
	);
};
export default SiteHeatmap;
