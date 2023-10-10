import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Axios from 'axios';
Axios.defaults.baseURL = 'http://localhost:8080';

// My Components
import Header from './components/Header';
import Home from './components/Home';
import HomeGuest from './components/HomeGuest';
import Footer from './components/Footer';
import About from './components/About';
import Terms from './components/Terms';
import CreatePost from './components/CreatePost';

function Main() {
	const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem('complexappToken')));

	return (
		<BrowserRouter>
			<Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
			<Routes>
				<Route path='/' element={loggedIn ? <Home /> : <HomeGuest />} />
				<Route path='/create-post' element={<CreatePost />} />
				<Route path='/about-us' element={<About />} />
				<Route path='/terms' element={<Terms />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

const root = ReactDOM.createRoot(document.querySelector('#app'));
root.render(<Main />);

if (module.hot) {
	module.hot.accept();
}
