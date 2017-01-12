import { h, Component } from 'preact'

import { Card, CardTitle, CardText, CardMedia, CardActions } from 'react-toolbox/lib/card'
import Avatar from 'react-toolbox/lib/avatar'
import Button, { IconButton } from 'react-toolbox/lib/button'
import Link from 'react-toolbox/lib/link'

import style from './style'

const xpbytesLogo = require('../../../assets/work/xpbytes.png')
const vanOnsLogo = require('../../../assets/work/van-ons-min.png')
const intreeLogo = require('../../../assets/work/intree-min.png')
const sgLogo = require('../../../assets/work/sg-min.png')
const uitLogo = require('../../../assets/work/uit.png')
const evergiveLogo = require('../../../assets/work/evergive-min.png')
const paystikLogo = require('../../../assets/work/paystik-min.png')
const verechoLogo = require('../../../assets/work/verecho-min.png')
const unicefLogo = require('../../../assets/work/unicef-min.png')
const galetLogo = require('../../../assets/work/galet-min.png')
const topLogo = require('../../../assets/work/top-min.png')
const natuurLogo = require('../../../assets/work/natuur.png')
const matteLogo = require('../../../assets/work/matte.svg')
const postplannerLogo = require('../../../assets/work/postplanner.png')
const blackgateLogo = require('../../../assets/work/blackgate.svg')
const dierenfestijnLogo = require('../../../assets/work/dierenfestijn.png')
const prodinterLogo = require('../../../assets/work/prodinter.png')
const salonLogo = require('../../../assets/work/salon.png')
const thingsImpliedLogo = require('../../../assets/work/things.jpg')

export default class Experience extends Component {
	render() {
		return (
			<section className={style.experience}>
				<div className={`${style.tile} ${style.big}`}>
					<img src={xpbytesLogo} alt="XP Bytes logo" />
				</div>

				<div className={`${style.cluster} ${style.big}`}>
					<div className={style.tile}>
						<img src={intreeLogo} alt="Intreeweek logo" />
					</div>
					<div className={style.tile}>
						<img src={uitLogo} alt="UIT-week logo" />
					</div>
					<div className={style.tile}>
						<img src={natuurLogo} alt="Natuur & Milieu logo" />
					</div>
					<div className={style.tile} style={{ display: 'flex', alignSelf: 'stretch' }} >
						<img src={matteLogo} alt="Matte Logo" style={{ background: 'black', alignSelf: 'stretch', padding: '0 20px' }} />
					</div>
				</div>

				<div className={`${style.cluster} ${style.big}`}>
					<div className={style.tile}>
						<img src={verechoLogo} alt="Verecho logo" />
					</div>
					<div className={style.tile}>
						<img src={sgLogo} alt="Studium Generale Delft logo" />
					</div>
					<div className={style.tile}>
						<img src={evergiveLogo} alt="Evergive logo" />
					</div>
					<div className={style.tile}>
						<img src={paystikLogo} alt="Paystik logo" />
					</div>
				</div>

				<div className={`${style.tile} ${style.big}`}>
					<img src={thingsImpliedLogo} alt="Things Implied logo" />
				</div>

				<div className={`${style.cluster} ${style.long}`}>
					<div className={style.tile}>
						<img src={vanOnsLogo} alt="Van Ons logo" />
					</div>
					<div className={style.tile}>
						<img src={prodinterLogo} alt="Prodinter logo" />
					</div>
					<div className={style.tile}>
						<img src={postplannerLogo} alt="Post Planner logo" />
					</div>
					<div className={style.tile}>
						<img src={dierenfestijnLogo} alt="Dierenfestijn logo" />
					</div>
				</div>

				<div className={`${style.cluster} ${style.long}`}>
					<div className={style.tile} style={{ display: 'flex', alignSelf: 'stretch' }} >
						<img src={blackgateLogo} alt="Blackgate Logo" style={{ background: '#27a9e1', alignSelf: 'stretch', padding: '0 20px' }} />
					</div>
					<div className={style.tile}>
						<img src={unicefLogo} alt="Unicef logo" />
					</div>
					<div className={style.tile}>
						<img src={topLogo} alt="Tilburg Orientation Program logo" />
					</div>
					<div className={style.tile}>
						<img src={galetLogo} alt="Galet logo" />
					</div>
				</div>
				
			</section>
		)
	}
}