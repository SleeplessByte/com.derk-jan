import { h, Component } from 'preact'
import BoundaryScrollTracker from 'components/boundary-scroll-tracker'
import Header from 'components/header'
import Hero from 'components/hero'
import BelowTheFold from 'async!./components/below-the-fold'

import style from './style'
import root from 'window-or-global'

function sizeOfHeaderAtWidth(width) {
  if (width > 599) {
    return 64
  }

  return 56
}

export default class Home extends Component {
  state = {
    foldBoundary: 1024
  }

  constructor(props) {
    super(props)

    this.onResize = this.onResize.bind(this)
    this.onResized = this.onResized.bind(this)

    this.onResized()
  }

  componentDidMount() {
    root.addEventListener('resize', this.onResize, { passive: true })
  }

  conponentWillUnmount() {
    root.removeEventListener('resize', this.onResize)

    if (this.rafId !== undefined) {
      cancelRequestAnimationFrame(this.rafId)
      this.rafId = undefined
    }
  }

  onResize() {
    if (this.rafId !== undefined) {
      return
    }

    this.rafId = requestAnimationFrame(this.onResized)
  }

  onResized() {
    this.rafId = undefined

    const foldBoundary =
      (root.innerHeight || 0) - sizeOfHeaderAtWidth(root.innerWidth || 0)
    if (this.state.foldBoundary !== foldBoundary) {
      this.setState({ foldBoundary })
    }
  }

  render() {
    return (
      <div class={style.home}>
        <Hero />
        <BoundaryScrollTracker
          boundary={this.state.foldBoundary}
          render={({ boundaryPassed }) => {
            return <Header fixed={boundaryPassed} />
          }}
        />
        <BelowTheFold />
      </div>
    )
  }
}
