import { screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { render } from './test-utils'
import { MockedProvider } from '@apollo/client/testing'
import GET_CITIES from './get-cities'
import { Visited } from './Visited'

const mocks = [
  {
    request: {
      query: GET_CITIES,
    },
    result: {
      data: {
        cities: {
          cities: [
            {
              id: 1,
              name: 'London',
              visited: true,
              wishlist: false,
            },
          ],
        },
      },
    },
  },
]

it('renders without error', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Visited />
    </MockedProvider>
  )

  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0))
  })

  const component = screen.getByText('Visited')
  expect(component).toBeInTheDocument()
})
