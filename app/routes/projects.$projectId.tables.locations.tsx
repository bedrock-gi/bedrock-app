import { LoaderFunction, json, redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getProjects } from "~/models/projects";
import { requireUser } from "~/utils/auth.server";
import { useMatches } from "@remix-run/react";
import { useState } from "react";

export const loader = (async ({ request }) => {
  const user = await requireUser(request);

  return json({ user });
}) satisfies LoaderFunction;

export default function () {
  //   console.log(matches);

  return <div className="card m-2">Locations</div>;
}
