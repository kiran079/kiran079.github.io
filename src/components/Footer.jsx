import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
	return (
		<Box mt={5} py={3} bgcolor="grey.200" textAlign="center">
			<Typography variant="body1">
				&copy; 2024. All rights reserved.
			</Typography>
		</Box>
	);
}

export default Footer;
