import { Routes, Route } from 'react-router-dom'
import CardList from './CardList'
import { GameInfo } from './GameInfo'

const Router = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={<CardList/>}/>
            <Route path='/:id' element={<GameInfo/>}/>
            <Route path='*' element={<CardList/>}/>
        </Routes>
    </>
  )
}

export default Router