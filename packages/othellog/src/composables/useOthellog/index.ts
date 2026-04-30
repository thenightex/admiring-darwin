import type { ErrorContext, LoggedError, Othellog } from './types'
import { context, trace } from '@opentelemetry/api'
import { logs } from '@opentelemetry/api-logs'
import { shallowRef } from 'vue'

const logger = logs.getLogger('frontend')

function logError(error: unknown, extra: Record<string, unknown> = {}): void {
  const span = trace.getSpan(context.active())

  logger.emit({
    // TODO docs
    severityNumber: 17,
    severityText: 'ERROR',
    body: error instanceof Error ? error.message : String(error),
    attributes: {
      'error.stack': error instanceof Error ? error.stack : undefined,
      'error.name': error instanceof Error ? error.name : undefined,

      // trace correlation
      'trace_id': span?.spanContext().traceId,
      'span_id': span?.spanContext().spanId,

      // useful frontend context
      'url': globalThis.location.href,
      'user_agent': navigator.userAgent,

      ...extra,
    },
  })
}

function logMessage(message: string, extra: Record<string, unknown> = {}, errorStack?: string, errorName?: string): void {
  const span = trace.getSpan(context.active())

  logger.emit({
    severityNumber: 17,
    severityText: 'ERROR',
    body: message,
    attributes: {
      'error.stack': errorStack,
      'error.name': errorName,

      // trace correlation
      'trace_id': span?.spanContext().traceId,
      'span_id': span?.spanContext().spanId,

      // useful frontend context
      'url': globalThis.location.href,
      'user_agent': navigator.userAgent,

      ...extra,
    },
  })
}

export function useOthellog(): Othellog {
  const errors = shallowRef<LoggedError[]>([])

  const capture = (error: unknown, errorContext: ErrorContext = {}): void => {
    logError(error, errorContext)
    errors.value.push({
      error,
      errorContext,
      timestamp: new Date(),
    })
  }

  const captureMessage = (message: string, errorContext: ErrorContext = {}): void => {
    logMessage(message, errorContext)
    errors.value.push({
      message,
      errorContext,
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
