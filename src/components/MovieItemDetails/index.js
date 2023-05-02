import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieItemDetails extends Component {
  state = {
    movieDetailsObject: {},
    similarMoviesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getMovieItemDetails()
  }

  getFormattedData = data => ({
    adult: data.movie_details.adult,
    backdropPath: data.movie_details.backdrop_path,
    budget: data.movie_details.budget,
    genres: data.movie_details.genres,
    id: data.movie_details.id,
    overview: data.movie_details.overview,
    posterPath: data.movie_details.poster_path,
    releaseDate: data.movie_details.release_date,
    runtime: data.movie_details.runtime,
    spokenLanguages: data.movie_details.spoken_languages.map(eachItem => ({
      englishName: eachItem.english_name,
      id: eachItem.id,
    })),
    title: data.movie_details.title,
    voteAverage: data.movie_details.vote_average,
    voteCount: data.movie_details.vote_count,
  })

  getMovieItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = this.getFormattedData(fetchedData)

      const updatedSimilarMoviesData = fetchedData.movie_details.similar_movies.map(
        movieObj => ({
          backdropPath: movieObj.backdrop_path,
          overview: movieObj.overview,
          posterPath: movieObj.poster_path,
          id: movieObj.id,
          title: movieObj.title,
        }),
      )
      this.setState({
        movieDetailsObject: updatedData,
        similarMoviesList: updatedSimilarMoviesData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderSuccessView = () => {
    const {movieDetailsObject, similarMoviesList} = this.state
    const {
      adult,
      backdropPath,
      budget,
      genres,
      overview,
      releaseDate,
      runtime,
      spokenLanguages,
      title,
      voteAverage,
      voteCount,
    } = movieDetailsObject
    const duration = `${parseInt(runtime / 60)}h ${runtime % 60}m`
    const movieType = adult ? 'A' : 'U/A'
    const date = new Date(releaseDate)
    const day = date.getDate()
    const year = date.getFullYear()
    const monthNumber = date.getMonth()
    date.setMonth(monthNumber)
    const month = date.toLocaleString('en-US', {month: 'long'})
    const dateFormat = `${day} ${month} ${year}`

    return (
      <>
        <div
          className="top-movie-details-container"
          style={{
            backgroundImage: `url(${backdropPath})`,
            backgroundSize: 'cover',
          }}
        >
          <Header />
          <div className="desktop-top-card-content-container">
            <h1 className="title-heading">{title}</h1>
            <div className="duration-type-release-year-container">
              <p className="duration">{duration}</p>
              <p className="adult-type">{movieType}</p>
              <p className="release-year">{year}</p>
            </div>
            <h1 className="movie-overview">{overview}</h1>
            <button className="play-btn" type="button">
              Play
            </button>
          </div>
        </div>
        <div className="movie-details-container">
          <ul className="content-list-container">
            <h1 className="content-heading">Genres</h1>
            {genres.map(eachGenre => (
              <li className="genre-list" key={eachGenre.id}>
                <p className="content-description">{eachGenre.name}</p>
              </li>
            ))}
          </ul>
          <ul className="content-list-container">
            <h1 className="content-heading">Audio Available</h1>
            {spokenLanguages.map(eachLanguage => (
              <li className="genre-list" key={eachLanguage.id}>
                <p className="content-description">
                  {eachLanguage.englishName}
                </p>
              </li>
            ))}
          </ul>
          <div className="content-list-container">
            <h1 className="content-heading">Rating Count</h1>
            <p className="content-description">{voteCount}</p>
            <h1 className="content-heading"> Rating Average</h1>
            <p className="content-description">{voteAverage}</p>
          </div>
          <div className="content-list-container">
            <h1 className="content-heading">Budget</h1>
            <p className="content-description">{budget}</p>
            <h1 className="content-heading"> Release Date</h1>
            <p className="content-description">{dateFormat}</p>
          </div>
        </div>
        <div className="similar-movie-container">
          <h1 className="similar-movies-heading">More like this</h1>
          <ul className="similar-movies-list-container">
            {similarMoviesList.map(eachMovie => (
              <li key={eachMovie.id}>
                <img
                  src={eachMovie.posterPath}
                  alt={eachMovie.title}
                  className="movie-img"
                />
              </li>
            ))}
          </ul>
          <Footer />
        </div>
      </>
    )
  }

  onTryingAgain = () => {
    this.getMovieItemDetails()
  }

  renderFailureView = () => (
    <div className="popular-container">
      <Header />
      <div className="popular-failure-container">
        <img
          src="https://res.cloudinary.com/dzvngxapf/image/upload/v1682178316/Background-Complete_aegt1t.png"
          className="pop-failure-image"
          alt="failure view"
        />
        <p className="failure-description">
          Something went wrong. Please try again
        </p>
        <button
          className="try-again-btn"
          type="button"
          onClick={this.onTryingAgain}
        >
          Try Again
        </button>
      </div>
    </div>
  )

  renderLoadingView = () => (
    <div className="popular-container">
      <Header />
      <div className="popular-loader-container" testid="loader">
        <Loader type="TailSpin" color="#D81F26" height="50" width="50" />
      </div>
    </div>
  )

  renderMovieItemDetailsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderMovieItemDetailsView()}</>
  }
}

export default MovieItemDetails
