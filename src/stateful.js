import React from 'react'

let currentInstance = null
let currentIndex = 0

export function useState(initValue) {
	let [state = initValue, setState] = currentInstance.getState(currentIndex++)
	return [state, setState]
}

export function useEffect(f) {
	currentInstance.pushEffect(f)
}

export default class Stateful extends React.Component {
	effects = []
	cleans = []
	state = {
		list: []
	}
	pushEffect = f => {
		this.effects.push(f)
	}
	performEffects() {
		let { effects, cleans } = this
		this.cleanUp()
		while (effects.length) {
			cleans.push(effects.shift()())
		}
	}
	cleanUp() {
		let { cleans } = this
		while (cleans.length) {
			let clean = cleans.shift()
			if (typeof clean === 'function') {
				clean()
			}
		}
	}
	componentDidMount() {
		this.performEffects()
	}
	componentDidUpdate() {
		this.performEffects()
	}
	componentWillUnmount() {
		this.cleanUp()
	}
	updateState = index => state => {
		let { list } = this.state
		let newList = list.concat()
		newList[index] = state
		this.setState({ list: newList })
	}
	getState = index => {
		let { list } = this.state
		return [list[index], this.updateState(index)]
	}
	createStates(length) {
		return Array.from({ length }).map((_, i) => this.getState(i))
	}
	render() {
		currentInstance = this
		currentIndex = 0
		let view = this.props.children(
			this.pushEffect,
			...this.createStates(this.props.children.length - 1)
		)
		currentInstance = null
		return view
	}
}

export function stateful(functionComponent) {
	function OutputComponent(props) {
		return <Stateful>{functionComponent.bind(null, props)}</Stateful>
	}
	let name = functionComponent.name || functionComponent.displayName
	OutputComponent.displayName = `stateful(${name})`
	return OutputComponent
}
