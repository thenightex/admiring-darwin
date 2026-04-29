type ErrorContext = Record<string, unknown>
interface ErrorLogger {
  capture: (error: unknown, context?: ErrorContext) => void
  captureMessage: (message: string, context?: ErrorContext) => void
}

function capture(error: unknown, context: ErrorContext = {}): void {
  logError(error, context)
}

function captureMessage(message: string, context: ErrorContext = {}): void {
  logMessage(message, context)
}

export function useErrorLogger(): ErrorLogger {
  return {
    capture,
    captureMessage,
  }
}
