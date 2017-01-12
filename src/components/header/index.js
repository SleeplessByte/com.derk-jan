import { h, Component } from 'preact'
import { AppBar } from 'react-toolbox/lib/app_bar'
import Navigation from 'react-toolbox/lib/navigation'
import Button from 'react-toolbox/lib/button'
import style from './style.scss'

import { GithubIconButton } from '../icons/github'
import { LinkedInIconButton } from '../icons/linkedin'
import { MediumIconButton } from '../icons/medium'
import { StackOverflowIconButton } from '../icons/stackoverflow'

import { FacebookIconButton } from '../icons/facebook'
import { TwitterIconButton } from '../icons/twitter'
import { InstagramIconButton } from '../icons/instagram'
import { TumblrIconButton } from '../icons/tumblr'

export default class Header extends Component {
	render() {
		const classNameAppbar = `${style.header} ${this.props.onHero ? style['header--on-hero'] : ''} ${this.props.fixed ? style['header--fixed'] : ''}`
		const classNameNav = style.navigation

		return (
			<AppBar title='Derk-Jan.com' className={classNameAppbar}>
				<Navigation type="horizontal" className={classNameNav}>
					<GithubIconButton href="http://djdex.net/github" inverse />
					<LinkedInIconButton href="http://djdex.net/work" inverse />
					<MediumIconButton href="http://djdex.net/medium" inverse />
					<StackOverflowIconButton href="http://djdex.net/so" inverse />

					<TwitterIconButton href="http://djdex.net/tweet" inverse />
					<FacebookIconButton href="http://djdex.net/fb" inverse />
					<InstagramIconButton href="http://djdex.net/insta" inverse />
					<TumblrIconButton href="http://djdex.net/blog" inverse />
				</Navigation>
			</AppBar>
		)
	}
}