import { h, Component } from 'preact'
import { AppBar } from 'react-toolbox/lib/app_bar'
import Navigation from 'react-toolbox/lib/navigation'
import Button from 'react-toolbox/lib/button'
import style from './style'

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
          <GithubIconButton href="http://djdex.net/github" inverse title="@SleeplessByte on Github" alt="Github"/>
          <LinkedInIconButton href="http://djdex.net/work" inverse title="Derk-Jan Karrenbeld on LinkedIn" alt="LinkedIn"/>
          <MediumIconButton href="http://djdex.net/medium" inverse title="Derk-Jan Karrenbeld on Medium" alt="Medium" />
          <StackOverflowIconButton href="http://djdex.net/so" inverse title="Derk-Jan Karrenbeld on StackOverflow" alt="StackOverflow" />

          <TwitterIconButton href="http://djdex.net/tweet" inverse title="@SleeplessByte on Twitter" alt="Twitter" />
          <FacebookIconButton href="http://djdex.net/fb" inverse title="Derk-Jan Karrenbeld on Facebook" alt="Facebook" />
          <InstagramIconButton href="http://djdex.net/insta" inverse title="@SleeplessByte on Instagram" alt="Instagram" />
          <TumblrIconButton href="http://djdex.net/blog" inverse title="Derk-Jan on Tumblr" alt="Tumblr" />
        </Navigation>

        
      </AppBar>
    )
  }
}