import React from 'react'
import ReactDOM from 'react-dom/client'

function ExampleComponent() {
	return (
		<div>
			<h1>This is Example</h1>
			<p>The sky is blue.</p>
		</div>
	)
}

const root = ReactDOM.createRoot(document.querySelector('#app'))
root.render(<ExampleComponent />)

if (module.hot) {
	module.hot.accept()
}
