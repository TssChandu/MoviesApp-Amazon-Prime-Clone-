import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {IoCloseCircle} from 'react-icons/io5'

import './index.css'

class Header extends Component {
  state = {isHamburgerClicked: false}

  onClickingHamburger = () => {
    this.setState({
      isHamburgerClicked: true,
    })
  }

  onClosing = () => {
    this.setState({
      isHamburgerClicked: false,
    })
  }

  render() {
    const {isHamburgerClicked} = this.state
    return (
      <>
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
            <Link to="/favourite" className="link-style">
              <li className="header-list pop">Favourite</li>
            </Link>
          </ul>
          <div className="search-profile-container">
            <Link to="/search" className="link-style">
              <button
                testid="searchButton"
                type="button"
                className="search-btn"
              >
                <HiOutlineSearch className="search-icon" />
              </button>
            </Link>
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
            <Link to="/favourite" className="link-style account">
              <li className="mobile-hamburger-list">Favourite</li>
            </Link>
            <Link to="/account" className="link-style account">
              <li className="mobile-hamburger-list">Account</li>
            </Link>
            <IoCloseCircle className="close-icon" onClick={this.onClosing} />
          </ul>
        )}
      </>
    )
  }
}

export default withRouter(Header)
