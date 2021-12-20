import React, { useState } from 'react'
import type { FC } from 'react'
import { Container, InputRightElement, Input, Heading, InputGroup, IconButton, VStack } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { useQuery } from '@apollo/client'
import type { city } from './types'
import CitiesList from './CitiesList'
import GET_CITIES from './get-cities'

export const Home: FC = () => {
  const { error, loading, data } = useQuery(GET_CITIES)
  const [cities, setCities] = useState([])
  const [inputText, setInputText] = useState('')

  let matchedCity

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regex = new RegExp('^' + event.target.value, 'i')
    matchedCity = event.target.value ? data.cities.cities.filter((city: city) => city.name.match(regex)) : []
    setCities(matchedCity)
  }

  const clearSearch = () => {
    setCities([])
    setInputText('')
  }
  return (
    <VStack spacing="8">
      <Heading as="h1">Smart traveller</Heading>
      <Container maxW="container.md">
        <InputGroup>
          <Input value={inputText} onChange={changeHandler} />
          <InputRightElement children={<IconButton aria-label="" icon={<Search2Icon />} />} />
        </InputGroup>
        <CitiesList cities={cities} clearSearch={clearSearch} />
      </Container>
    </VStack>
  )
}
