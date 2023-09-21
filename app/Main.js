import React from 'react';
import ReactDOM from 'react-dom/client';

// My Components
import Header from './components/Header';
import HomeGuest from './components/HomeGuest';
import Footer from './components/Footer';

function Main() {
	return (
		<>
			<Header />
			<HomeGuest />
			<Footer />
		</>
	);
}

const root = ReactDOM.createRoot(document.querySelector('#app'));
root.render(<Main />);

if (module.hot) {
	module.hot.accept();
}
