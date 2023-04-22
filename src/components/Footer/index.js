import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="icon-container">
      <button type="button" className="footer-btn">
        <FaGoogle className="footer-icon" />
      </button>
      <button type="button" className="footer-btn">
        <FaTwitter className="footer-icon" />
      </button>
      <button type="button" className="footer-btn">
        <FaInstagram className="footer-icon" />
      </button>
      <button type="button" className="footer-btn">
        <FaYoutube className="footer-icon" />
      </button>
    </div>
    <p className="footer-contact">Contact Us</p>
  </div>
)

export default Footer
