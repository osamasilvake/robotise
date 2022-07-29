import { Avatar, Box, Chip, Typography } from '@mui/material';
import clsx from 'clsx';
import { ChangeEvent, FC } from 'react';
import { useTranslation } from 'react-i18next';

import { AppConfigService } from '../../../services';
import { fetchImageFromInput } from '../picture/Picture.process';
import { UploadImageChangeInterface, UploadImageInterface } from './Upload.interface';
import { UploadStyle } from './Upload.style';

const Upload: FC<UploadImageInterface> = (props) => {
	const { image, setImage, imageError, setImageError, background } = props;
	const { t } = useTranslation('UPLOAD');
	const classes = UploadStyle();

	const maxSize = AppConfigService.AppOptions.components.uploadImage.maxSize;
	const maxHeight = AppConfigService.AppOptions.components.uploadImage.maxHeight;
	const maxWidth = AppConfigService.AppOptions.components.uploadImage.maxWidth;

	/**
	 * handle image change
	 * @param event
	 */
	const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const image = (await fetchImageFromInput(event)) as UploadImageChangeInterface;
		if (image.validate) {
			setImageError(0);
			setImage(image.value);
		} else {
			setImageError(image.type);
		}
	};

	return (
		<Box>
			<Box>
				<Avatar
					variant="square"
					className={clsx({ [classes.sImageBackground]: background })}
					src={image || AppConfigService.AppImageURLs.logo.iconOff}
					alt={AppConfigService.AppImageURLs.logo.name}
				/>

				<label htmlFor="button-file">
					<Box display="none">
						<input
							accept="image/png"
							className="hidden"
							id="button-file"
							type="file"
							onChange={handleImageChange}
						/>
					</Box>
					<Chip
						size="small"
						label={t('IMAGE.LABEL')}
						color="primary"
						variant="outlined"
						clickable
						className={classes.sImageUpload}
					/>
				</label>
			</Box>
			<Box className={classes.sImageInfo}>
				<Typography variant="body2">{t('IMAGE.RULES.RULE_1')}</Typography>
				<Typography
					variant="body2"
					className={clsx({
						[classes.sImageInvalid]: imageError === 1
					})}>
					{t('IMAGE.RULES.RULE_2', {
						value: maxSize
					})}
				</Typography>
				<Typography
					variant="body2"
					className={clsx({
						[classes.sImageInvalid]: imageError === 2
					})}>
					{t('IMAGE.RULES.RULE_3', {
						value: `${maxWidth}x${maxHeight}`
					})}
				</Typography>
			</Box>
		</Box>
	);
};
export default Upload;
