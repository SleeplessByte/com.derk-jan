import * as React from 'react'
import { Component } from 'react'
import style from './style'
import background from '../../assets/header.jpg'

const HEIGHT_CHANGE_TOLERANCE = 100

export default class Hero extends Component {
  constructor() {
    super()

    this.onResize = this.onResize.bind(this)
    this.onResized = this.onResized.bind(this)

    this.state = {
      ready: false,

      needFixedViewportHeight: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ),
      viewportHeight: window.innerHeight,
      elementHeight: undefined,
      elementToViewportRatio: 1
    }
  }

  ready() {
    this.setState({ ready: true })
  }

  componentDidMount() {
    if (this.state.needFixedViewportHeight) {
      this.setState({
        viewportHeight: window.innerHeight,
        elementHeight: this.element.offsetHeight,
        elementToViewportRatio: this.element.offsetHeight / window.innerHeight
      })
      window.addEventListener('resize', this.onResize, { passive: true })
    }

    setTimeout(this.ready.bind(this), 0)
  }

  conponentWillUnmount() {
    if (this.state.needFixedViewportHeight) {
      window.removeEventListener('resize', this.onResize)
    }
  }

  onResize() {
    requestAnimationFrame(this.onResized)
  }

  onResized() {
    // Fixes the height for when the browser bar is being removed
    if (
      Math.abs(this.state.viewportHeight - window.innerHeight) >
      HEIGHT_CHANGE_TOLERANCE
    ) {
      this.setState({
        viewportHeight: window.innerHeight,
        elementHeight: window.innerHeight * this.state.elementToViewportRatio
      })
    }
  }

  render() {
    const classNameHero = `${style.hero} ${this.state.ready ? style.ready : ''}`
    const classNameOverlay = `${style.overlay}`
    const elementStyle =
      this.state.elementHeight === undefined
        ? {}
        : { height: `${this.state.elementHeight}px` }

    return (
      <div
        class={classNameHero}
        ref={_ => (this.element = _)}
        style={elementStyle}
      >
        <div class={classNameOverlay} />
        <img src={background} alt="Derk-Jan Karenbeld at Courmayeur" />
      </div>
    )
  }
}
