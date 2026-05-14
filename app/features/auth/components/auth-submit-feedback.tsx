import { LoaderCircle } from "lucide-react";

import { Button } from "~/common/components/ui/button";

interface AuthSubmitFeedbackProps {
  error?: string | null;
  isSubmitting: boolean;
  submitLabel: string;
}

export default function AuthSubmitFeedback({
  error,
  isSubmitting,
  submitLabel,
}: AuthSubmitFeedbackProps) {
  return (
    <>
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
      <Button className="w-full" type="submit" disabled={isSubmitting}>
        {isSubmitting ? <LoaderCircle className="animate-spin" /> : submitLabel}
      </Button>
    </>
  );
}
