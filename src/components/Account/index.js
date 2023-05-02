import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const Account = props => {
  const onLoggingOut = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="account-container">
      <Header />
      <div className="account-content-container">
        <h1 className="account-heading">Account</h1>
        <hr className="line" />
        <div className="membership-container">
          <p className="membership-plan-text">Member ship </p>
          <div className="account-details-container">
            <p className="email-text">rahul@gmail.com</p>
            <div>
              <p className="password-text">
                Password <span className="password"> : ************</span>
              </p>
            </div>
          </div>
        </div>
        <hr className="line" />
        <div className="plan-container">
          <p className="membership-plan-text">Plan details </p>
          <div className="plan-type-container">
            <p className="plan-type">Premium </p>
            <p className="resolution-type">Ultra HD</p>
          </div>
        </div>
        <hr className="line" />
        <button className="logout-btn" type="button" onClick={onLoggingOut}>
          Logout
        </button>
      </div>
      <Footer />
    </div>
  )
}

export default Account
