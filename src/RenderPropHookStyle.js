import React from 'react'
import Stateful, { useState, useEffect } from './Stateful'

export default function RenderPropHookStyle(props) {
	return (
		<Stateful>
			{() => {
				let [count = props.count || 0, setCount] = useState()
				let [name = 'Mary', setName] = useState()
				let [surname = 'Poppins', setSurname] = useState()
				let [width = window.innerWidth, setWindowWidth] = useState()

				useEffect(() => {
					document.title = count + ' ' + name + ' ' + surname
				})

				useEffect(() => {
					let handleResize = () => setWindowWidth(window.innerWidth)
					window.addEventListener('resize', handleResize)
					return () => window.removeEventListener('resize', handleResize)
				})

				return (
					<React.Fragment>
						<div>count {count}</div>
						<div>
							<button onClick={() => setCount(count + 1)}>+1</button>{' '}
							<button onClick={() => setCount(count - 1)}>-1</button>
						</div>
						name: <input value={name} onChange={e => setName(e.target.value)} />
						<br />
						surname:{' '}
						<input value={surname} onChange={e => setSurname(e.target.value)} />
						<div>window width {width}</div>
					</React.Fragment>
				)
			}}
		</Stateful>
	)
}
