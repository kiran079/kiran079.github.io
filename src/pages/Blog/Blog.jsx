// src/pages/BlogPage.js
import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Button, Box, ThemeProvider, createTheme, Input } from '@mui/material';
import BlogCard from './BlogCard';
import { decryptTextFile } from '../../scripts/decryptAndFetchTxt';
import { SOFT_LAVENDER, WHITE } from '../../constants/colors';

const BlogPage = () => {
	const [blogs, setBlogs] = useState([]);
	const [unlocked, setUnlocked] = useState(false);
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
					const description = text.substring(0, 80) + '...'; // First few words as description

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

	function splitOnFirstNewline(str) {
		const index = str.indexOf('\n');
		return [str.slice(0, index), str.slice(index + 1)];
	  }	  

	async function handleKeyDown(e) {
		if (e.key === 'Enter') {
			e.preventDefault();
			unlockPost();
		  }
	}

	async function unlockPost() {
		const response = await fetch('/blogListPrivate.json');
		const blogListPrivate = await response.json();
		const password = document.getElementById('password').value;

		const blogsWithMetadata = await Promise.all(
			blogListPrivate.map(async (blog) => {
				const text = await decryptTextFile(
					`/assets/blog/private/${blog.id}.txt`,
					password
				);
				if (text) {
					const split = splitOnFirstNewline(text);
					const title = split[0].trim();
					const content = split[1].trim();
					const description = content.substring(0, 80) + '...'; // First few words as description

					return { ...blog, title, description, content, private: true };
				} else {
					return null;
				}
			})
		);
		if (blogsWithMetadata && blogsWithMetadata[0]) {
			setUnlocked(true);
			setBlogs([...blogs, ...blogsWithMetadata]);
		} else {
			alert('Invalid password or failed to load post.');
		}
	  }

	const getPasswordInput = () => {
		return !unlocked ? (
			<div>
				<Input id="password" type="password" onKeyDown={(e) => handleKeyDown(e)}/>
				<Button onClick={(_) => unlockPost()}>Submit</Button>
			</div>
		) : (
			<></>
		);
	}

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
										bg={blog.private ? SOFT_LAVENDER: WHITE}
										onClick={() => loadBlogContent(blog.id)} // Load blog content on click
									/>
								</Grid>
							))}
						</Grid>
						{getPasswordInput()}
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
