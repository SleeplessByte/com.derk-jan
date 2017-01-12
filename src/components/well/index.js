import { h, Component } from 'preact'
import style from './style'

export default class Well extends Component {
	render() {
		return (
			<div class={style.well}>
				{this.props.children}
			</div>
		)
	}
}
