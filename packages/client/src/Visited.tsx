import React from 'react'
import type { FC } from 'react'
import { Container, Heading, List, ListItem, ListIcon } from '@chakra-ui/react'
import { ArrowRightIcon } from '@chakra-ui/icons'
import type { city } from './types'
import { useQuery } from '@apollo/client'
import GET_CITIES from './get-cities'

let visitedCities: [] = []

export const Visited: FC = props => {
  const { error, loading, data } = useQuery(GET_CITIES)
  if (data) visitedCities = data.cities.cities.filter((city: city) => city.visited)

  return (
    <>
      <Heading as="h1">Visited</Heading>
      <Container centerContent maxW="container.md" flexDir="row">
        <List spacing={3} float="left" textAlign="left" pt="1rem">
          {visitedCities.length > 0 &&
            visitedCities.map((city: city) => {
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
