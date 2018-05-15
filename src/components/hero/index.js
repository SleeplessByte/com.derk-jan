import { h, Component } from 'preact'
import style from './style'
import background from 'assets/header.jpg'

import root from 'window-or-global'

const HEIGHT_CHANGE_TOLERANCE = 100

export default class Hero extends Component {
  constructor() {
    super()

    this.onResize = this.onResize.bind(this)
    this.onResized = this.onResized.bind(this)

    this.state = {
      ready: false,

      needFixedViewportHeight: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        (typeof navigator !== 'undefined' && navigator.userAgent) || 'SSR'
      ),
      viewportHeight: root.innerHeight || 1024,
      elementHeight: undefined,
      elementToViewportRatio: 1
    }
  }

  ready() {
    this.setState({ ready: true })
  }

  componentDidMount() {
    if (this.state.needFixedViewportHeight) {
      const height = root.innerHeight || 1024
      this.setState({
        viewportHeight: height,
        elementHeight: this.element.offsetHeight,
        elementToViewportRatio: this.element.offsetHeight / height
      })
      root.addEventListener('resize', this.onResize, { passive: true })
    }

    setTimeout(this.ready.bind(this), 0)
  }

  conponentWillUnmount() {
    if (this.state.needFixedViewportHeight) {
      root.removeEventListener('resize', this.onResize)
    }
  }

  onResize() {
    requestAnimationFrame(this.onResized)
  }

  onResized() {
    // Fixes the height for when the browser bar is being removed
    const height = root.innerHeight || 1024
    if (
      Math.abs(this.state.viewportHeight - height) > HEIGHT_CHANGE_TOLERANCE
    ) {
      this.setState({
        viewportHeight: height,
        elementHeight: height * this.state.elementToViewportRatio
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
      <figure
        class={classNameHero}
        ref={_ => (this.element = _)}
        style={elementStyle}
      >
        <div class={classNameOverlay} />
        <img src={background} alt="Derk-Jan Karenbeld at Courmayeur" />
      </figure>
    )
  }
}
