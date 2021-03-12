import { ThemeOptions } from '@material-ui/core';

import Overrides from './Overrides';
import Palette from './Palette';
import Typography from './Typography';

const Options: ThemeOptions = {
	spacing: (factor) => `${0.5 * factor}rem`,
	palette: Palette,
	overrides: Overrides,
	typography: Typography
};
export default Options;
