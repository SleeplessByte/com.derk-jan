import * as React from 'react'
import { Component } from 'react'
import {
  Toolbar,
  ToolbarRow,
  ToolbarTitle,
  ToolbarIcon,
  ToolbarSection
} from 'rmwc/Toolbar'
import { Button } from 'rmwc/Button'
import style from './style'

import { GithubToolbarIcon as Github } from '../icons/github'
import { LinkedInToolbarIcon as LinkedIn } from '../icons/linkedin'
import { MediumToolbarIcon as Medium } from '../icons/medium'
import { StackOverflowToolbarIcon as StackOverflow } from '../icons/stackoverflow'
import { FacebookToolbarIcon as Facebook } from '../icons/facebook'
import { TwitterToolbarIcon as Twitter } from '../icons/twitter'
import { InstagramToolbarIcon as Instagram } from '../icons/instagram'
import { TumblrToolbarIcon as Tumblr } from '../icons/tumblr'

export default class Header extends Component {
  render() {
    const classNameAppbar = style.header

    return (
      <Toolbar className={classNameAppbar} fixed waterfall flexible>
        <ToolbarRow>
          <ToolbarSection alignStart>
            <ToolbarTitle>Derk-Jan.com</ToolbarTitle>
          </ToolbarSection>

          <ToolbarSection alignEnd>
            <Github
              href="http://djdex.net/github"
              inverse
              title="@SleeplessByte on Github"
              alt="Github"
              className={style.icon}
            />
            <LinkedIn
              href="http://djdex.net/work"
              inverse
              title="Derk-Jan Karrenbeld on LinkedIn"
              alt="LinkedIn"
              className={style.icon}
            />
            <Medium
              href="http://djdex.net/medium"
              inverse
              title="Derk-Jan Karrenbeld on Medium"
              alt="Medium"
              className={style.icon}
            />
            <StackOverflow
              href="http://djdex.net/so"
              inverse
              title="Derk-Jan Karrenbeld on StackOverflow"
              alt="StackOverflow"
              className={style.icon}
            />
            <Twitter
              href="http://djdex.net/tweet"
              inverse
              title="@SleeplessByte on Twitter"
              alt="Twitter"
              className={style.icon}
            />
            <Facebook
              href="http://djdex.net/fb"
              inverse
              title="Derk-Jan Karrenbeld on Facebook"
              alt="Facebook"
              className={style.icon}
            />
            <Instagram
              href="http://djdex.net/insta"
              inverse
              title="@SleeplessByte on Instagram"
              alt="Instagram"
              className={style.icon}
            />
            <Tumblr
              href="http://djdex.net/blog"
              inverse
              title="Derk-Jan on Tumblr"
              alt="Tumblr"
              className={style.icon}
            />
          </ToolbarSection>
        </ToolbarRow>
      </Toolbar>
    )
  }
}
