import { logError, logMessage } from '../logger'

type ErrorContext = Record<string, any>
interface ErrorLogger {
  capture: (error: unknown, context?: ErrorContext) => void
  captureMessage: (message: string, context?: ErrorContext) => void
}

export function useErrorLogger(): ErrorLogger {
  function capture(error: unknown, context: ErrorContext = {}): void {
    logError(error, context)
  }

  function captureMessage(message: string, context: ErrorContext = {}): void {
    logMessage(message, context)
  }

  return {
    capture,
    captureMessage,
  }
}
