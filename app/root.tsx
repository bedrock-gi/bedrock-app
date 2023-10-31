import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Links, LiveReload, Meta, Outlet, Scripts } from "@remix-run/react";

import stylesheet from "~/tailwind.css";

import { Sidebar } from "./components/Sidebar";

export interface BreadcrumbData {
  route: string;
  label: string;
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

if (process.env.NODE_ENV === "development") {
} else {
}
export default function App() {
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
        <ToastContainer />
        <div className="flex h-screen flex-row">
          <div className="h-full w-1/5">
            <Sidebar></Sidebar>
          </div>

          <div className="h-full w-4/5">
            <Outlet />
          </div>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
