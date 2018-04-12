import * as React from 'react'
import { Component } from 'react'
import style from './style'

export default class Grid extends Component {
  render() {
    return <div class={style.grid}>{this.props.children}</div>
  }
}
