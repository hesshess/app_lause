import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useNavigation,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import "./lib/datetime";
import Navigation from "./common/components/navigation";
import { makeSSRClient } from "./supa-client";
import { cn } from "./lib/utils";
import { countNotifications, getUserById } from "./features/users/queries";

import * as Sentry from "@sentry/react-router";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <main>{children}</main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const {
    data: { user },
  } = await client.auth.getUser();
  if (user && user.id) {
    const profile = await getUserById(client, { id: user.id });
    const count = await countNotifications(client, { userId: user.id });
    return { user, profile, notificationsCount: count };
  }
  return { user: null, profile: null, notificationsCount: 0 };
};

export default function App({ loaderData }: Route.ComponentProps) {
  const { pathname } = useLocation();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const isLoggedIn = loaderData.user !== null;
  return (
    <div
      className={cn({
        "px-5 py-24 sm:px-8 md:px-10 md:py-28 lg:px-20":
          !pathname.includes("/auth/"),
        "transition-opacity animate-pulse": isLoading,
      })}
    >
      {pathname.includes("/auth") ? null : (
        <Navigation
          isLoggedIn={isLoggedIn}
          username={loaderData.profile?.username}
          avatar={loaderData.profile?.avatar}
          name={loaderData.profile?.name}
          hasNotifications={loaderData.notificationsCount > 0}
          hasMessages={true}
        />
      )}
      <Outlet
        context={{
          isLoggedIn,
          userId: loaderData.user?.id,
          name: loaderData.profile?.name,
          username: loaderData.profile?.username,
          avatar: loaderData.profile?.avatar,
        }}
      />
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      message = "Page not found";
      details = "The requested page could not be found.";
    } else if (error.status === 401 || error.status === 403) {
      message = "Access denied";
      details = "Please sign in again or check your permissions.";
    } else if (error.status >= 500) {
      message = "Something went wrong";
      details = "A server error occurred. Please try again later.";
    } else {
      message = "Request error";
      details = error.statusText || details;
    }
    if (error.status >= 500) {
      Sentry.captureException(error);
    }
  } else if (error && error instanceof Error) {
    Sentry.captureException(error);
    if (import.meta.env.DEV) {
      details = error.message;
      stack = error.stack;
    }
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
