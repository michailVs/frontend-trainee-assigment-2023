import { getGameById } from '../API/freetogame.api'
import { Card, Image } from 'semantic-ui-react';
import { ICard } from '../interface/ICard';
import { useNavigate } from 'react-router-dom';

const CardComponents = (props: ICard) => {
  const history = useNavigate()
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }
  let RUDate: string = ''
  try {
    RUDate = new Intl.DateTimeFormat('ru', dateOptions).format(new Date(props.release_date))
  } catch (err) {
    if ((err as Error).message === 'Invalid time value') {
      RUDate = new Intl.DateTimeFormat('ru', dateOptions).format(new Date(props.release_date.split('-').map(el => el === '00' ? el = '01' : el).join('-')))
    } else {
      console.log(err)
    }
  }

  //  style={{minWidth: '200px'}}
  return (
    <Card onClick={() => history(`/${props.id}`)} fluid={true} style={{minWidth: '200px'}}>
      <Image src={props.thumbnail} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{props.title}</Card.Header>
        <Card.Description>
          <p className="publisher">Издатель: {props.publisher}</p>
          <p className="description">Описание: {props.short_description}</p>
          <p className="genre">Жанр: {props.genre}</p>
          <p className="release">Дата публикации: {RUDate}</p>
        </Card.Description>
      </Card.Content>
    </Card>
  )
}


export default CardComponents