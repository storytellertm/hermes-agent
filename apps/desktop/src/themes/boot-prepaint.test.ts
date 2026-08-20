import path from 'node:path'
import { pathToFileURL } from 'node:url'

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const bootScriptUrl = pathToFileURL(path.resolve(process.cwd(), 'public/boot-prepaint.js'))
let runId = 0

const runBootPrepaint = async () => {
  runId += 1
  await import(/* @vite-ignore */ `${bootScriptUrl.href}?test=${runId}`)
}

const stubSystemDark = (matches: boolean) => {
  const matchMedia = vi.fn(
    () =>
      ({
        matches
      }) as MediaQueryList
  )

  vi.stubGlobal('matchMedia', matchMedia)

  return matchMedia
}

describe('boot prepaint', () => {
  beforeEach(() => {
    window.localStorage.clear()
    document.documentElement.style.backgroundColor = ''
    document.documentElement.style.colorScheme = ''
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('uses the Structure light palette on a fresh light system', async () => {
    stubSystemDark(false)

    await runBootPrepaint()

    expect(document.documentElement.style.backgroundColor).toBe('rgb(244, 247, 249)')
    expect(document.documentElement.style.colorScheme).toBe('light')
  })

  it('uses the Structure graphite palette on a fresh dark system', async () => {
    stubSystemDark(true)

    await runBootPrepaint()

    expect(document.documentElement.style.backgroundColor).toBe('rgb(8, 13, 18)')
    expect(document.documentElement.style.colorScheme).toBe('dark')
  })

  it('preserves a stored theme without consulting the system preference', async () => {
    window.localStorage.setItem('hermes-boot-background', '#123456')
    window.localStorage.setItem('hermes-boot-color-scheme', 'light')
    const matchMedia = stubSystemDark(false)

    await runBootPrepaint()

    expect(matchMedia).not.toHaveBeenCalled()
    expect(document.documentElement.style.backgroundColor).toBe('rgb(18, 52, 86)')
    expect(document.documentElement.style.colorScheme).toBe('light')
  })
})
