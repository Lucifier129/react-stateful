import React from 'react'
import { stateful, useState, useEffect } from './Stateful'

function CustomHook(props) {
	let [count = props.count || 0, setCount] = useState()
	let name = useFormInput('Mary')
	let surname = useFormInput('Poppins')
	let width = useWindowWidth()

	useDocumentTitle(count + ' ' + name.value + ' ' + surname.value)

	return (
		<React.Fragment>
			<div>count {count}</div>
			<div>
				<button onClick={() => setCount(count + 1)}>+1</button>{' '}
				<button onClick={() => setCount(count - 1)}>-1</button>
			</div>
			name: <input {...name} />
			<br />
			surname: <input {...surname} />
			<div>window width {width}</div>
		</React.Fragment>
	)
}

export default stateful(CustomHook)

const useDocumentTitle = title => {
	useEffect(() => (document.title = title))
}

const useWindowWidth = () => {
	let [width = window.innerWidth, setWindowWidth] = useState()
	useEffect(() => {
		let handleResize = () => setWindowWidth(window.innerWidth)
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	})
	return width
}

const useFormInput = defaultValue => {
	let [value = defaultValue, setValue] = useState()
	return {
		value,
		onChange: e => setValue(e.target.value)
	}
}
