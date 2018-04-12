import * as React from 'react'
import { Component } from 'react'
import {
  Card,
  CardPrimaryAction,
  CardMedia,
  CardAction,
  CardActions,
  CardActionButtons,
  CardActionIcons
} from 'rmwc/Card'
import { Button } from 'rmwc/Button'
import { Typography } from 'rmwc/Typography'

import style from './style'

import YoutubIcon from '../../icons/youtube'
import MediumIcon from '../../icons/medium'
import BookIcon from '../../icons/book'

const retroshareMedia = require('../../../assets/retroshare.png')
const darknetMedia = require('../../../assets/laptop.png')
const prepMedia = require('../../../assets/medication.png')

export default class Publications extends Component {
  render() {
    return (
      <section className={style.publications}>
        <Card className={style.publication} style={{ width: 'initial' }}>
          <CardPrimaryAction>
            <CardMedia
              sixteenByNine
              style={{ background: 'url(../assets/tedx.jpg)' }}
            >
              <iframe
                style={{ visibility: 'hidden' }}
                onMouseOver={() => {}}
                height="300"
                src=""
                frameborder="0"
                allowfullscreen
                data-src="https://www.youtube.com/embed/mktOKzWUPN0"
              />
            </CardMedia>
            <div style={{ padding: '0 1rem 1rem 1rem' }}>
              <Typography use="title" tag="h2">
                {/*<Link href='http://djdex.net/tedx' active>
                  <Avatar style={{ backgroundColor: '#e62b1e' }}>
                    <YoutubIcon />
                  </Avatar>
                  </Link>*/}
                Alone in the light
              </Typography>
              <Typography
                use="body1"
                tag="div"
                theme="text-secondary-on-background"
              >
                Humans have a remarkable quality over all other species. We have
                the ability to inflict fear upon ourselves. When we're young,
                most of us are afraid of the things that live under our beds,
                but as we grow up we usually stop being scared as we know that
                there's nothing hiding. It's Ignorance that feeds our fears and
                the things we do not understand are almost instinctively seen as
                dangerous or scary. We try to find the knowledge to get out of
                the dark so we can stop fearing the unknown. But once we get to
                the light, it can be very lonely.
              </Typography>
            </div>
          </CardPrimaryAction>

          <CardActions>
            <CardActionButtons>
              <CardAction href="http://djdex.net/tedx" accent flat>
                Watch on Youtube
              </CardAction>
            </CardActionButtons>
          </CardActions>
        </Card>
        {/*

				<Card className={style.publication} style={{ width: 'initial' }}>
					<CardMedia>
						<img src={prepMedia} alt='Medication' style={{ maxWidth: '100%' }} />
					</CardMedia>
					<CardTitle avatar={(
						<Link href='https://www.dropbox.com/s/9jvmkiksh2zciwy/BaileyVanDijke_Radio1.wav?dl=0' active>
							<Avatar icon='radio' />
						</Link>
					)} title='PrEP and the United Kingdom' subtitle='2.5min interview' />
					<CardText style={{ lineHeight: '1.5' }}>
						Interview by Bailey van Dijke about Pre-exposure prophylaxis (PrEP), a new HIV prevention approach where HIV-negative individuals use anti-HIV
						medications to reduce their risk of becoming infected if they are exposed to the virus and the recent decision by the United Kingdom parliament tol keep
						this prevention drug out of the general healthcare package.
					</CardText>
					<CardActions>
						<Button href="https://www.dropbox.com/s/9jvmkiksh2zciwy/BaileyVanDijke_Radio1.wav?dl=0" accent flat label='Listen on Dropbox' />
					</CardActions>
				</Card>

				<Card className={style.publication} style={{ width: 'initial' }}>
					<CardMedia>
						<img src={retroshareMedia} alt='Network cable' style={{ maxWidth: '100%' }} />
					</CardMedia>
					<CardTitle avatar={(
						<Link href='https://medium.com/@SleeplessByte' active>
							<Avatar style={{ backgroundColor: '#00AB6C' }}>
								<MediumIcon />
							</Avatar>
						</Link>
					)} title='Retroshare Network Configurations' subtitle='7min read' />
					<CardText style={{ lineHeight: '1.5' }}>
						Over the past few days there has been a lot of questions around the network configurations of Retroshare, an application that provides secure
						Friend-To-Friend (F2F) networks. There is not a lot of humanly readable documentation on the matter. I’ve been a Retroshare user for over 14 months at
						the time of writing and wrote this article as a part of a series on retroshare. In this article I’ll explain each of the four network configurations and
						their consequences.
					</CardText>
					<CardActions>
						<Button href="https://medium.com/@SleeplessByte/retroshare-network-configurations-f31225b133f1" accent flat label='Read article on Medium' />
					</CardActions>
				</Card>

				<Card className={style.publication} style={{ width: 'initial' }}>
					<CardMedia>
						<img src={darknetMedia} alt='Laptop in the darkness' style={{ maxWidth: '100%' }} />
					</CardMedia>
					<CardTitle avatar={(
						<Link href='https://www.dropbox.com/s/k8zffdd9e28qreu/j16n1_website.pdf?dl=0' active>
							<Avatar>
								<BookIcon />
							</Avatar>
						</Link>
					)} title='Darknet' subtitle='10min read' />
					<CardText style={{ lineHeight: '1.5' }}>
						These days we share a lot of both public and private bits and bytes, and when that data is somewhat private, whether it is music, books, images, financial
						data or a simple conversation, we usually don’t like people  tapping in or logging that we are sharing and maybe more importantly what we are sharing.
					</CardText>
					<CardText style={{ lineHeight: '1.5' }}>
						The channels we use today make it so much easier to distribute anything we want, sadly resulting in a lot of illegal activity, which in turn is increasing both
						the means of copyright protection and the quality and quantity of monitoring data streams. So these channels have their downsides, such as their weaknes-ses when
						it comes to obscuring the act and the data itself or the pollution of fake fi les by agencies that try to stop our happy sharing activities.
					</CardText>
					<CardActions>
						<Button href="https://www.dropbox.com/s/k8zffdd9e28qreu/j16n1_website.pdf?dl=0" accent flat label='Read article on Dropbox' />
					</CardActions>
				</Card>

				<Card className={style.publication} style={{ width: 'initial' }}>
					<CardTitle avatar={(
						<Link href='https://medium.com/@SleeplessByte' active>
							<Avatar style={{ backgroundColor: '#00AB6C' }}>
								<MediumIcon />
							</Avatar>
						</Link>
					)} title='Bits. And pieces' subtitle='1min read' />
					<CardText style={{ lineHeight: '1.5' }}>
						Bits. Bits and pieces. Bits and Bytes. I see the spinner whilst it compiles. Waiting. Chunks of code. Bits and pieces.
						My mind reduced to machinery; logic; harsh, rude and singular truth.
						I . I save. I press the button. I watch the spinner. Code lights up as exceptions are thrown.
					</CardText>
					<CardActions>
						<Button href="https://medium.com/@SleeplessByte/bits-and-pieces-21b4bb41e880" accent flat label='Read poem on Medium' />
					</CardActions>
        </Card>
        */}
      </section>
    )
  }
}
