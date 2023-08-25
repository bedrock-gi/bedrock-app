import { V2_MetaFunction, redirect } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: V2_MetaFunction = () => [{ title: "Remix Notes" }];

export function loader() {
  return redirect("/projects");
}
