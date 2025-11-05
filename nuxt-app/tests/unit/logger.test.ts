import { describe, it, expect, vi, beforeEach } from 'vitest'
import logger from '../../utils/logger'

describe('Logger', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should log info messages in development', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'

    logger.info('Test message', { data: 'test' })

    expect(consoleSpy).toHaveBeenCalledWith('[INFO] Test message', { data: 'test' })

    process.env.NODE_ENV = originalEnv
    consoleSpy.mockRestore()
  })

  it('should not log info messages in production', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'production'

    logger.info('Test message')

    expect(consoleSpy).not.toHaveBeenCalled()

    process.env.NODE_ENV = originalEnv
    consoleSpy.mockRestore()
  })

  it('should always log error messages', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    logger.error('Error message', new Error('test'))

    expect(consoleSpy).toHaveBeenCalled()

    consoleSpy.mockRestore()
  })

  it('should log warnings in development', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'

    logger.warn('Warning message')

    expect(consoleSpy).toHaveBeenCalledWith('[WARN] Warning message', '')

    process.env.NODE_ENV = originalEnv
    consoleSpy.mockRestore()
  })
})
