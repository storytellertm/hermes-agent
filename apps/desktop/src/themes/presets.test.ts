import { describe, expect, it } from 'vitest'

import {
  BUILTIN_THEME_LIST,
  DEFAULT_SKIN_NAME,
  DEFAULT_TYPOGRAPHY,
  EMOJI_FALLBACK,
  structureTheme
} from './presets'

describe('Structure desktop theme', () => {
  it('is the default dark graphite palette', () => {
    expect(DEFAULT_SKIN_NAME).toBe('structure')
    expect(BUILTIN_THEME_LIST[0]).toBe(structureTheme)
    expect(structureTheme.colors).toMatchObject({
      background: '#f4f7f9',
      card: '#ffffff',
      primary: '#167cca',
      sidebarBackground: '#eef3f6'
    })
    expect(structureTheme.darkColors).toMatchObject({
      background: '#080d12',
      card: '#12181e',
      primary: '#3bb9f2',
      sidebarBackground: '#0b1117'
    })
  })
})

// #40364: none of the UI text/mono fonts carry emoji glyphs, so every font
// stack must end with a color-emoji fallback or emoji render as tofu on
// platforms whose default font lacks them (e.g. Linux).
describe('theme typography emoji fallback (#40364)', () => {
  const stacks: Array<[string, string]> = [
    ['DEFAULT_TYPOGRAPHY.fontSans', DEFAULT_TYPOGRAPHY.fontSans],
    ['DEFAULT_TYPOGRAPHY.fontMono', DEFAULT_TYPOGRAPHY.fontMono],
    // A theme may override only fontMono (fontSans then falls back to the
    // default, which already carries the emoji stack), so skip undefined.
    ...BUILTIN_THEME_LIST.flatMap(theme =>
      (
        [
          [`${theme.name}.fontSans`, theme.typography?.fontSans],
          [`${theme.name}.fontMono`, theme.typography?.fontMono]
        ] as Array<[string, string | undefined]>
      ).filter((entry): entry is [string, string] => typeof entry[1] === 'string')
    )
  ]

  it.each(stacks)('%s includes a color-emoji font', (_label, stack) => {
    expect(stack).toMatch(/Apple Color Emoji|Segoe UI Emoji|Noto Color Emoji|(^|,\s*)emoji\b/)
  })

  it('EMOJI_FALLBACK lists the major platform emoji fonts', () => {
    expect(EMOJI_FALLBACK).toContain('Apple Color Emoji')
    expect(EMOJI_FALLBACK).toContain('Segoe UI Emoji')
    expect(EMOJI_FALLBACK).toContain('Noto Color Emoji')
  })
})
