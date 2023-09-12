import { LoaderFunction, json, redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getProjects } from "~/models/projects";
import { requireUser } from "~/utils/auth.server";
import { useMatches } from "@remix-run/react";
import { useState } from "react";
import Tab from "~/components/Tab";

export const loader = (async ({ request }) => {
  const user = await requireUser(request);

  return json({ user });
}) satisfies LoaderFunction;

export const handle = {
  breadcrumb: () => <Link to="/tables">Tables</Link>,
};

export default function Tables() {
  const matches = useMatches();
  const activeTab = matches.slice(-1)[0].id.split(".").slice(-1)[0];

  return (
    <div className="card m-2">
      <div className="tabs">
        <Tab activeTab={activeTab} to="geology" />

        <Tab activeTab={activeTab} to="locations" />
      </div>
      <Outlet />
    </div>
  );
}
