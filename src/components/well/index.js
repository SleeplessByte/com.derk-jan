import * as React from 'react'
import { Component } from 'react'
import style from './style'

export default class Well extends Component {
  render() {
    return <div class={style.well}>{this.props.children}</div>
  }
}
