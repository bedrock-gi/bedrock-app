import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatches,
} from "@remix-run/react";

import stylesheet from "~/tailwind.css";
import { requireUser } from "./utils/auth.server";

export interface BreadcrumbData {
  route: string;
  label: string;
}

function NavBar() {
  return (
    <nav className="navbar bg-primary text-white">
      <ul className="flex space-x-4">
        <Link to="/projects" className="">
          Bedrock
        </Link>
        <Link to="/projects" className="">
          Projects
        </Link>
      </ul>
    </nav>
  );
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

if (process.env.NODE_ENV === "development") {
} else {
}
export default function App() {
  const matches = useMatches();
  return (
    <html data-theme="bedrock" lang="en" className="h-full">
      <head>
        <LiveReload />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>

      <body>
        <NavBar />
        <div className="m-2">
          <div className="breadcrumbs">
            <ul>
              {matches
                // skip routes that don't have a breadcrumb
                .filter((match) => match.handle && match.handle.breadcrumb)

                // render breadcrumbs!
                .map((match, index) => (
                  <li key={index}>{match?.handle?.breadcrumb(match)}</li>
                ))}
            </ul>
          </div>

          <div>
            <Outlet />
          </div>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
