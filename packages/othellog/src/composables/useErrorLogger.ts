import type { Ref } from 'vue'
import { shallowRef } from 'vue'
import { logError, logMessage } from '../utils/logger'

type ErrorContext = Record<string, unknown>

interface LoggedError {
  error?: unknown
  message?: string
  context: ErrorContext
  timestamp: Date
}

interface ErrorLogger {
  errors: Ref<LoggedError[]>
  capture: (error: unknown, context?: ErrorContext) => void
  captureMessage: (message: string, context?: ErrorContext) => void
  clear: () => void
}

export function useErrorLogger(): ErrorLogger {
  const errors = shallowRef<LoggedError[]>([])

  const capture = (error: unknown, context: ErrorContext = {}): void => {
    logError(error, context)
    errors.value.push({
      error,
      context,
      timestamp: new Date(),
    })
  }

  const captureMessage = (message: string, context: ErrorContext = {}): void => {
    logMessage(message, context)
    errors.value.push({
      message,
      context,
      timestamp: new Date(),
    })
  }

  const clear = (): void => {
    errors.value = []
  }

  return {
    errors,
    capture,
    captureMessage,
    clear,
  }
}
