type TelemetryEvent = {
  name: string;
  properties?: Record<string, unknown>;
};

export function captureException(error: unknown, context?: Record<string, unknown>) {
  if (process.env.EXPO_PUBLIC_SENTRY_DSN) {
    // Sentry React Native SDK wiring belongs here once keys and project settings are available.
  }

  console.error('captured_exception', { error, context });
}

export function trackEvent(event: TelemetryEvent) {
  if (process.env.EXPO_PUBLIC_MIXPANEL_TOKEN) {
    // Mixpanel mobile tracking belongs here once keys are available.
  }

  console.info('tracked_event', event);
}
