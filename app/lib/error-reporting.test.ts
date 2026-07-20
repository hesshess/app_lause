import { describe, expect, it } from "vitest";

import { shouldReportRouteErrorToSentry } from "./error-reporting";

describe("shouldReportRouteErrorToSentry", () => {
  it.each([401, 403, 404])(
    "does not report an expected %s response",
    (status) => {
      expect(shouldReportRouteErrorToSentry(status)).toBe(false);
    },
  );

  it.each([500, 502, 503])("reports a %s server error", (status) => {
    expect(shouldReportRouteErrorToSentry(status)).toBe(true);
  });
});
