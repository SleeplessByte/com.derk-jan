import * as React from 'react'
import { Component } from 'react'
import * as style from './style'

import Tile from '../tile'
import Grid from '../grid'
import Hero from '../hero'
import Header from '../header'
import Well from '../well'
// import Publications from './publications'
// import Experience from './experience'

import Loadable from 'react-loadable'

const Experience = Loadable({
  loader: () => System.import('./experience'),
  loading: () => null
})

const Publications = Loadable({
  loader: () => System.import('./publications'),
  loading: () => null
})

export default class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div class={style.home}>
        <Hero />
        <Header />
        <Well>
          <Experience />
        </Well>
        <Publications />
      </div>
    )
  }
}
