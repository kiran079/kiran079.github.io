// src/components/BlogCard.js
import React from 'react';
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';

const BlogCard = ({ title, description, id, bg, onClick }) => {
	return (
		<Card sx={{ backgroundColor: bg }}>
			<CardActionArea onClick={onClick}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{title}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{description}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default BlogCard;
