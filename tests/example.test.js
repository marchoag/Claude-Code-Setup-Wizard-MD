import { describe, it, expect } from 'vitest'

describe('Example Test Suite', () => {
  it('should pass basic test', () => {
    expect(1 + 1).toBe(2)
  })

  it('should validate string operations', () => {
    const message = 'Claude Code Setup'
    expect(message).toContain('Claude')
    expect(message).toHaveLength(17)
  })
})