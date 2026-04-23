import { logError } from "../logger";

export function useErrorLogger() {
  function capture(error: unknown, context: Record<string, any> = {}) {
    logError(error, context);
  }

  return { capture };
}
