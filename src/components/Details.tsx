import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import YouTube, { YouTubeProps } from 'react-youtube'
import { useAppDispatch } from '../state/hooks'
import './css/details.css'

export const Details = () => {
  const { type, id } = useParams()
  const [data, setData] = useState<ContentDetails>()
  const [graphicProps, setGraphicProps] = useState<GraphicProps>({
    keys: [],
    imgBaseURL: '',
    backdrop_path: '',
    title: ''
  })

  const imgBaseURL = 'https://image.tmdb.org/t/p/original/'

  useEffect(() => {
    (async () => {
      if(type && id) {
        const details = await getDetails(type, id)
        const trailers = await getTrailer(type, id)

        setGraphicProps({
          keys: trailers.map((e: any) => e.key),
          imgBaseURL,
          backdrop_path: details.backdrop_path,
          title: details.title
        })

        setData(details)
      }
    })()
  }, [])

  return (
    <>
      <Link className = "detailsBack" to="/">
        <FontAwesomeIcon className = "detailsIkonica" icon={faChevronLeft}/>
        Back
      </Link>
      <Graphic {...graphicProps} />
      <h1 className='detailsTitle'>{data?.title}</h1>
      <p className='detailsOverview'>{data?.overview}</p>
    </>
  )
}

type GraphicProps = {
  keys: string[],
  imgBaseURL: string,
  backdrop_path: string,
  title: string
}

type ContentDetails = {
  backdrop_path: string,
  title: string,
  overview: string
}

async function getDetails(type: string, id: string): Promise<ContentDetails> {
  const URL = `https://api.themoviedb.org/3/${type}/${id}?api_key=81f7c3bbaaf367b164d04c5fb28e6101&language=en-US`

  let out = await axios.get(URL)

  if(type == 'tv') return {
    backdrop_path: out.data.backdrop_path,
    title: out.data.name,
    overview: out.data.overview
  }
  else return out.data
}

async function getTrailer(type: string, id: string): Promise<any> {
  const url = `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=81f7c3bbaaf367b164d04c5fb28e6101&language=en-US`

  return await axios.get(url).then(response => {
    return response.data.results.filter((e: any) => e.type == 'Trailer')
  }).then(obj => { return obj ? obj : undefined })
}

const Graphic = (props: GraphicProps) => {
  const [draw, setDraw] = useState(true)
  const [index, setIndex] = useState(0)
  const [out, setOut] = useState((<></>))
  
  if(
    props.keys.length > 0               // ima trailera
    && index != -1                      // nije pronađen odgovarajući trailer
    && index < props.keys.length        // nisu iscrpljeni dostupni traileri
    && draw                             // signal za ponovljeno iscrtavanje komponente
  ) {
    const key = props.keys[index]

    const opts: YouTubeProps['opts'] = {
      width: '1080',
      height: '608',
      playerVars: {
        autoplay: 1,
        mute: 1
      }
    }

    const onError = (e: any) => {
      setIndex(index + 1)
      setDraw(true)
    }

    const onPlay = () => {
      setIndex(-1)
      setDraw(false)
    }

    if(key) {
      setOut((<YouTube videoId={key} className='trailer' opts={opts} onError = {onError} onPlay={onPlay}/>))
      setIndex(-1)
    }
  }

  if(index != -1) return <img className='detailsImg' src = {props.imgBaseURL + props.backdrop_path} alt = {props.title}></img>
  else return out
}