import { context, trace } from '@opentelemetry/api'
import { logs } from '@opentelemetry/api-logs'

const logger = logs.getLogger('frontend')

export function logError(error: unknown, extra: Record<string, unknown> = {}): void {
  const span = trace.getSpan(context.active())

  logger.emit({
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

export function logMessage(message: string, extra: Record<string, unknown> = {}, errorStack?: string, errorName?: string): void {
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
