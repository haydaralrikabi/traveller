import { screen, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { render } from './test-utils'
import { MockedProvider } from '@apollo/client/testing'
import CitiesList, { UPDATE_CITY } from './CitiesList'

const mocks = [
  {
    request: {
      query: UPDATE_CITY,
      variables: { id: 1, visited: true, wishlist: false },
    },
    newData: jest.fn(() => ({
      data: {
        id: 1,
        name: 'London',
        visited: true,
        wishlist: false,
      },
    })),
  },
]

const cities = [
  {
    id: 1,
    name: 'London',
    visited: false,
    wishlist: false,
  },
]

it.skip("Mutation should be called when selecting a city's visited checkbox", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <CitiesList cities={cities} />
    </MockedProvider>
  )

  const checkboxElement = screen.queryByTestId('visited1')
  fireEvent.click(checkboxElement)

  const updateCityMutationMock = mocks[0].newData
  await act(() => expect(updateCityMutationMock).toHaveBeenCalled())
})
