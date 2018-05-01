import { h, Component } from 'preact'

export const Typography = (props) => {
  const { use, tag, className, ...others } = props
  const typographyClass = `mdc-typography mdc-typography--${use} ${props.class || className || ''}`
  return h(tag || 'div', { ...others, class: typographyClass })
}

export default Typography
