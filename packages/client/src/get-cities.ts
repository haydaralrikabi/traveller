import { gql } from '@apollo/client'

const GET_CITIES = gql`
  query {
    cities {
      cities {
        id
        name
        visited
        wishlist
      }
    }
  }
`

export default GET_CITIES
