import { render, screen } from '@testing-library/react'
import Brum, { sum } from '../pages/brum'

describe('test', () => {
  test('test1', () => {
    expect(sum(1, 2)).toBe(3)
  })

  test('teste2', () => {
    render(<Brum />)

    expect(screen.getByText('aloooo')).toBeInTheDocument()
  })
})
