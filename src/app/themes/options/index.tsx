import { ThemeOptions } from '@mui/material';

import Components from './Components';
import Palette from './Palette';
import Typography from './Typography';

const Options: ThemeOptions = {
	spacing: (factor: number) => `${0.5 * factor}rem`,
	palette: Palette,
	components: Components,
	typography: Typography
};
export default Options;
