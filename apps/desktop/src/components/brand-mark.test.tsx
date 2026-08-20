import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { BrandMark } from './brand-mark'

afterEach(() => cleanup())

describe('BrandMark', () => {
  it('renders the Structure mark without an external image asset', () => {
    const { container } = render(<BrandMark />)

    expect(screen.getByRole('img', { name: 'Structure' })).toBeTruthy()
    expect(container.querySelector('img')).toBeNull()
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(2)
  })
})
