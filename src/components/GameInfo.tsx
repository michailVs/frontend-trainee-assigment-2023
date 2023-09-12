import { Container, Image, Segment } from 'semantic-ui-react'
import { useEffect, useState } from 'react'
import { getGameById } from '../API/freetogame.api'
import Loader from "./Loader";
import { IGame } from '../interface/IGame';
import { Carousel } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

export const GameInfo = () => {
  const history = useNavigate()
    const [isLoad, setIsLoad] = useState(false)
    const [gameInfo, setGameinfo] = useState<IGame>()
    // window.location.pathname.match(/\d+/g)?.join()
    const dateOptions: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }
      
    const {id} = useParams()
    useEffect(() => {
        getGameById(id).then(data => {
            setIsLoad(true)
            if (!data) {
              return console.log('err')
            }
            return setGameinfo(data)
          })
    }, []) 
  return (
    <Container>
        {isLoad && gameInfo ?
            <div>
                <span style={{color: 'blue', textDecoration: 'underline', cursor: 'pointer'}} onClick={() => history('/')}>back</span>
                <h1>{gameInfo.title}</h1>
                <Image src={gameInfo.thumbnail} fluid centered style={{maxWidth: '500px',objectFit: 'cover'}}/>
                <p><a href={gameInfo.game_url} style={{width: '100%', height: '100px', backgroundColor: 'greenyellow', borderRadius: '20px', padding: '15px', marginBottom: '30px'}} target='_blank'>Game link</a></p>
                <p>Жанр: {gameInfo.genre}</p>
                <p>Издатель: {gameInfo.publisher} | Разработчик: {gameInfo.developer}</p>
                <p>Дата публикации: {new Intl.DateTimeFormat('ru', dateOptions).format(new Date(gameInfo.release_date.split('-').map(el => el === '00' ? el = '01' : el).join('-')))}</p>
                {!gameInfo.screenshots ?
                  <Loader/> :
                  <Carousel autoplay>
                    {gameInfo.screenshots?.map(el => (
                        <Image src={el.image} key={el.id} centered/>
                    ))}
                  </Carousel>
                }
                <p>Описание: {gameInfo.description}</p>
                {gameInfo.minimum_system_requirements ? 
                <div>
                  <h2>Технические требования:</h2>
                  <p>Операционная система: {gameInfo.minimum_system_requirements?.os}</p>
                  <p>Процессор: {gameInfo.minimum_system_requirements?.processor}</p>
                  <p>ОЗУ: {gameInfo.minimum_system_requirements?.memory}</p>
                  <p>Видеоадаптер: {gameInfo.minimum_system_requirements?.graphics}</p>
                  <p>Хранилище данных: {gameInfo.minimum_system_requirements?.storage}</p>
                </div>
                :
                <h2>Технические требования отсутвуют</h2>
                }
            </div>
            :
            <Loader/>
        }
    </Container>
  )
}
