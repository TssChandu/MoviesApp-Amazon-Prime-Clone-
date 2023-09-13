import {Link} from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import HeaderContext from '../../headerContext/HeaderContext'
import './index.css'

const Favourite = () => {
  const renderSuccessView = () => (
    <HeaderContext.Consumer>
      {value => {
        const {wishListMovies} = value

        return (
          <ul className="favourites-movies-container">
            {wishListMovies.length === 0 && (
              <h1 className="failure-description">
                Seems like you did not have any liked list. Like a movie to get
                it over here.
              </h1>
            )}
            {wishListMovies.map(eachMovie => (
              <li className="movie-list" key={eachMovie.id}>
                <Link to={`movies/${eachMovie.id}`} className="link-style">
                  <img
                    src={`${eachMovie.posterPath}`}
                    alt={`${eachMovie.title}`}
                    className="movie-img fav-img"
                  />
                </Link>
              </li>
            ))}
          </ul>
        )
      }}
    </HeaderContext.Consumer>
  )
  return (
    <div className="popular-container">
      <Header />
      {renderSuccessView()}
      <Footer />
    </div>
  )
}

export default Favourite
