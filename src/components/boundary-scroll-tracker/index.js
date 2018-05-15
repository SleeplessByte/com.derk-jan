import { h, Component } from 'preact'
import root from 'window-or-global'

const document = root.document

export class BoundaryScrollTracker extends Component {
  state = {
    boundaryPassed: false
  }

  constructor(props) {
    super(props)

    this.onScroll = this.onScroll.bind(this)
    this.onScrolled = this.onScrolled.bind(this)

    this.onScrolled()
  }

  componentDidMount() {
    this.lastScrollTop = (document && document.body.scrollTop) || 0
    document &&
      document.addEventListener('scroll', this.onScroll, { passive: true })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.boundary !== this.props.boundary) {
      this.onScroll()
    }
  }

  componentWillUnmount() {
    document && document.removeEventListener('scroll', this.onScroll)
    if (this.rafId !== undefined) {
      cancelRequestAnimationFrame(this.rafId)
      this.rafId = undefined
    }
  }

  onScroll() {
    if (this.rafId !== undefined) {
      return
    }

    this.rafId = requestAnimationFrame(this.onScrolled)
  }

  onScrolled() {
    this.rafId = undefined

    const currentScrollTop = (document && document.body.scrollTop) || 0
    const scrollTop =
      root.pageYOffset || (document && document.documentElement.scrollTop) || 0
    const boundaryPassed = this.props.boundary - scrollTop <= currentScrollTop

    if (boundaryPassed !== this.state.boundaryPassed) {
      this.setState({ boundaryPassed })
    }
  }

  render() {
    return this.props.render(this.state)
  }
}

export default BoundaryScrollTracker
