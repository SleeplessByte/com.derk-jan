import { h, Component } from 'preact'
import style from './style'

export default class Grid extends Component {
	render() {
		return (
			<div class={style.grid}>
				{this.props.children}
			</div>
		)
	}
}
