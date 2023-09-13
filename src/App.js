import {Route, Switch, Redirect} from 'react-router-dom'
import {useState} from 'react'
import Home from './components/Home'
import Login from './components/Login'
import Popular from './components/Popular'
import Favourite from './components/Popular/Favourite'
import Account from './components/Account'
import MovieItemDetails from './components/MovieItemDetails'
import Search from './components/Search'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import HeaderContext from './headerContext/HeaderContext'
import './App.css'

const App = () => {
  const parsedMoviesList = JSON.parse(localStorage.getItem('moviesList'))
  const [wishListMovies, setWishListMovies] = useState(
    parsedMoviesList === null ? [] : parsedMoviesList,
  )
  const [userCredentials, setUserCredentials] = useState({})
  const addMovieToWishList = obj => {
    setWishListMovies([...wishListMovies, obj])
    const stringifiedMoviesList = JSON.stringify([...wishListMovies, obj])
    localStorage.setItem('moviesList', stringifiedMoviesList)
  }
  const removeMovieToWishList = newMovieList => {
    const stringifiedMoviesList = JSON.stringify(newMovieList)
    localStorage.setItem('moviesList', stringifiedMoviesList)
    setWishListMovies(newMovieList)
  }
  const addUserCredentials = obj => {
    setUserCredentials({...obj})
  }

  return (
    <HeaderContext.Provider
      value={{
        wishListMovies,
        addMovieToWishList,
        removeMovieToWishList,
        userCredentials,
        addUserCredentials,
      }}
    >
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/popular" component={Popular} />
        <ProtectedRoute exact path="/favourite" component={Favourite} />
        <ProtectedRoute exact path="/account" component={Account} />
        <ProtectedRoute exact path="/movies/:id" component={MovieItemDetails} />
        <ProtectedRoute exact path="/search" component={Search} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="not-found" />
      </Switch>
    </HeaderContext.Provider>
  )
}

export default App
