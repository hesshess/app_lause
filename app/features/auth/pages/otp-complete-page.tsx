import { Form } from "react-router";
import { Button } from "~/common/components/ui/button";
import { Input } from "~/common/components/ui/input";
import { Label } from "~/common/components/ui/label";
import type { Route } from "./+types/otp-complete-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "OTP Complete | app_lause" },
    { name: "description", content: "Complete one-time passcode verification" },
  ];
};

export function loader(_args: Route.LoaderArgs) {
  return {};
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  return {
    code: formData.get("code")?.toString() ?? "",
  };
}

export default function OtpCompletePage(_props: Route.ComponentProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          Verify your code
        </h1>
        <p className="text-muted-foreground">
          Enter the one-time passcode you just received.
        </p>
      </div>
      <Form method="post" className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="code">Verification code</Label>
          <Input
            id="code"
            name="code"
            inputMode="numeric"
            maxLength={6}
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Verify code
        </Button>
      </Form>
    </div>
  );
}
