import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    randomMovieObj: {},
    trendingList: [],
    originalsList: [],
    trendingApiStatus: apiStatusConstants.initial,
    originalsApiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTrendingMovies()
    this.getOriginalsMovies()
  }

  getTrendingMovies = async () => {
    this.setState({
      trendingApiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/trending-movies`
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
        trendingList: updatedData,
        trendingApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        trendingApiStatus: apiStatusConstants.failure,
      })
    }
  }

  getOriginalsMovies = async () => {
    this.setState({
      originalsApiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/originals`
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
      const randomNumber = Math.floor(Math.random() * updatedData.length)
      const movieObject = updatedData[randomNumber]
      this.setState({
        originalsList: updatedData,
        originalsApiStatus: apiStatusConstants.success,
        randomMovieObj: movieObject,
      })
    } else {
      this.setState({
        originalsApiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height="50" width="50" />
    </div>
  )

  renderTopContainerSuccessView = () => {
    const {randomMovieObj} = this.state
    const {backdropPath, overview, posterPath, title} = randomMovieObj

    return (
      <>
        <div
          className="desktop-top-container"
          style={{
            backgroundImage: `url(${backdropPath})`,
            backgroundSize: 'cover',
          }}
        >
          <Header />
          <div className="desktop-top-card-content-container">
            <h1 className="title-heading">{title}</h1>
            <h1 className="movie-overview">{overview}</h1>
            <button className="play-btn" type="button">
              Play
            </button>
          </div>
        </div>
        <div
          className="mobile-top-container"
          style={{
            backgroundImage: `url(${posterPath})`,
            backgroundSize: 'cover',
          }}
        >
          <Header />
          <div className="mobile-top-card-content-container">
            <h1 className="title-heading">{title}</h1>
            <p className="movie-overview">{overview}</p>
            <button className="play-btn" type="button">
              Play
            </button>
          </div>
        </div>
      </>
    )
  }

  renderTopContainerLoadingView = () => (
    <div className="top-container">
      <Header />
      <div className="top-loading-container">{this.renderLoadingView()}</div>
    </div>
  )

  onTryingOriginalsAgain = () => {
    this.getOriginalsMovies()
  }

  renderTopContainerFailureView = () => (
    <div className="failure-bg-container">
      <Header />
      <div className="top-card-failure-container">
        <div className="top-failure-container">
          <img
            src="https://res.cloudinary.com/dzvngxapf/image/upload/v1682003597/Icon_zlmofi.png"
            alt="failure view"
            className="failure-img"
          />
          <p className="failure-description">
            Something went wrong. Please try again
          </p>
          <button
            className="try-again-btn"
            type="button"
            onClick={this.onTryingOriginalsAgain}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  )

  renderTopContainerView = () => {
    const {originalsApiStatus} = this.state

    switch (originalsApiStatus) {
      case apiStatusConstants.success:
        return this.renderTopContainerSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderTopContainerLoadingView()
      case apiStatusConstants.failure:
        return this.renderTopContainerFailureView()
      default:
        return null
    }
  }

  onTryingTrendingAgain = () => {
    this.getTrendingMovies()
  }

  renderMiddleContainerSuccessView = () => {
    const {trendingList} = this.state
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 359,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }

    return (
      <>
        <h1 className="Home-videos-type">Trending Now</h1>
        <div className="slick-container">
          <Slider {...settings}>
            {trendingList.map(eachMovieObj => {
              const {id, posterPath, title} = eachMovieObj
              return (
                <div className="slick-item">
                  <Link to={`movies/${id}`} className="link-style" key={id}>
                    <img className="movie-image" src={posterPath} alt={title} />
                  </Link>
                </div>
              )
            })}
          </Slider>
        </div>
      </>
    )
  }

  renderMiddleContainerLoadingView = () => (
    <>
      <h1 className="Home-videos-type">Trending Now</h1>
      <div className="slick-loading-container" testid="loader">
        <Loader type="TailSpin" color="#D81F26" height="50" width="50" />
      </div>
    </>
  )

  renderMiddleContainerFailureView = () => (
    <>
      <h1 className="Home-videos-type">Trending Now</h1>
      <div className="slick-loading-container">
        <img
          src="https://res.cloudinary.com/dzvngxapf/image/upload/v1682003597/Icon_zlmofi.png"
          alt="failure view"
          className="failure-img"
        />
        <p className="failure-description">
          Something went wrong. Please try again
        </p>
        <button
          className="try-again-btn"
          type="button"
          onClick={this.onTryingTrendingAgain}
        >
          Try Again
        </button>
      </div>
    </>
  )

  renderMiddleContainerView = () => {
    const {trendingApiStatus} = this.state

    switch (trendingApiStatus) {
      case apiStatusConstants.success:
        return this.renderMiddleContainerSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderMiddleContainerLoadingView()
      case apiStatusConstants.failure:
        return this.renderMiddleContainerFailureView()
      default:
        return null
    }
  }

  renderBottomContainerSuccessView = () => {
    const {originalsList} = this.state
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 359,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }

    return (
      <>
        <h1 className="Home-videos-type">Orignals</h1>
        <div className="slick-container">
          <Slider {...settings}>
            {originalsList.map(eachMovieObj => {
              const {id, posterPath, title} = eachMovieObj
              return (
                <Link to={`movies/${id}`} className="link-style" key={id}>
                  <div className="slick-item">
                    <img className="movie-image" src={posterPath} alt={title} />
                  </div>
                </Link>
              )
            })}
          </Slider>
        </div>
      </>
    )
  }

  renderBottomContainerLoadingView = () => (
    <>
      <h1 className="Home-videos-type">Orignals</h1>
      <div className="slick-loading-container" testid="loader">
        <Loader type="TailSpin" color="#D81F26" height="50" width="50" />
      </div>
    </>
  )

  renderBottomContainerFailureView = () => (
    <>
      <h1 className="Home-videos-type">Orignals</h1>
      <div className="slick-loading-container bottom-mov-card">
        <img
          src="https://res.cloudinary.com/dzvngxapf/image/upload/v1682003597/Icon_zlmofi.png"
          alt="failure view"
          className="failure-img"
        />
        <p className="failure-description">
          Something went wrong. Please try again
        </p>
        <button
          className="try-again-btn"
          type="button"
          onClick={this.onTryingOriginalsAgain}
        >
          Try Again
        </button>
      </div>
    </>
  )

  renderBottomContainerView = () => {
    const {originalsApiStatus} = this.state

    switch (originalsApiStatus) {
      case apiStatusConstants.success:
        return this.renderBottomContainerSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderBottomContainerLoadingView()
      case apiStatusConstants.failure:
        return this.renderBottomContainerFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        {this.renderTopContainerView()}
        <div className="slick-bottom-container">
          {this.renderMiddleContainerView()}
          {this.renderBottomContainerView()}
          <Footer />
        </div>
      </>
    )
  }
}

export default Home
