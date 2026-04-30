import type { Ref } from 'vue'

export type ErrorContext = Record<string, unknown>

export interface LoggedError {
  error?: unknown
  message?: string
  errorContext: ErrorContext
  timestamp: Date
}

export interface Othellog {
  errors: Ref<LoggedError[]>
  capture: (error: unknown, errorContext?: ErrorContext) => void
  captureMessage: (message: string, errorContext?: ErrorContext) => void
  clear: () => void
}
