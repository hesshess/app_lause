import { Resend } from "resend";
import type { Route } from "./+types/welcome-page";
import { render } from "@react-email/components";
import WelcomeUser from "react-email-starter/emails/welcome-user";

const client = new Resend(process.env.RESEND_API_KEY);

export const loader = async ({ params }: Route.LoaderArgs) => {

  const { data, error } = await client.emails.send({
    from: "Hess <hess@mail.app-lause.xyz>",
    to: ["heisuewang@gmail.com"],
    subject: "Welcome to Applause",
    react: <WelcomeUser username={"Resend"} />,
  });
  return Response.json({ data, error });
};
