import { h, Component } from 'preact'
import * as style from './style'

import Tile from '../tile'
import Grid from '../grid'
import Hero from '../hero'
import Header from '../header'
import Publications from '../publications'
import Experience from '../Experience'

export default class Home extends Component {

	state = {
		scrollTop: document.body.scrollTop,
		headerFixed: this.scrolledPastHeader
	}

	constructor() {
		super()

		this.onScroll = this.onScroll.bind(this)
		this.onScrolled = this.onScrolled.bind(this)
	}

	get scrolledPastHeader() {

	}

	componentDidMount() {
		this.lastScrollTop = document.body.scrollTop
		document.addEventListener('scroll', this.onScroll, { passive: true })
	}

	componentWillUnmount() {
		document.removeEventListener('scroll', this.onScroll)
	}

	onScroll() {
		requestAnimationFrame(this.onScrolled)
	}

	onScrolled() {
		const lastScrollTop = this.lastScrollTop
		const currentScrollTop = document.body.scrollTop
		const currentHeaderFixed = this.state.headerFixed

		this.lastScrollTop = currentScrollTop

		if ( currentHeaderFixed && lastScrollTop < currentScrollTop ) {
			return
		}

		if ( !currentHeaderFixed && lastScrollTop > currentScrollTop ) {
			return
		}
		
		const heroRect = this.hero.base.getBoundingClientRect()
		const headerRect = this.header.base.getBoundingClientRect()
		const headerHeight = headerRect.bottom - headerRect.top
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop

		const shouldHeaderBeFixed = heroRect.bottom - headerHeight + scrollTop <= currentScrollTop

		if ( shouldHeaderBeFixed !== currentHeaderFixed ) {
			this.setState({ headerFixed: shouldHeaderBeFixed, scrollTop: currentScrollTop })
		}
	}

	render() {
		return (
			<div class={style.home}>
				<Hero ref={(_ref) => this.hero = _ref} />
				<Header ref={(_ref) => this.header = _ref } onHero={true} fixed={this.state.headerFixed} />
				<Experience />
				<Publications />
				
			</div>
		)
	}
}