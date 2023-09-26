import React, { useEffect } from 'react';

function Page(props) {
	useEffect(() => {
		document.title = `About Us | ComplexApp`;
		window.scrollTo(0, 0);
	}, []);

	return <></>;
}

export default Page;
