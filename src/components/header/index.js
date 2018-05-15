import { h, Component, cloneElement } from 'preact'
import { route } from 'preact-router'
import Toolbar from 'preact-material-components/Toolbar'
import 'preact-material-components/Toolbar/style.css'
import Menu from 'preact-material-components/Menu'
import 'preact-material-components/List/style.css'
import 'preact-material-components/Menu/style.css'

import style from './style'

import Github from '../icons/github'
import LinkedIn from '../icons/linkedin'
import Medium from '../icons/medium'
import StackOverflow from '../icons/stackoverflow'
import Facebook from '../icons/facebook'
import Twitter from '../icons/twitter'
import Instagram from '../icons/instagram'
import Tumblr from '../icons/tumblr'

const linkTo = path => () => {
  route(path)
}

const goHome = linkTo('/')

const externalIcon = (Icon, { href, title }) => props => {
  const { className } = props
  const additionalClass = props.class || className || ''
  return (
    <Toolbar.Icon
      href={href}
      class={`${style['toolbar__icon']} ${additionalClass}`}
      rel="noopener noreferrer"
      title={title}
    >
      <Icon class={style['toolbar__icon-inner']} />
    </Toolbar.Icon>
  )
}

const GithubIcon = externalIcon(Github, {
  href: 'http://djdex.net/github',
  title: '@SleeplessByte on Github'
})
const LinkedInIcon = externalIcon(LinkedIn, {
  href: 'http://djdex.net/work',
  title: 'Derk-Jan Karrenbeld on LinkedIn'
})
const MediumIcon = externalIcon(Medium, {
  href: 'http://djdex.net/medium',
  title: 'Derk-Jan Karrenbeld on Medium'
})
const StackOverflowIcon = externalIcon(StackOverflow, {
  href: 'http://djdex.net/so',
  title: 'Derk-Jan Karrenbeld on StackOverflow'
})
const TwitterIcon = externalIcon(Twitter, {
  href: 'http://djdex.net/tweet',
  title: '@SleeplessByte on Twitter'
})
const FacebookIcon = externalIcon(Facebook, {
  href: 'http://djdex.net/fb',
  title: 'Derk-Jan Karrenbeld on Facebook'
})
const InstagramIcon = externalIcon(Instagram, {
  href: 'http://djdex.net/insta',
  title: '@SleeplessByte on Instagram'
})
const TumblrIcon = externalIcon(Tumblr, {
  href: 'http://djdex.net/fb',
  title: 'Derk-Jan on Tumblr'
})

const hiddenStyle = { display: 'none' }
const visibleStyle = {}

class Overflowable extends Component {
  renderOverflow() {
    return (
      <Menu.Anchor style={this.props.overflow ? visibleStyle : hiddenStyle}>
        <Toolbar.Icon
          class={style['toolbar__icon']}
          onclick={e => {
            this.overflowMenu.MDComponent.open = true
          }}
        >
          <svg
            class={style['toolbar__icon-inner']}
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </Toolbar.Icon>
        <Menu
          ref={menu => {
            this.overflowMenu = menu
          }}
          class={style.overflow}
        >
          {this.renderChildren(true)}
        </Menu>
      </Menu.Anchor>
    )
  }

  renderRegular() {
    return (
      <div
        style={this.props.overflow ? hiddenStyle : visibleStyle}
        class={style['header__menu-list']}
      >
        {this.renderChildren(false)}
      </div>
    )
  }

  renderChildren(overflow) {
    return this.props.children.map(child => cloneElement(child, { overflow }))
  }

  render() {
    return (
      <Toolbar.Section align-end class={style['header__overflow']}>
        {this.renderOverflow()}
        {this.renderRegular()}
      </Toolbar.Section>
    )
  }

  componentWillUnmount() {
    if (this.overflowMenu) {
      this.overflowMenu.MDComponent.open = false
    }
  }
}

class OverflowableItem extends Component {
  constructor(props) {
    super(props)

    this.onClick = this.onClick.bind(this)
    this.setIconRef = this.setIconRef.bind(this)
  }

  onClick() {
    this.icon.base.click()
  }

  setIconRef(iconRef) {
    this.icon = iconRef
  }

  render() {
    if (this.props.overflow) {
      return this.renderAsOverflowMenuItem()
    }

    const Icon = this.props.icon
    return <Icon />
  }

  renderAsOverflowMenuItem() {
    const Icon = this.props.icon
    return (
      <Menu.Item class={style['overflow__item']} onClick={this.onClick}>
        <Icon class={style['overflow__icon']} ref={this.setIconRef} />
        {this.props.label}
      </Menu.Item>
    )
  }
}

Overflowable.Item = OverflowableItem

export default class Header extends Component {
  render({ fixed }) {
    const className = `${style.header} ${fixed ? style['header--fixed'] : ''}`
    return (
      <Toolbar class={className} tag="header">
        <Toolbar.Row>
          <Toolbar.Section align-start tag="h1" class={style['header__title']}>
            <Toolbar.Title onClick={goHome}>Derk-Jan.com</Toolbar.Title>
          </Toolbar.Section>
          <Overflowable overflow={fixed}>
            <Overflowable.Item icon={GithubIcon} label="Github" />
            <Overflowable.Item icon={LinkedInIcon} label="LinkedIn" />
            <Overflowable.Item icon={MediumIcon} label="Medium" />
            <Overflowable.Item
              icon={StackOverflowIcon}
              label="Stack Overflow"
            />
            <Overflowable.Item icon={TwitterIcon} label="Twitter" />
            <Overflowable.Item icon={FacebookIcon} label="Facebook" />
            <Overflowable.Item icon={InstagramIcon} label="Instagram" />
            <Overflowable.Item icon={TumblrIcon} label="Tumblr" />
          </Overflowable>
        </Toolbar.Row>
      </Toolbar>
    )
  }
}
