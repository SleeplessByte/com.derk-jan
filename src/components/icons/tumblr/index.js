import { h, Component } from 'preact'
import { IconButton } from 'react-toolbox/lib/button'

export const TumblrIcon = () => (
	<svg viewBox="0 0 24 24">
		<path d="M16,11H13V14.9C13,15.63 13.14,16 14.1,16H16V19C16,19 14.97,19.1 13.9,19.1C11.25,19.1 10,17.5 10,15.7V11H8V8.2C10.41,8 10.62,6.16 10.8,5H13V8H16M20,2H4C2.89,2 2,2.89 2,4V20A2,2 0 0,0 4,22H20A2,2 0 0,0 22,20V4C22,2.89 21.1,2 20,2Z" />
	</svg>
)

export const TumblrIconButton = (props) => (<IconButton {...props}><TumblrIcon /></IconButton>)
export default TumblrIcon
