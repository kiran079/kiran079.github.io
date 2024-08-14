import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { FIRST_NAME, LAST_NAME } from '../constants/general';

function Header() {
	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6" style={{ flexGrow: 1 }}>
					{`${FIRST_NAME} ${LAST_NAME}`}
				</Typography>
				<Button color="inherit" component={Link} to="/">
					Home
				</Button>
				<Button color="inherit" component={Link} to="/about">
					About
				</Button>
				<Button color="inherit" component={Link} to="/blog">
					Blog
				</Button>
				<Button color="inherit" component={Link} to="/projects">
					Projects
				</Button>
				<Button color="inherit" component={Link} to="/contact">
					Contact
				</Button>
			</Toolbar>
		</AppBar>
	);
}

export default Header;
