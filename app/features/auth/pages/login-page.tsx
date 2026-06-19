import { Form, Link, redirect, useNavigation } from "react-router";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/login-page";
import InputPair from "~/common/components/input-pair";
import AuthButtons from "../components/auth-buttons";
import z from "zod";
import { makeSSRClient } from "~/supa-client";
import AuthSubmitFeedback from "../components/auth-submit-feedback";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Login | app_lause" },
    { name: "description", content: "Log in to your app_lause account" },
  ];
};

const formSchema = z.object({
  email: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Email is required"
          : "Email should be a string",
    })
    .email({ error: "Invalid email address" }),

  password: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Password is required"
          : "Password should be a string",
    })
    .min(8, { error: "Password must be at least 8 characters" }),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
 const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!success) {
    return {
      loginError: null,
      formErrors: error.flatten().fieldErrors,
    };
  }
  const { email, password } = data;
  const { client, headers } = makeSSRClient(request);
  const { error: loginError } = await client.auth.signInWithPassword({
    email,
    password,
  });
  if (loginError) {
    return {
      formErrors: null,
      loginError: loginError.message,
    };
  }
  return redirect("/", { headers });
};

export default function LoginPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";
  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <Button variant={"ghost"} asChild className="absolute right-8 top-8 ">
        <Link to="/auth/join">Join</Link>
      </Button>
      <div className="flex items-center flex-col justify-center w-full max-w-md gap-10">
        <h1 className="text-2xl font-semibold">Log in to your account</h1>
        <Form className="w-full space-y-4" method="post">
          <InputPair
            label="Email"
            description="Enter your email address"
            name="email"
            id="email"
            required
            type="email"
            placeholder="i.e applause@example.com"
          />
          {actionData && "formErrors" in actionData && (
            <p className="text-sm text-red-500">
              {actionData?.formErrors?.email?.join(", ")}
            </p>
          )}
          <InputPair
            id="password"
            label="Password"
            description="Enter your password"
            name="password"
            required
            type="password"
            placeholder="Enter your password"
          />
              {actionData && "formErrors" in actionData && (
            <p className="text-sm text-red-500">
              {actionData?.formErrors?.password?.join(", ")}
            </p>
          )}
          <AuthSubmitFeedback
            error={
              actionData && "loginError" in actionData
                ? actionData.loginError
                : null
            }
            isSubmitting={isSubmitting}
            submitLabel="Log in"
          />
        </Form>
        <AuthButtons />
      </div>
    </div>
  );
}
