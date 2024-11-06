import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Dust from '../src/app/api/dust-data/route'
 
test('Dust-data renders correctly.', async () => {
  render(<Dust />)
  await waitFor(() => screen.getByText('dust'))
  const dustMessage = screen.getByText('dust:')
  expect(dustMessage).toBeInTheDocument()
})