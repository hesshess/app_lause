import { Form } from "react-router";
import { Button } from "~/common/components/ui/button";
import { Input } from "~/common/components/ui/input";
import { Label } from "~/common/components/ui/label";
import type { Route } from "./+types/otp-start-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "OTP Start | app_lause" },
    { name: "description", content: "Request a one-time passcode" },
  ];
};

export function loader(_args: Route.LoaderArgs) {
  return {};
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  return {
    phoneNumber: formData.get("phoneNumber")?.toString() ?? "",
  };
}

export default function OtpStartPage(_props: Route.ComponentProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          Send verification code
        </h1>
        <p className="text-muted-foreground">
          Enter your phone number to receive a one-time passcode.
        </p>
      </div>
      <Form method="post" className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone number</Label>
          <Input id="phoneNumber" name="phoneNumber" type="tel" required />
        </div>
        <Button type="submit" className="w-full">
          Send code
        </Button>
      </Form>
    </div>
  );
}
