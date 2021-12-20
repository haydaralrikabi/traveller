import React, { useState } from 'react'
import type { FC } from 'react'
import { List, ListItem, ListIcon, Checkbox } from '@chakra-ui/react'
import { ArrowRightIcon } from '@chakra-ui/icons'
import type { city } from './types'
import { useMutation, gql } from '@apollo/client'

export const UPDATE_CITY = gql`
  mutation UpdateCity($id: Int, $visited: Boolean, $wishlist: Boolean) {
    updateCity(input: { id: $id, visited: $visited, wishlist: $wishlist }) {
      id
      name
      visited
      wishlist
    }
  }
`

const CitiesList: FC<{ cities: city[]; clearSearch: Function }> = props => {
  const [updateCity] = useMutation(UPDATE_CITY)

  const visitedClickHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateCity({ variables: { id: parseInt(event.target.id), visited: !!event.target.checked } })
    props.clearSearch()
  }

  const wishlistClickHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateCity({ variables: { id: parseInt(event.target.id), wishlist: !!event.target.checked } })
    props.clearSearch()
  }

  return (
    <List spacing={3} float="left" textAlign="left" pt="1rem">
      {props.cities.map((city: city) => {
        const cityId = city.id + ''

        return (
          <ListItem key={cityId}>
            <ListIcon as={ArrowRightIcon} color="green.500" key={`icon${cityId}`} />
            <b>{city.name}</b>
            <Checkbox
              isChecked={city.visited}
              key={`visited${cityId}`}
              data-testid={`visited${cityId}`}
              onChange={visitedClickHandler}
              id={cityId}
              ml="1rem"
              colorScheme="green"
            >
              Visited
            </Checkbox>
            <Checkbox
              isChecked={city.wishlist}
              key={`wishlist${cityId}`}
              data-testid={`wishlist${cityId}`}
              onChange={wishlistClickHandler}
              id={cityId}
              ml="1rem"
              colorScheme="green"
            >
              Wish list
            </Checkbox>
          </ListItem>
        )
      })}
    </List>
  )
}

export default CitiesList
