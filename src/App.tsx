import { useEffect, useState } from "react";
import { useAppDispatch } from "./store/store";
import { getAllGame } from "./API/freetogame.api";
import { actions } from "./store/reducer";
import Loader from "./components/Loader";
import Router from "./components/Router";
import { BrowserRouter } from 'react-router-dom'


function App() {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()
  const options: Intl.DateTimeFormatOptions = {
    minute: "numeric",
  }
  useEffect(() => {
    let date = parseInt(localStorage.getItem('time') || '') > parseInt(new Intl.DateTimeFormat('ru', options).format(new Date()))
    if (localStorage.getItem('game') && date) {
      setIsLoading(true)
      dispatch(actions.addGameList(JSON.parse(localStorage.getItem('game') || '')))
    } else {
      getAllGame().then(data => {
        setIsLoading(true)
        localStorage.setItem('game', JSON.stringify(data))
        localStorage.setItem('time', new Intl.DateTimeFormat('ru', options).format(new Date(new Date().getTime() + 5*60000)))
        return dispatch(actions.addGameList(data))
      })
    }
  }, [])
  return (
    <div className="App" style={{margin: 20}}>
        <BrowserRouter>
          {isLoading ? <Router/> : <Loader/>}
        </BrowserRouter> 
    </div>
  );
}

export default App;
