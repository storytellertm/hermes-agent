import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { Intro } from './intro'

afterEach(() => cleanup())

describe('Intro branding', () => {
  it('presents SPARK as the desktop wordmark', () => {
    render(<Intro personality="none" seed={0} />)

    expect(screen.getByLabelText('SPARK')).toBeTruthy()
    expect(screen.queryByText('HERMES AGENT')).toBeNull()
  })
})
