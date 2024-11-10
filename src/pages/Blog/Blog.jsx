// src/pages/BlogPage.js
import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Button, Box, ThemeProvider, createTheme } from '@mui/material';
import BlogCard from './BlogCard';

const BlogPage = () => {
	const [blogs, setBlogs] = useState([]);
	const [selectedBlog, setSelectedBlog] = useState(null); // To store the selected blog content
    const theme = createTheme({
        typography: {
            fontFamily: 'sorts-mill-goudy',
            fontSize: 16
        }
    })

	useEffect(() => {
		const loadBlogs = async () => {
			const response = await fetch('/blogList.json');
			const blogList = await response.json();

			// Dynamically load the blog content and extract title and description
			const blogsWithMetadata = await Promise.all(
				blogList.map(async (blog) => {
					const response = await fetch(`/assets/blog/${blog.id}.txt`);
					const text = await response.text();

					const title = blog.title;
					const description = text.substring(0, 100) + '...'; // First few words as description

					return { ...blog, title, description, content: text };
				})
			);

			setBlogs(blogsWithMetadata); // Set blog data with title, description, and full content
		};

		loadBlogs();
	}, []);

	// Function to load the selected blog content
	const loadBlogContent = (id) => {
		const selected = blogs.find((blog) => blog.id === id);
		setSelectedBlog(selected); // Set the selected blog content
	};

	return (
		<>
			<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
				{!selectedBlog ? (
					<>
						<Typography variant="h4" gutterBottom>
							Blog
						</Typography>
						<Grid container spacing={4}>
							{blogs.map((blog) => (
								<Grid item xs={12} sm={6} md={4} key={blog.id}>
									<BlogCard
										id={blog.id}
										title={blog.title}
										description={blog.description}
										onClick={() => loadBlogContent(blog.id)} // Load blog content on click
									/>
								</Grid>
							))}
						</Grid>
					</>
				) : (
					<Box sx={{ mt: 4 }}>
						<Button
							variant="outlined"
							onClick={() => setSelectedBlog(null)}
							sx={{ mt: 2, mb: 2 }}
						>
							Back to Blog List
						</Button>
						<Typography variant="h3" gutterBottom align='center'>
							{selectedBlog.title}
						</Typography>
                        <ThemeProvider theme={theme} >
						<Typography
							variant="body1"
							component="pre"
							sx={{
								whiteSpace: 'pre-wrap',
								wordWrap: 'break-word',
							}}
						>
							{selectedBlog.content}
						</Typography>
                        </ThemeProvider>
					</Box>
				)}
			</Container>
		</>
	);
};

export default BlogPage;
