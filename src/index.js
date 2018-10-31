import React from 'react'
import ReactDOM from 'react-dom'
import Stateful, { useState, useEffect } from './Stateful'
import NormalStyle from './NormalStyle'
import HookStyle from './HookStyle'
import CustomHookStyle from './CustomHookStyle'
import CustomNormalStyle from './CustomNormalStyle'
import StatefulRenderPropStyle from './StatefulRenderPropStyle'
import RenderPropHookStyle from './RenderPropHookStyle'

const styles = {
	NormalStyle,
	HookStyle,
	CustomHookStyle,
	CustomNormalStyle,
	StatefulRenderPropStyle,
	RenderPropHookStyle
}

function Menu() {
	return (
		<div>
			{Object.keys(styles).map((name, index) => {
				return (
					<a
						key={name}
						href={`#${name}`}
						style={{ display: 'inline-block', marginLeft: 10 }}
					>
						{index + 1}.{name}
					</a>
				)
			})}
		</div>
	)
}

const useHash = () => {
	let [hash = window.location.hash, setHash] = useState()
	useEffect(() => {
		let handleHashChange = () => setHash(window.location.hash)
		window.addEventListener('hashchange', handleHashChange)
		return () => window.removeEventListener('hashchange', handleHashChange)
	})
	return hash.slice(1)
}

function App() {
	return (
		<Stateful>
			{() => {
				let style = useHash() || 'NormalStyle'
				let Target = styles[style] || NormalStyle
				return (
					<React.Fragment>
						<h1>Style {style}</h1>
						<Menu />
						<Target />
					</React.Fragment>
				)
			}}
		</Stateful>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
