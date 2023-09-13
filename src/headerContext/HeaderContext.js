import React from 'react'

const HeaderContext = React.createContext({
  wishListMovies: [],
  removeMovieToWishList: () => {},
  addMovieToWishList: () => {},
  userCredentials: {},
  addUserCredentials: () => {},
})

export default HeaderContext
