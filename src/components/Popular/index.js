import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Popular extends Component {
  state = {popularList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getPopularList()
  }

  getPopularList = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/popular-movies`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.results.map(movieObj => ({
        backdropPath: movieObj.backdrop_path,
        overview: movieObj.overview,
        posterPath: movieObj.poster_path,
        id: movieObj.id,
        title: movieObj.title,
      }))
      this.setState({
        popularList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderSuccessView = () => {
    const {popularList} = this.state
    return (
      <ul className="popular-movies-container">
        {popularList.map(eachMovie => (
          <li className="movie-list" key={eachMovie.id}>
            <Link to={`movies/${eachMovie.id}`} className="link-style">
              <img
                src={`${eachMovie.posterPath}`}
                alt={`${eachMovie.title}`}
                className="movie-img"
              />
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  onTryingAgain = () => {
    this.getPopularList()
  }

  renderLoadingView = () => (
    <div className="popular-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="popular-failure-container" testid="loader">
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
  )

  renderPopularListView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="popular-container">
        <Header />
        {this.renderPopularListView()}
        <Footer />
      </div>
    )
  }
}

export default Popular
