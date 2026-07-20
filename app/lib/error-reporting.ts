export function shouldReportRouteErrorToSentry(status: number) {
  return status >= 500;
}
