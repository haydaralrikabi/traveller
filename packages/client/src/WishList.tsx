import React from 'react'
import type { FC } from 'react'
import { Container, Heading, List, ListItem, ListIcon } from '@chakra-ui/react'
import { ArrowRightIcon } from '@chakra-ui/icons'
import type { city } from './types'
import { useQuery } from '@apollo/client'
import GET_CITIES from './get-cities'

let wishlistedCities: [] = []

export const WishList: FC = () => {
  const { error, loading, data } = useQuery(GET_CITIES)
  if (data) wishlistedCities = data.cities.cities.filter((city: city) => city.wishlist)

  return (
    <>
      <Heading as="h1">Wish list</Heading>
      <Container centerContent maxW="container.md" flexDir="row">
        <List spacing={3} float="left" textAlign="left" pt="1rem">
          {wishlistedCities.length > 0 &&
            wishlistedCities.map((city: city) => {
              return (
                <ListItem>
                  <ListIcon as={ArrowRightIcon} color="green.500" />
                  <b>{city.name}</b>
                </ListItem>
              )
            })}
        </List>
      </Container>
    </>
  )
}
