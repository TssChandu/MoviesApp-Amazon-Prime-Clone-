import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <h1 className="not-found-heading">Lost Your Way?</h1>
    <p className="not-found-description">
      we are sorry the page you requested could not be found. Please go back to
      the homepage.
    </p>
    <Link to="/" className="link-style">
      <button type="button" className="home-btn">
        Go to Home
      </button>
    </Link>
  </div>
)

export default NotFound
