import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {IoCloseCircle} from 'react-icons/io5'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Search extends Component {
  state = {
    searchInput: '',
    moviesList: [],
    apiStatus: apiStatusConstants.initial,
    isHamburgerClicked: false,
    isSearchClicked: false,
  }

  getMoviesList = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {searchInput} = this.state

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedMoviesList = fetchedData.results.map(movieObj => ({
        backdropPath: movieObj.backdrop_path,
        overview: movieObj.overview,
        posterPath: movieObj.poster_path,
        id: movieObj.id,
        title: movieObj.title,
      }))
      this.setState({
        moviesList: updatedMoviesList,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClosing = () => {
    this.setState({
      isHamburgerClicked: false,
    })
  }

  renderSuccessView = () => {
    const {moviesList, searchInput} = this.state

    if (moviesList.length === 0) {
      return (
        <div className="search-result-container">
          <img
            src="https://res.cloudinary.com/dzvngxapf/image/upload/v1682503620/Group_7394_h1w1t5.png"
            alt="no movies"
            className="no-movies-img"
          />
          <p className="no-movies-description">{`Your search for ${searchInput} did not find any matches.`}</p>
        </div>
      )
    }
    return (
      <ul className="search-movies-list-container">
        {moviesList.map(eachMovie => (
          <Link
            key={eachMovie.id}
            to={`movies/${eachMovie.id}`}
            className="link-style"
          >
            <li>
              <img
                src={eachMovie.posterPath}
                alt={eachMovie.title}
                className="movie-img search"
              />
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  onTryingAgain = () => {
    this.getMoviesList()
  }

  renderFailureView = () => (
    <div className="search-failure-container">
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

  renderLoadingView = () => (
    <div className="search-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height="50" width="50" />
    </div>
  )

  renderSearchResults = () => {
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

  onChangingText = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onClickingSearchButton = () => {
    this.setState({isSearchClicked: true}, this.getMoviesList)
  }

  render() {
    const {isHamburgerClicked, searchInput, isSearchClicked} = this.state
    return (
      <div className="search-container">
        <div>
          <nav className="nav-container">
            <Link to="/" className="link-style">
              <img
                src="https://res.cloudinary.com/dlbkfmgjo/image/upload/v1681886490/Group_7399_1_brkmpm.png"
                alt="website logo"
                className="header-website-logo"
              />
            </Link>
            <ul className="header-list-container">
              <Link to="/" className="link-style">
                <li className="header-list">Home</li>
              </Link>
              <Link to="/popular" className="link-style">
                <li className="header-list pop">Popular</li>
              </Link>
            </ul>
            <div className="search-profile-container">
              <div className="search-input-container">
                <input
                  type="search"
                  value={searchInput}
                  onChange={this.onChangingText}
                  className="search-input"
                />
                <button
                  testid="searchButton"
                  type="button"
                  className="search-button"
                  onClick={this.onClickingSearchButton}
                >
                  <HiOutlineSearch className="search-mini-icon" />
                </button>
              </div>
              <Link to="/account" className="link-style">
                <img
                  src="https://res.cloudinary.com/dzvngxapf/image/upload/v1681978779/Avatar_fcvg4x.png"
                  alt="profile"
                  className="profile-img"
                />
              </Link>
              <img
                src="https://res.cloudinary.com/dzvngxapf/image/upload/v1681983341/add-to-queue_1_kjjz7o.png"
                className="hamburger-img"
                alt="hamburger"
                onClick={this.onClickingHamburger}
              />
            </div>
          </nav>
          {isHamburgerClicked && (
            <ul className="mobile-hamburger-list-container">
              <Link to="/" className="link-style">
                <li className="mobile-hamburger-list">Home</li>
              </Link>
              <Link to="/popular" className="link-style">
                <li className="mobile-hamburger-list">Popular</li>
              </Link>
              <Link to="/account" className="link-style account">
                <li className="mobile-hamburger-list">Account</li>
              </Link>
              <IoCloseCircle className="close-icon" onClick={this.onClosing} />
            </ul>
          )}
        </div>
        {isSearchClicked && this.renderSearchResults()}
      </div>
    )
  }
}

export default Search
