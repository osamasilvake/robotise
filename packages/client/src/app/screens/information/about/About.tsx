import { Box, CardMedia, Divider, Grid, Paper, Typography } from '@material-ui/core';
import { FC } from 'react';

import PageHead from '../../../components/content/page-head/PageHead';

const About: FC = () => {
	return (
		<Paper square elevation={12} component="section">
			{/* Page Head */}
			<PageHead title="ABOUT.TITLE" description="ABOUT.DESCRIPTION" />

			{/* Content */}
			<Grid container>
				<Grid item xs={false} sm={6} md={4}>
					<Typography variant="h6">Robotise AG</Typography>
					<Typography variant="body1">Claudius-Keller-Str. 3c</Typography>
					<Typography variant="body1">81669 München</Typography>
					<Typography variant="body1">Oliver Stahl</Typography>
					<br />
					<Typography variant="h6">Contact</Typography>
					<Typography variant="body1">Telefon: +49 89 890 828 41</Typography>
					<Typography variant="body1">E-Mail: info@robotise.eu</Typography>
					<br />
					<Typography variant="h6">Register Entry</Typography>
					<Typography variant="body1">Register Court: München</Typography>
					<Typography variant="body1">Register No.: 262463</Typography>
				</Grid>
				<Grid item xs={12} sm={6} md={8}>
					<CardMedia
						component="iframe"
						src="https://player.vimeo.com/video/478088838?background=1&allow=autoplay"
					/>
				</Grid>
			</Grid>

			<Divider light />

			<Box>
				<Typography variant="h6">Jeeves</Typography>
				<Typography variant="body1">
					The multi-point service robot JEEVES is the first service robot by Robotise, is
					used in hotels, healthcare facilities, offices, airports and many other
					settings. His main duty is to transport materials and products. Thanks to his
					spacious drawers and intelligent route planning, JEEVES can service multiple
					points in a single run. Optionally, he can be loaded with a set range of items.
					All of these features allow him to provide an unrivalled range of services.
				</Typography>
				<br />
				<Typography variant="h6">RB-130</Typography>
				<Typography variant="body1">
					Our RB-130 is a medium-sized, compact, autonomous, mobile service robot designed
					for indoor use and with a focus on safety. Our robot base has unique
					capabilities for 24/7 operation in close proximity to humans and builds on our
					know-how and experience from existing applications in the hospitality industry.
					The robot base introduces a completely new level of security in professional and
					production environments for collaborative use scenarios. Our robot uses a
					differential drive train, has expandable power and connection options and
					modular components to perform all tasks smoothly and reliably.
				</Typography>
				<br />
				<Typography variant="h6">The highest safety measures</Typography>
				<Typography variant="body1">
					Our robots employ the very latest safety sensors in order to safely navigate
					around humans, stairs and other obstacles. The sensors also stop them
					instantaneously and safely in critical situations. The latest standards were
					applied during development and experienced partners and certification
					institutions were involved in product development. Our mission is to provide
					unsurpassed safety.
				</Typography>
				<br />
				<Typography variant="h6">Riding the elevator</Typography>
				<Typography variant="body1">
					Our robots work with the elevators in your building. We do this by working with
					the manufacturer to install an interface in the elevator which JEEVES can use to
					call the elevator car. Most elevator systems can be easily retrofitted to work
					with JEEVES, and we can provide a choice of solutions. Tell us which type of
					elevator you have, and we’ll take care of the rest.
				</Typography>
			</Box>
		</Paper>
	);
};
export default About;
