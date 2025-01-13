import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog/Blog';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import Quotes from './pages/Quotes/Quotes';

function App() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/blog" element={<Blog />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/projects" element={<Projects />} />
				<Route path="/quotes" element={<Quotes />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
