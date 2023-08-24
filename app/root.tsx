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
} from "@remix-run/react";

import stylesheet from "~/tailwind.css";

function NavBar() {
  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex space-x-4">
        <Link to="/" className="text-white">
          Home
        </Link>

        <Link to="/projects" className="text-white">
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

// export const loader = async ({ request }: LoaderArgs) => {
//   return json({ message: `Hello from ${request.url}` });
// };

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <NavBar />
        <div>
          <Outlet />
        </div>
        <Scripts />
      </body>
    </html>
  );
}
