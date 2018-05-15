import { h, Component } from 'preact'
import Card from 'preact-material-components/Card'
import Button from 'preact-material-components/Button'

import 'preact-material-components/Card/style.css'
import 'preact-material-components/Button/style.css'

import style from './style'

import Typography from 'components/Typography'
import YoutubIcon from 'components/icons/youtube'
import MediumIcon from 'components/icons/medium'
import BookIcon from 'components/icons/book'

const retroshareMedia = require('assets/retroshare.png')
const darknetMedia = require('assets/laptop.png')
const prepMedia = require('assets/medication.png')
const tedxMedia = require('assets/tedx.jpg')

const sizing = { '16-9': true }

export default class Publications extends Component {
  render() {
    return (
      <section className={style.publications} aria-label="Publications">
        <Card className={style.publication}>
          <Card.Media {...sizing}>
            <Card.CardMediaContent>
              <img
                src={tedxMedia}
                alt="TEDxDelft Salon"
                className={style['publication__image']}
              />
              <iframe
                style={{ visibility: 'hidden' }}
                onMouseOver={() => {}}
                height="300"
                src=""
                frameborder="0"
                allowfullscreen
                data-src="https://www.youtube.com/embed/mktOKzWUPN0"
              />
            </Card.CardMediaContent>
          </Card.Media>
          <div class={style['publication__content']}>
            <header>
              <Typography use="headline" tag="h2">
                {/*<Link href='http://djdex.net/tedx' active>
                  <Avatar style={{ backgroundColor: '#e62b1e' }}>
                    <YoutubIcon />
                  </Avatar>
                  </Link>*/}
                Alone in the light
              </Typography>
              <Typography use="subheading1" tag="small">
                14min talk
              </Typography>
            </header>
            <Typography
              use="body1"
              tag="p"
              theme="text-secondary-on-background"
            >
              Humans have a remarkable quality over all other species. We have
              the ability to inflict fear upon ourselves. When we're young, most
              of us are afraid of the things that live under our beds, but as we
              grow up we usually stop being scared as we know that there's
              nothing hiding. It's Ignorance that feeds our fears and the things
              we do not understand are almost instinctively seen as dangerous or
              scary. We try to find the knowledge to get out of the dark so we
              can stop fearing the unknown. But once we get to the light, it can
              be very lonely.
            </Typography>
          </div>
          <Card.Actions>
            <Button
              class="mdc-button mdc-card__action--button"
              href="http://djdex.net/tedx"
              rel="noopener noreferrer"
              accent
              flat
            >
              Watch on Youtube
            </Button>
          </Card.Actions>
        </Card>

        <Card className={style.publication} tag="article">
          <Card.Media {...sizing}>
            <Card.CardMediaContent>
              <img
                src={prepMedia}
                alt="Medicine"
                className={style['publication__image']}
              />
            </Card.CardMediaContent>
          </Card.Media>
          <div class={style['publication__content']}>
            <header>
              <Typography use="headline" tag="h2">
                {/* radio material icon */}
                PrEP and the United Kingdom
              </Typography>
              <Typography use="subheading1" tag="small">
                2.5min interview
              </Typography>
            </header>
            <Typography
              use="body1"
              tag="p"
              theme="text-secondary-on-background"
            >
              Interview by Bailey van Dijke about Pre-exposure prophylaxis
              (PrEP), a new HIV prevention approach where HIV-negative
              individuals use anti-HIV medications to reduce their risk of
              becoming infected if they are exposed to the virus and the recent
              decision by the United Kingdom parliament tol keep this prevention
              drug out of the general healthcare package.
            </Typography>
          </div>
          <Card.Actions>
            <Button
              class="mdc-button mdc-card__action--button"
              href="https://www.dropbox.com/s/1yignmnq84685xm/BaileyVanDijke_Radio1.wav?dl=0"
              accent
              flat
            >
              Listen on Dropbox
            </Button>
          </Card.Actions>
        </Card>

        <Card className={style.publication} tag="article">
          <Card.Media className={style['publication__media--4-1']}>
            <Card.CardMediaContent>
              <img
                src={retroshareMedia}
                alt="Network cable"
                className={style['publication__image']}
              />
            </Card.CardMediaContent>
          </Card.Media>
          <div class={style['publication__content']}>
            <header>
              <Typography use="headline" tag="h2">
                {/*backgroundColor: '#00AB6C' }}>
                <MediumIcon /> />*/}
                Retroshare Network Configurations
              </Typography>
              <Typography use="subheading1" tag="small">
                7min read
              </Typography>
            </header>
            <Typography
              use="body1"
              tag="p"
              theme="text-secondary-on-background"
            >
              Over the past few days there has been a lot of questions around
              the network configurations of Retroshare, an application that
              provides secure Friend-To-Friend (F2F) networks. There is not a
              lot of humanly readable documentation on the matter. I’ve been a
              Retroshare user for over 14 months at the time of writing and
              wrote this article as a part of a series on retroshare. In this
              article I’ll explain each of the four network configurations and
              their consequences.
            </Typography>
          </div>
          <Card.Actions>
            <Button
              class="mdc-button mdc-card__action--button"
              href="https://medium.com/@SleeplessByte/retroshare-network-configurations-f31225b133f1"
              accent
              flat
            >
              Read article on Medium
            </Button>
          </Card.Actions>
        </Card>

        <Card className={style.publication} tag="article">
          <Card.Media {...sizing}>
            <Card.CardMediaContent>
              <img
                src={darknetMedia}
                alt="Laptop in the darkness"
                className={style['publication__image']}
              />
            </Card.CardMediaContent>
          </Card.Media>
          <div class={style['publication__content']}>
            <header>
              <Typography use="headline" tag="h2">
                {/*
                <BookIcon /> />*/}
                Darknet - Its evolution and its problems
              </Typography>
              <Typography use="subheading1" tag="small">
                7min read
              </Typography>
            </header>
            <Typography use="body1" tag="p" theme="text-primary-on-background">
              These days we share a lot of both public and private bits and
              bytes, and when that data is somewhat private, whether it is
              music, books, images, financial data or a simple conversation, we
              usually don’t like people tapping in or logging that we are
              sharing and maybe more importantly what we are sharing.
            </Typography>
            <Typography
              use="body1"
              tag="p"
              theme="text-secondary-on-background"
            >
              The channels we use today make it so much easier to distribute
              anything we want, sadly resulting in a lot of illegal activity,
              which in turn is increasing both the means of copyright protection
              and the quality and quantity of monitoring data streams. So these
              channels have their downsides, such as their weaknes-ses when it
              comes to obscuring the act and the data itself or the pollution of
              fake fi les by agencies that try to stop our happy sharing
              activities.
            </Typography>
          </div>
          <Card.Actions>
            <Button
              class="mdc-button mdc-card__action--button"
              href="https://www.dropbox.com/s/k8zffdd9e28qreu/j16n1_website.pdf?dl=0"
              accent
              flat
            >
              Read article on Dropbox
            </Button>
          </Card.Actions>
        </Card>

        <Card className={style.publication} tag="article">
          <div class={style['publication__content']}>
            <Typography use="headline" tag="h2">
              {/*backgroundColor: '#00AB6C' }}>
              <MediumIcon /> />*/}
              Bits and pieces
            </Typography>
            <Typography use="subheading1" tag="small">
              1min read
            </Typography>
            <Typography
              use="body1"
              tag="div"
              theme="text-secondary-on-background"
            >
              Bits. Bits and pieces. Bits and Bytes. I see the spinner whilst it
              compiles. Waiting. Chunks of code. Bits and pieces. My mind
              reduced to machinery; logic; harsh, rude and singular truth. I . I
              save. I press the button. I watch the spinner. Code lights up as
              exceptions are thrown.
            </Typography>
          </div>
          <Card.Actions>
            <Button
              class="mdc-button mdc-card__action--button"
              href="https://medium.com/@SleeplessByte/bits-and-pieces-21b4bb41e880"
              accent
              flat
            >
              Read poem on Medium
            </Button>
          </Card.Actions>
        </Card>
      </section>
    )
  }
}
