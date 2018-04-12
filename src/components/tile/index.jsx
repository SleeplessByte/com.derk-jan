import * as React from 'react'
import { Component } from 'react'
import style from './style'

export default class Tile extends Component {
  render() {
    return (
      <div class={style.tile}>
        <div class={style.inner}>{this.props.children}</div>
      </div>
    )
  }
}
