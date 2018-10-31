import React from 'react'
import { stateful } from './Stateful'

function CustomNormal(
	props,
	useEffect,
	[count = props.count || 0, setCount],
	$name,
	$surname,
	$width
) {
	let name = useFormInput('Mary', ...$name)
	let surname = useFormInput('Poppins', ...$surname)
	let width = useWindowWidth(useEffect, ...$width)
	useDocumentTitle(useEffect, count + ' ' + name.value + ' ' + surname.value)

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

export default stateful(CustomNormal)

const useDocumentTitle = (useEffect, title) => {
	useEffect(() => (document.title = title))
}

const useWindowWidth = (
	useEffect,
	width = window.innerWidth,
	setWindowWidth
) => {
	useEffect(() => {
		let handleResize = () => setWindowWidth(window.innerWidth)
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	})
	return width
}

const useFormInput = (defaultValue, value = defaultValue, setValue) => {
	return {
		value,
		onChange: e => setValue(e.target.value)
	}
}
