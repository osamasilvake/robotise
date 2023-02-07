import { Card, CardContent } from '@mui/material';
import { FC, useCallback, useEffect, useState } from 'react';

import Picture from '../../../../../../components/common/picture/Picture';
import { PictureOnLoadInterface } from '../../../../../../components/common/picture/Picture.interface';
import { CardStyle } from '../../../../../../utilities/styles/Card.style';
import { robotLocationImageUrl } from '../../../../robots/Robots.url';
import {
	SiteStatisticsWifiHeatmapCardInterface,
	SiteStatisticsWifiHeatmapCoordinatesInterface,
	SiteStatisticsWifiHeatmapRatioInterface
} from './SiteStatisticsWifiHeatmap.interface';
import { SiteStatisticsWifiHeatmapStyle } from './SiteStatisticsWifiHeatmap.style';
import SiteStatisticsWifiHeatmapCardLegend from './SiteStatisticsWifiHeatmapCardLegend';
import SiteStatisticsWifiHeatmapCardPoints from './SiteStatisticsWifiHeatmapCardPoints';

const SiteStatisticsWifiHeatmapCard: FC<SiteStatisticsWifiHeatmapCardInterface> = (props) => {
	const { wifiHeatmap, mapId } = props;
	const classes = SiteStatisticsWifiHeatmapStyle();
	const cardClasses = CardStyle();

	const [ratio, setRatio] = useState<SiteStatisticsWifiHeatmapRatioInterface>({
		x: 0,
		y: 0,
		cx: 0,
		cy: 0
	});
	const [points, setPoints] = useState<SiteStatisticsWifiHeatmapCoordinatesInterface[] | null>();

	useEffect(() => {
		const map = wifiHeatmap.content?.maps?.data?.find((m) => m.id === mapId);
		const origin = map?.origin;
		const resolution = map?.resolution;
		if (origin && resolution && ratio) {
			if (wifiHeatmap.content?.data?.length) {
				setPoints(
					wifiHeatmap.content.data.map((point) => {
						const x = (Math.abs(origin[0] - point.x) / resolution) * ratio.x;
						const y = (Math.abs(origin[1] - point.y) / resolution) * ratio.y;
						return {
							x: x > 0 ? x % ratio.cx : x,
							y: y > 0 ? y % ratio.cy : y,
							oX: point.x,
							oY: point.y,
							value: point.signalStrength
						};
					})
				);
			} else {
				setPoints([]);
			}
		}
	}, [wifiHeatmap.content, mapId, ratio]);

	/**
	 * on image load
	 * @param values
	 */
	const onLoad = useCallback((values: PictureOnLoadInterface) => {
		setRatio({
			x: values.clientWidth / values.naturalWidth,
			y: values.clientHeight / values.naturalHeight,
			cx: values.clientWidth,
			cy: values.clientHeight
		});
	}, []);

	return mapId ? (
		<Card square elevation={1} className={classes.cCard}>
			<CardContent className={cardClasses.sCardContent0}>
				<Picture src={robotLocationImageUrl(mapId)} alt={mapId} onLoad={onLoad} fullWidth />

				{/* Legend */}
				<SiteStatisticsWifiHeatmapCardLegend />

				{/* Points */}
				{points && !!points.length && !!points[0].x && (
					<SiteStatisticsWifiHeatmapCardPoints points={points} />
				)}
			</CardContent>
		</Card>
	) : null;
};
export default SiteStatisticsWifiHeatmapCard;
