import { Form, redirect } from "react-router";
import type { Route } from "./+types/my-profile-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "My Profile | app_lause" },
    { name: "description", content: "Manage your profile" },
  ];
};

export function loader() {
  // find user using the cookies
  return redirect("/users/hess");
}