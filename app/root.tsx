import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Links, LiveReload, Meta, Outlet, Scripts } from "@remix-run/react";

// Import the style only once in your app!
import "react-datasheet-grid/dist/style.css";

import stylesheet from "~/tailwind.css";

import { Sidebar } from "./components/Sidebar/Sidebar";
import { useState } from "react";

export interface BreadcrumbData {
  route: string;
  label: string;
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function App() {
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);
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
        <div className="flex h-screen">
          <div
            className={`flex-shrink-0 transition-all duration-300 ${
              isSidebarExpanded ? "w-64" : "w-16"
            }`}
          >
            <Sidebar
              isExpanded={isSidebarExpanded}
              toggle={() => setSidebarExpanded(!isSidebarExpanded)}
            />
          </div>

          <div className="h-full flex-grow">
            <Outlet />
          </div>
        </div>
        <ToastContainer />
        <Scripts />
        <div
          id="portal"
          style={{ position: "absolute", top: 0, left: 0, zIndex: 1000 }}
        />
      </body>
    </html>
  );
}
