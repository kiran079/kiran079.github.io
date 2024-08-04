import React from 'react';
import { Container, Typography } from '@mui/material';

function Home() {
	return (
		<Container>
			<Typography variant="h2" gutterBottom>
				Home
			</Typography>
			<Typography variant="body1">
				Welcome to my personal website!
			</Typography>
		</Container>
	);
}

export default Home;
